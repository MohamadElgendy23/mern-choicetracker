import Category from "../models/Category.js";

export async function getAllCategories(_, res) {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getAllCategories controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const category = new Category({ name: name });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error in createCategory controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCategory(req, res) {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error in updateCategory controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCategory(req, res) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
