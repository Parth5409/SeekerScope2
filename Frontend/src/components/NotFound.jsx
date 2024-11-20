import React from "react";
import Navbar from "./shared/Navbar";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-[50vh]">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      </div>
    </div>
  );
}
