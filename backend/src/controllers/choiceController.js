import Choice from "../models/Choice.js";

export async function getChoicesByCategoryId(req, res) {
  try {
    const choices = await Choice.find({ categoryId: req.params.categoryId });

    if (!choices || choices.length === 0) {
      return res
        .status(404)
        .json({ message: "No choices found for this category" });
    }

    res.status(200).json(choices);
  } catch (error) {
    console.error("Error in getChoicesByCategoryId controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createChoice(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const choice = new Choice({
      text,
      categoryId: req.params.categoryId, // IMPORTANT
    });

    const savedChoice = await choice.save();

    res.status(201).json(savedChoice);
  } catch (error) {
    console.error("Error in createChoice controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateChoice(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const updatedChoice = await Choice.findByIdAndUpdate(
      req.params.choiceId,
      {
        text,
      },
      { new: true }
    );
    if (!updatedChoice) {
      return res.status(404).json({ message: "Choice not found" });
    }
    res.status(200).json(updatedChoice);
  } catch (error) {
    console.error("Error in updateChoice controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteChoice(req, res) {
  try {
    const deletedChoice = await Choice.findByIdAndDelete(req.params.choiceId);
    if (!deletedChoice) {
      return res.status(404).json({ message: "Choice not found" });
    }
    res.status(200).json({ message: "Choice deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChoice controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
