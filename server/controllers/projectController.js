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

// Get all projects
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

// Update's a task in a project
const updateTask = async (req, res) => {
  const { projectId, status, taskId } = req.params;
  const { status: newStatus, ...taskData } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project[status])
      return res
        .status(404)
        .json({ message: `Status '${status}' not found in project` });

    const taskList = project[status];
    const taskIndex = taskList.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1)
      return res.status(404).json({ message: "Task not found" });

    const [task] = taskList.splice(taskIndex, 1);

    if (newStatus && newStatus !== status) {
      if (!project[newStatus])
        return res
          .status(404)
          .json({ message: `Status '${newStatus}' not found in project` });

      project[newStatus].push({ ...task, ...taskData });
    } else {
      taskList.push({ ...task, ...taskData });
    }

    await project.save();

    console.log("Successfully updated task");

    res.status(200).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete's a task in a project
const deleteTask = async (req, res) => {
  const { projectId, status, taskId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project[status] = project[status].filter(
      (task) => task._id.toString() !== taskId
    );

    await project.save();

    console.log("Successfully Deleted Task");
    res.status(200).json(project);
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { projectId, status } = req.params;
  const newTask = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project["tasks"].push(newTask);

    await project.save();

    console.log("created task");

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

module.exports = {
  createProject,
  getProjects,
  createTask,
  updateTask,
  deleteTask,
  getProjectNamesAndIds,
};
