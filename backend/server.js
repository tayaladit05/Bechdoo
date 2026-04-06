const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // sabse pehle ye

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");


connectDB();

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bechdo API is running" });
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are verified!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});