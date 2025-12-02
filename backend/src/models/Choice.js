import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Choice = mongoose.model("Choice", choiceSchema);

export default Choice;
