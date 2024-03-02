import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com"

const CreateInstructor = ({ fetchData }) => {
  const [newInstructor, setNewInstructor] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
        setNewInstructor(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
  }

  const handleAddInstructor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${hostUrl}/api/instructor`, newInstructor);
      fetchData();
      setNewInstructor({});
      console.log("res", res.data);
      toast.success("Instructor Added Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding instructor:", error);
      toast.error("Error While Adding Instructor", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <h2>Add Instructor</h2>
      <form onSubmit={handleAddInstructor}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newInstructor?.name || ""}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newInstructor?.email || ""}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateInstructor;
