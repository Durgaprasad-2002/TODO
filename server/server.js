require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
dbConnect();

// Route for project
app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
