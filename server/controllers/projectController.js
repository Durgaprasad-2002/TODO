const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { projectName } = req.body;

    const project = new Project({ name: projectName });

    await project.save();

    console.log("Successfully Created Project");
    res.status(201).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Project
const getProjects = async (req, res) => {
  const { projectId } = req.params;
  try {
    const projects = await Project.findOne({ _id: projectId });
    res.status(200).json(projects);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { projectId } = req.params;
  const newTask = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project["tasks"].push(newTask);

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getProjectNamesAndIds = async (req, res) => {
  try {
    const projects = await Project.find({}, { _id: 1, name: 1 });

    res.status(200).json(projects);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Updating a task in a project
const updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const updatedTask = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await Project.updateOne(
      { _id: projectId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.taskname": updatedTask.taskname,
          "tasks.$.startdate": updatedTask.startdate,
          "tasks.$.enddate": updatedTask.enddate,
          "tasks.$.status": updatedTask.status,
        },
      }
    );

    console.log("Successfully updated task");

    res.status(200).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Deleting a task in a project
const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    await Project.updateOne(
      { _id: projectId },
      { $pull: { tasks: { _id: taskId } } }
    );

    console.log("Successfully Deleted Task");
    res.status(200).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  createTask,
  updateTask,
  deleteTask,
  getProjectNamesAndIds,
};
