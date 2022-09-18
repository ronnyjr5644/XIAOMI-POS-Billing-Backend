import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
const app = express();
dotenv.config();
// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// set routes
app.use("/api", authRoutes);

// Set Port
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("<h1>Xiomi BE<h1>");
});
// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION || "mongodb+srv://phioxing:lo5FhxMwfXih26zb@cluster0.l4krhnc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("MongoDB Error", error.message));
