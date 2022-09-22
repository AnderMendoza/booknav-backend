import { Request, Response } from 'express';
import Booking from '../../models/Booking';
import Naav from '../../models/Naav';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { checkAvailableBooking } from './utils';
import Subscription from '../../models/Subscription';
import webpush from 'web-push';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class BookingController {
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('user')
      .populate({
        path: 'naav',
        populate: {
          path: 'user',
        },
      });
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data.data
      : res.locals?.user?.data;

    if (
      user.role === 'admin' ||
      booking.user._id.toString() === user._id.toString()
    ) {
      return res.json(booking);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // return user's bookings if admin return all bookings
  async getAll(req: Request, res: Response) {
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data.data
      : res.locals?.user?.data;

    const { startTime } = req.query as unknown as { startTime?: string };

    const bookings = await Booking.find(
      user.role === 'admin'
        ? {
            ...(startTime && { startTime: { $gte: new Date(startTime) } }),
          }
        : {
            user,
            ...(startTime && { startTime: { $gte: new Date(startTime) } }),
          }
    )
      .populate('user')
      .populate('naav');
    res.json(bookings);
  }

  async add(req: Request, res: Response) {
    const naav = await Naav.findById(req.body.naav);
    const amount = naav.price[req.body.rideType] * 100; //paise
    const available = await checkAvailableBooking({
      startTime: req.body.startTime,
      naav,
    });
    if (!available)
      return res.status(400).json({ message: 'Naav is not available' });

    const orderOptions = {
      amount: amount,
      currency: 'INR',
      receipt: naav.title + '_' + req.body.startTime,
      payment_capture: 0,
    };

    return razorpayInstance.orders.create(
      orderOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (err: never, order: any) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Something Went Wrong',
          });
        }
        return res.status(200).json(order);
      }
    );
  }

  async verify(req: Request, res: Response) {
    try {
      const naav = await Naav.findById(req.body.naav);
      const available = await checkAvailableBooking({
        startTime: req.body.startTime,
        naav,
      });
      if (!available)
        return res.status(400).json({ message: 'Naav is not available' });

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
        .update(sign.toString())
        .digest('hex');

      if (razorpay_signature === expectedSign) {
        const user = res.locals?.user?.data.data
          ? res.locals?.user?.data
          : res.locals?.user;

        const prevBooking = await Booking.findOne({
          razorpay_payment_id,
        });

        if (prevBooking)
          return res
            .status(200)
            .json({ message: 'Payment verified successfully' });

        const booking = await Booking.create({
          user: user.data,
          ...req.body,
          endTime: new Date(
            new Date(req.body.startTime).getTime() + 90 * 60 * 1000
          ),
          status: 'paid',
        });

        const subscription = await Subscription.findOne({
          user: naav.user,
        });

        console.log(subscription);

        webpush
          .sendNotification(
            subscription,
            JSON.stringify({
              title: 'New Booking',
              description: `You have a new booking from ${user.phone}`,
              icon: naav.pictures[0],
            })
          )
          .then(() => {
            console.log(
              'Notification sent',
              JSON.stringify({
                title: 'New Booking',
                description: `You have a new booking from ${user.phone}`,
                icon: naav.pictures[0],
              })
            );
          });

        return res
          .status(200)
          .json({ message: 'Payment verified successfully', booking });
      } else {
        return res.status(400).json({ message: 'Invalid signature sent!' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    res.json(booking);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(booking);
  }
}

export default new BookingController();
