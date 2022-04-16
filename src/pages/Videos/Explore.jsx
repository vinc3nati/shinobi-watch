import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const Explore = () => {
  return (
    <div className="explore-container">
      {/* <aside> */}
      <Sidebar />
      {/* </aside> */}
      <main className="explore-main">
        <Outlet />
      </main>
    </div>
  );
};
