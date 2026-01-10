import express from "express";
import {
  getChoicesByCategoryId,
  getChoiceById,
  createChoice,
  updateChoice,
  deleteChoice,
} from "../controllers/choiceController.js";
const router = express.Router();

router.get("/:categoryId", getChoicesByCategoryId);
router.get("/category/:choiceId", getChoiceById);
router.post("/:categoryId", createChoice);
router.put("/:choiceId", updateChoice);
router.delete("/:choiceId", deleteChoice);

export default router;
