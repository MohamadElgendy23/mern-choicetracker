import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import CategoryDetailPage from "./pages/CategoryDetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/category/:id" element={<CategoryDetailPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
