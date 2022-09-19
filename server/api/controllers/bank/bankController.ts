import { Request, Response } from 'express';
import Bank from '../../models/Bank';

class BankController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bank = await Bank.findById(id).populate('user');
      return res.json(bank);
    } catch (error) {
      return res.status(400).send({ message: 'bank not found' });
    }
  }
  async get(_req: Request, res: Response) {
    try {
      const user = res.locals?.user?.data.data
        ? res.locals?.user?.data
        : res.locals?.user;
      const bank = await Bank.find({
        ...(user.role === 'admin' ? {} : { user: user.data }),
      }).populate('user');
      return res.json(bank);
    } catch (error) {
      return res.status(400).send({ message: 'banks not found' });
    }
  }
  async add(req: Request, res: Response) {
    try {
      const user = res.locals?.user?.data.data
        ? res.locals?.user?.data.data
        : res.locals?.user?.data;

      req.body.user = user;
      const bank = await Bank.create(req.body);
      return res.json(bank);
    } catch (error) {
      return res.status(400).send({ message: 'bank not found' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bank = await Bank.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(bank);
    } catch (error) {
      return res.status(400).send({ message: 'bank not found' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bank = await Bank.findByIdAndDelete(id);
      return res.json(bank);
    } catch (error) {
      return res.status(400).send({ message: 'bank not found' });
    }
  }
}

export default new BankController();
