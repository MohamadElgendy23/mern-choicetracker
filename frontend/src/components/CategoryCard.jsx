import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import api from "../lib/axios";

function CategoryCard({ category, setCategories }) {
  const [choices, setChoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const res = await api.get(`/choices/${category._id}`);
        setChoices(res.data);
      } catch (error) {
        console.error("Error fetching choices", error);
      }
    };
    fetchChoices();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/categories/${category._id}`);
      setCategories((prev) => prev.filter((c) => c._id !== category._id));
    } catch (error) {
      console.error("Error deleting category");
    }
  };

  const handleChoiceDelete = async (id) => {
    try {
      await api.delete(`/choices/${id}`);
      setChoices((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting category");
    }
  };

  return (
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
        <div className="flex flex-col gap-2">
          <h2 className="card-title">
            Choices:
            <button onClick={() => navigate(`/createchoice/${category._id}`)}>
              <PlusIcon size="30" color="green" />
            </button>
          </h2>
          <ul className="list-disc ml-4">
            {choices.map((choice) => (
              <div className="flex justify-between">
                <li>{choice.text}</li>
                <div className="flex gap-3">
                  <button onClick={() => navigate(`/editchoice/${choice._id}`)}>
                    <PencilIcon size="15" />
                  </button>
                  <button onClick={() => handleChoiceDelete(choice._id)}>
                    <TrashIcon size="15" />
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="card-actions justify-end gap-3 mt-5">
          <button onClick={() => navigate(`/edit/${category._id}`)}>
            <PencilIcon size="20" />
          </button>
          <button onClick={handleDelete}>
            <TrashIcon size="20" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
