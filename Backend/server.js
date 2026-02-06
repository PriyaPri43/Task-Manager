require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(express.json());

// Performance basic middleware
// app.use((req, res, next) => {
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   next();
// });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/",(req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);