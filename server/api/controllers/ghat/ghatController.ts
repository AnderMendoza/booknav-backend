import { Request, Response } from 'express';
import cloudinary from '../../middlewares/cloudinary';
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
  async add(req: Request, res: Response) {
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.picture = result.secure_url;
      }

      if (req.body.location) {
        const location = JSON.parse(req.body.location);
        req.body.location = {
          lat: location.lat,
          lng: location.lng,
        };
      }
      const ghat = await Ghat.create(req.body);

      return res.json(ghat);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to add ghat' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.picture = result.secure_url;
      }
      if (req.body.location) {
        const location = JSON.parse(req.body.location);
        req.body.location = {
          lat: location.lat,
          lng: location.lng,
        };
      }
      const ghat = await Ghat.findByIdAndUpdate(id, req.body, { new: true });

      return res.json(ghat);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to update ghat' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ghat = await Ghat.findByIdAndDelete(id);
      return res.json(ghat);
    } catch (error) {
      return res.status(400).send({ message: 'Unable to delete ghat' });
    }
  }
}

export default new GhatController();
