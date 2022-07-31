import { Request, Response } from 'express';
import Ghat from '../../models/Ghat';

export class GhatController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ghat = await Ghat.findById(id);
      return res.json(ghat);
    } catch (error) {
      return res.status(400).send({ message: 'Ghat not found' });
    }
  }
  async getAll(_req: Request, res: Response) {
    try {
      const ghat = await Ghat.find();
      return res.json(ghat);
    } catch (error) {
      return res.status(400).send({ message: 'Ghat not found' });
    }
  }
}

export default new GhatController();
