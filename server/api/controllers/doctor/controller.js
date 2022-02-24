import Doctor from "../../models/doctor";

export class Controller {
  async get(req, res) {
    const id = req.params.id;

    const doctor = await Doctor.findById(id).catch(() => {
      res.status(400).send({
        message: "Error retrieving doctor",
      });
    });

    return res.status(201).send({ doctor });
  }

  async create(req, res) {
    const { title, phone, email, location } = req.body;

    const doctor = new Doctor();
    doctor.title = title;
    doctor.phone = phone;
    doctor.email = email;
    doctor.location = location; // location : [latitude, longitude]

    const response = await Doctor.create(doctor).catch((err) => {
      console.log(err);
      res.status(400).send({
        message: err.message,
      });
    });
    if (response) {
      res.status(201).send({
        success: true,
        message: "Doctor added",
      });
    }
  }

  async update(req, res) {
    const doctor = req.body.doctor;

    const resp = await Doctor.findByIdAndUpdate(req.params.id, doctor).catch(
      (err) => res.status(400).send({ success: false, message: err.message })
    );
    if (resp) {
      res.status(201).send({
        success: true,
        message: "Doctor updated",
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    await Doctor.findByIdAndDelete(id).catch(() => {
      res.status(400).send({
        message: "Error deleting doctor",
      });
    });
    res.status(201).send({
      success: true,
      message: "Doctor deleted",
    });
  }
}

export default new Controller();
