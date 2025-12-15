import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

function CreateChoicePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Text fields is required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/choices", {
        text,
      });
      toast.success("Choice created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating choice", error);
      toast.error("Failed to create choice");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/create" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Category Create Page
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Choice</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Text</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Choice Text"
                    className="input input-bordered"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></input>
                </div>

                <div className="card-actions justify-end gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Choice"}
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

export default CreateChoicePage;
