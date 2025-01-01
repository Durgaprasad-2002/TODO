const mongoose = require("mongoose");

const TaskSchema = {
  taskname: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["TODO", "INPROGRESS", "INREVIEW", "COMPLETED"],
    required: true,
  },
};

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tasks: { type: [TaskSchema] },
});

module.exports = mongoose.model("Project", ProjectSchema);
