import { Request, Response } from 'express';
import Tax from '../../../api/models/Tax';

class TaxController {
  async get(_req: Request, res: Response) {
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data
      : res.locals?.user;
    if (user?.role !== 'admin')
      return res.status(406).json({ message: 'Unauthorized' });

    const serviceCharge = await Tax.find();
    return res.json(serviceCharge);
  }

  async update(req: Request, res: Response) {
    const user = res.locals?.user?.data.data
      ? res.locals?.user?.data
      : res.locals?.user;
    if (user?.role !== 'admin')
      return res.status(406).json({ message: 'Unauthorized' });

    const { serviceChargePercent } = req.body;
    let tax = await Tax.findOneAndUpdate(
      {},
      { serviceChargePercent },
      { new: true }
    );
    if (!tax) tax = await Tax.create({ serviceChargePercent });
    return res.json(tax);
  }
}

export default new TaxController();
