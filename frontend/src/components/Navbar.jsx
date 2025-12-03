import React from "react";
import { Link } from "react-router";
import ChoiceTrackerImg from "../images/ChoiceTrackerImg.png";
import { PlusIcon } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between mx-auto p-6">
      <Link to="/">
        <img src={ChoiceTrackerImg} className="h-25 w-30 rounded-xl" />
      </Link>
      <Link to="/create" className="btn btn-primary p-3">
        <PlusIcon className="size-5" />
        <span>New Category</span>
      </Link>
    </div>
  );
}

export default Navbar;
