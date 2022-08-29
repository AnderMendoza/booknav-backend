import { Request, Response } from 'express';
import BoatType from '../../models/BoatType';
import Naav from '../../models/Naav';
import { Review } from '../../../types/review';
export class BoatTypeController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const boatType = await BoatType.findById(id);
      return res.json(boatType);
    } catch (error) {
      return res.status(400).send({ message: 'boatType not found' });
    }
  }
  async getAll(_req: Request, res: Response) {
    try {
      const boatType = await BoatType.find();
      //get image from naav which as a review
      const naav = await Naav.distinct('boatType')
        .find({
          reviews: { $exists: true },
        })
        .populate('reviews');
      //get average rating of naav
      const boatTypes = boatType.map((boatType) => {
        return {
          ...boatType._doc,
          image:
            naav.find(
              (naav) => naav.boatType.toString() === boatType._id.toString()
            )?.pictures[0] || '',
          rating: (() => {
            const reviews = naav.find(
              (naav) => naav.boatType.toString() === boatType._id.toString()
            )?.reviews;
            return (
              reviews?.reduce(
                (sum: number, review: Review) =>
                  (sum + review.rating) / reviews.length,
                0
              ) || 0
            );
          })(),
        };
      });

      return res.json(boatTypes);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'boatType not found' });
    }
  }
  async add(req: Request, res: Response) {
    try {
      const boatType = await BoatType.create(req.body);
      return res.json(boatType);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: 'Unable to add boatType' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const boatType = await BoatType.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.json(boatType);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to update boatType' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const boatType = await BoatType.findByIdAndDelete(id);
      return res.json(boatType);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to delete boatType' });
    }
  }
}

export default new BoatTypeController();
