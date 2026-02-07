require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-manager1-nu.vercel.app"
  ]
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/",(req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);