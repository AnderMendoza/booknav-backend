import { Request, Response } from 'express';
import Subscription from '../../models/Subscription';

class NotificationController {
  async subscribe(req: Request, res: Response) {
    const subscription = req.body.subscription;

    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data.data
      : res.locals?.user?.data;

    const existingSubscription = await Subscription.findOne({
      user: user._id,
    });

    if (existingSubscription) {
      await Subscription.findOneAndUpdate(
        { user: user },
        { $set: { ...subscription } },
        { new: true }
      );
      return res.json({ message: 'Subscription updated' });
    }

    const newSubscription = new Subscription({
      user: user,
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: subscription.keys,
    });

    await newSubscription.save();

    return res.json({ message: 'Subscription added' });
  }
}

export default new NotificationController();
