const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  todo: [TaskSchema],
  inprogress: [TaskSchema],
  inreview: [TaskSchema],
  completed: [TaskSchema],
});

module.exports = mongoose.model("Project", ProjectSchema);
