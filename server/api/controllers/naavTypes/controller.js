import NaavTypes from "../../models/naavTypes";

export class Controller {
  async getAll(req, res) {
    const boatTypes = await NaavTypes.find();
    return res.status(200).send(boatTypes);
  }
  async addBoatType(req, res) {
    try {
      const { name, image } = req.body;

      const newBoatType = new NaavTypes({
        name,
        image,
        width: req.body?.width,
        length: req.body?.length,
        capacity: req.body?.capacity,
      });
      await newBoatType.save();
      return res.status(201).send(newBoatType);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  async getBoatType(req, res) {
    try {
      const { id } = req.params;
      const boatType = await NaavTypes.findById(id);
      return res.status(200).send(boatType);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  async updateBoatType(req, res) {
    try {
      const { id } = req.params;
      const { name, image, width, length, capacity } = req.body;
      const updatedBoatType = await NaavTypes.findByIdAndUpdate(
        id,
        {
          name,
          image,
          width,
          length,
          capacity,
        },
        { new: true }
      );
      return res.status(200).send(updatedBoatType);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  async deleteBoatType(req, res) {
    try {
      const { id } = req.params;
      const deletedBoatType = await NaavTypes.findByIdAndDelete(id);
      return res.status(200).send(deletedBoatType);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
