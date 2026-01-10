import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

function EditChoicePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { choiceId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChoice = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/choices/category/${choiceId}`);
        setText(res.data.text);
      } catch (error) {
        toast.error("Failed to load choice");
      } finally {
        setLoading(false);
      }
    };
    fetchChoice();
  }, [choiceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Text fields is required");
      return;
    }

    setLoading(true);

    try {
      await api.put(`/choices/${choiceId}`, {
        text,
      });
      toast.success("Choice updated successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error updating choice", error);
      toast.error("Failed to update choice");
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
              <h2 className="card-title text-2xl mb-4">Update Choice</h2>
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
                    {loading ? "Updating..." : "Update Choice"}
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

export default EditChoicePage;
