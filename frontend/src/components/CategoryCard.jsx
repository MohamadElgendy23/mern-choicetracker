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
          <div className="flex items-center justify-center gap-2">
            <h2 className="card-title">Category: </h2>
            <p>{category.name}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="card-title">Date Created: </h2>
            <p>{formatDate(new Date(category.createdAt))}</p>
          </div>
          <div className="flex items-center">
            <h2 className="card-title">Choices: </h2>
          </div>
          <div className="card-actions justify-end gap-3">
            <PencilIcon size="20" />
            <button onClick={handleDelete}>
              <TrashIcon size="20" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
