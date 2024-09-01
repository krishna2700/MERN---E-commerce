import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectRoDatabase from "./db.js";
// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectRoDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_CLIENT_ID);
});

const PORT = 3690;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
