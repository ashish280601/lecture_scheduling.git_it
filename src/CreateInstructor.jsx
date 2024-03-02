import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./auth/style.css"

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
    <div className="add-container">
  <h2>Add Instructor</h2>
  <form onSubmit={handleAddInstructor} className="add-form">
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter name"
        name="name"
        value={newInstructor?.name || ""}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={newInstructor?.email || ""}
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="add-btn">Add</button>
  </form>
</div>

  );
};

export default CreateInstructor;
