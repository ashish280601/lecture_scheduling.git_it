import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com"

const Course = ({ fetchData }) => {
    const [newCourse, setNewCourse] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
    };
    const handleAddCourse = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post(`${hostUrl}/api/course`, newCourse);
          fetchData(); 
          setNewCourse({});
          console.log("res", res.data);
          toast.success("Course Added Sucessfully",{
            position:"top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } catch (error) {
          console.error('Error adding course:', error);
          toast.error("Error While Adding Course Sucessfully",{
            position:"top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      };
  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newCourse.name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Level"
          name="level"
          value={newCourse.level || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCourse.description || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={newCourse.image || ""}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Course