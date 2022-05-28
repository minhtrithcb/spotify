import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrimaryLayout = () => {
  return (
    <div className="primaryLayout h-auto w-full">
      <Navbar />
      <div className="mt-16 p-4 w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default PrimaryLayout;
