import React from "react";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import NavBar from "../components/Navbar";
import toast from "react-hot-toast";
import CategoryCard from "../components/CategoryCard";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        toast.error("Failed to load categories");
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen w-full bg-base-200">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-green-800 py-10">
            Loading Categories...
          </div>
        )}
        {categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                setCategories={setCategories}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
