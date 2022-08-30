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
  async getAll(_req: Request, res: Response) {
    try {
      const banks = await Bank.find().populate('user');
      return res.json(banks);
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
