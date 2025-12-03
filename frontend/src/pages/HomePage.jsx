import React from "react";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import NavBar from "../components/Navbar";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen w-full bg-orange-400">
      <NavBar />
    </div>
  );
}

export default HomePage;
