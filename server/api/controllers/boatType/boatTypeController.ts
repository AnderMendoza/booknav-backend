import { Request, Response } from 'express';
import BoatType from '../../models/BoatType';

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
      return res.json(boatType);
    } catch (error) {
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
