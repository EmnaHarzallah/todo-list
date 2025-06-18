const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoRoutes = require("./routes/todoRouters"); // Adaptez le chemin si besoin

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error(err));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from MERN backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
