import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import CreateChoicePage from "./pages/CreateChoicePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
        <Route
          path="/createchoice/:categoryId"
          element={<CreateChoicePage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
