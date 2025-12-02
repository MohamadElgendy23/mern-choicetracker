import express from "express";
import {
  getChoicesById,
  createChoice,
  updateChoice,
  deleteChoice,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/:categoryId", getChoicesById);
router.post("/:categoryId", createChoice);
router.put("/:choiceId", updateChoice);
router.delete("/:choiceId", deleteChoice);

export default router;
