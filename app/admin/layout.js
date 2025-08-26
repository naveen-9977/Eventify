import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <div className="md:ml-[25%] lg:ml-[20%] xl:ml-[16.66%] my-6 w-full mr-6">
      {" "}
      {children}
    </div>
  );
}
