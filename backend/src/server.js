import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import categoriesRoutes from "./routes/categoryRoutes.js";
import choicesRoutes from "./routes/choiceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/choices", choicesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
