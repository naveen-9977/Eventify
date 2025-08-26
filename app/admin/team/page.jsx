"use client";

import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminFeatures() {
  const [Teams, setTeams] = useState([]);

  const getTeams = async () => {
    let res = await fetch("http://localhost:3000/api/team");
    let data = await res.json();
    setTeams(data.data);
  };

  const updateName = (event, index) => {
    let newData = [...Teams];
    newData[index].name = event.target.value;
    setTeams(newData);
  };

  const updateImageURL = (event, index) => {
    let newData = [...Teams];
    newData[index].imageURL = event.target.value;
    setTeams(newData);
  };

  const updateData = async () => {
    let res = await fetch("http://localhost:3000/api/admin/team", {
      method: "PUT",
      body: JSON.stringify({ AllRecords: Teams }),
    });

    if (res.status == 200) {
      sucessMsg("updated sucessfully");
    } else {
      errorMsg("something went wrong");
    }
  };

  const sucessMsg = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const errorMsg = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="w-full">
        <div className="container m-auto px-4 md:px-0 ">
          <div className="heading text-3xl font-semibold text-center my-4">
            All Teams
          </div>
          <div className="faqs flex flex-col gap-6">
            {Teams?.map((item, index) => (
              <div className="faq flex flex-col" key={index}>
                <label htmlFor="name">
                  <div className="block py-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full"
                    value={item.name}
                    onChange={(e) => {
                      updateName(e, index);
                    }}
                  />
                </label>
                <label htmlFor="para1">
                  <div className="block py-2">Image Url</div>
                  <input
                    name="para1"
                    id="para1"
                    className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full"
                    value={item.imageURL}
                    onChange={(e) => {
                      updateImageURL(e, index);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="buttons my-4 flex items-center justify-end">
            <button
              className="bg-zinc-700 text-white py-[2px] px-4 rounded-md w-fit"
              onClick={() => {
                updateData();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
