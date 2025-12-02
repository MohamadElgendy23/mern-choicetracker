import express from "express";
import {
  getChoicesById,
  createChoice,
  updateChoice,
  deleteChoice,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
