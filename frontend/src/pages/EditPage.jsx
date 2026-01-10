import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

function EditPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        setName(res.data.name);
      } catch (error) {
        toast.error("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name field is required");
      return;
    }

    setLoading(true);

    try {
      await api.put(`/categories/${id}`, {
        name,
      });

      toast.success("Category updated successfully!");

      navigate("/");
    } catch (error) {
      console.log("Error updating category", error);
      toast.error("Failed to update category");
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
                    {loading ? "Updating..." : "Update Category"}
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

export default EditPage;
