import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectRoDatabase from "./db.js";

dotenv.config();

connectRoDatabase();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3690;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
