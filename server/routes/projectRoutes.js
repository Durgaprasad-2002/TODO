const express = require("express");
const {
  createProject,
  getProjects,
  createTask,
  updateTask,
  deleteTask,
  getProjectNamesAndIds,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // creates a project
router.get("/tasks/:projectId", getProjects); // retrives a project by projectId
router.get("/names", getProjectNamesAndIds); // retrives names and id's of projects
router.post("/:projectId", createTask); // Creates task
router.put("/:projectId/:taskId", updateTask); // Update's  task
router.delete("/:projectId/:taskId", deleteTask); // Delete's  task

module.exports = router;
