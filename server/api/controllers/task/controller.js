import Task from "../../models/task";

export class Controller {
  async get(req, res) {
    const id = req.params.id;

    const task = await Task.findById(id).catch(() => {
      res.status(400).send({
        message: "Error retrieving task",
      });
    });

    return res.status(201).send({ task });
  }

  async create(req, res) {
    const { title, assignedTo, doctor, deadline } = req.body;

    const newTask = new Task();
    newTask.title = title;
    newTask.assignedTo = assignedTo;
    newTask.doctor = doctor;
    newTask.deadline = deadline;
    const response = await Task.create(newTask).catch((err) => {
      console.log(err);
      res.status(400).send({
        message: err.message,
      });
    });
    if (response) {
      res.status(201).send({
        success: true,
        message: "Task added",
      });
    }
  }

  async update(req, res) {
    const task = req.body.task;

    const resp = await task
      .findByIdAndUpdate(req.params.id, task)
      .catch((err) =>
        res.status(400).send({ success: false, message: err.message })
      );
    if (resp) {
      res.status(201).send({
        success: true,
        message: "Task updated",
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    await Task.findByIdAndDelete(id).catch(() => {
      res.status(400).send({
        message: "Error deleting task",
      });
    });
    res.status(201).send({
      success: true,
      message: "Task deleted",
    });
  }
}

export default new Controller();
