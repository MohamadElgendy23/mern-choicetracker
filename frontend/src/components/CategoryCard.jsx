import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";
import api from "../lib/axios";

function CategoryCard({ category, setCategories }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`categories/${category._id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== category._id));
    } catch (error) {
      console.error("Error deleting category");
    }
  };
  return (
    <Link to={`/category/${category._id}`}>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{category.name}</h2>
          <p>{formatDate(new Date(category.createdAt))}</p>
          <div className="card-actions justify-end gap-3">
            <PencilIcon size="5" />
            <button onClick={handleDelete}>
              <TrashIcon size="5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
