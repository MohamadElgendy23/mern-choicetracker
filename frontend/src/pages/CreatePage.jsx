import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

function CreatePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name field is required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/categories", {
        name,
      });

      const categoryId = res.data._id;

      toast.success("Category created successfully!");

      navigate(`/createchoice/${categoryId}`);
    } catch (error) {
      console.log("Error creating category", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Categories
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Category</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
