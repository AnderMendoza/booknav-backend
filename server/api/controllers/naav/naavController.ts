import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../../models/Review';
import cloudinary from '../../middlewares/cloudinary';
import Naav from '../../models/Naav';

export class NaavController {
  async getById(req: Request, res: Response) {
    try {
      const naav = await Naav.findById(req.params.id)
        .populate('boatType')
        .populate('user')
        .populate('ghat')
        .populate('reviews')
        .populate({
          path: 'reviews',
          populate: {
            path: 'user',
          },
        });

      return res.json(naav);
    } catch (error) {
      return res.status(400).json({ message: 'Naav not found' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { boatTypeId, ghatId, isPublished } = req.query as unknown as {
        boatTypeId?: string[];
        ghatId?: string;
        isPublished?: boolean;
      };

      const naavs = await Naav.find({
        ...(boatTypeId && { boatType: { $in: boatTypeId } }),
        ...(ghatId && { ghat: ghatId }),
        ...(isPublished && { isPublished: isPublished }),
      })
        .populate('boatType')
        .populate('user')
        .populate('ghat')
        .populate('reviews');

      return res.json(naavs);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'Naavs not found' });
    }
  }

  async add(req: Request, res: Response) {
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.pictures = [result.secure_url];
      }
      const userId = res.locals?.user?.data.data
        ? res.locals?.user?.data.data
        : res.locals?.user?.data;

      req.body.user = userId;
      const naav = await Naav.create(req.body);
      return res.json(naav);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'Unable to add naav' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let image = '';
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
      }
      const user = res.locals?.user?.data.data
        ? res.locals?.user?.data.data
        : res.locals?.user?.data;

      req.body.user = user;
      req.body.ghat = new mongoose.Types.ObjectId(req.body.ghat);
      req.body.boatType = new mongoose.Types.ObjectId(req.body.boatType);

      if (image) {
        const naav = await Naav.findByIdAndUpdate(
          id,
          {
            $set: req.body,
            $push: {
              pictures: image,
            },
          },
          {
            new: true,
          }
        );
        return res.json(naav);
      }

      const naav = await Naav.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(naav);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to update naav' });
    }
  }

  async status(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const naav = await Naav.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(naav);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to update naav status' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const naav = await Naav.findByIdAndDelete(id);
      return res.json(naav);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to delete naav' });
    }
  }

  async review(req: Request, res: Response) {
    try {
      const { id } = req.params;
      req.body.user = res.locals?.user?.data.data
        ? res.locals?.user?.data.data
        : res.locals?.user?.data;

      const review = await Review.create(req.body);
      const naav = await Naav.findByIdAndUpdate(id, {
        $push: {
          reviews: review,
        },
      });
      return res.json(naav);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to review naav' });
    }
  }
}

export default new NaavController();
