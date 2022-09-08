import { Request, Response } from 'express';
import Booking from 'server/api/models/Booking';
import Naav from 'server/api/models/Naav';

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
  async getAll(_req: Request, res: Response) {
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data.data
      : res.locals?.user?.data;

    const bookings = await Booking.find(user.role === 'admin' ? {} : { user })
      .populate('user')
      .populate('naav');
    res.json(bookings);
  }

  async add(req: Request, res: Response) {
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data.data
      : res.locals?.user?.data;
    const naav = await Naav.findById(req.body.naav);

    req.body.amount = naav.price;
    req.body.endTime = new Date(
      new Date(req.body.startTime).getTime() + 90 * 60 * 60 * 1000
    );

    const booking = await Booking.create({ ...req.body, user });
    res.json(booking);
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
