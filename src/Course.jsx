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
    <div className="add-container">
  <h2>Add Course</h2>
  <form onSubmit={handleAddCourse} className="add-form">
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter name"
        name="name"
        value={newCourse.name || ""}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Level</label>
      <input
        type="text"
        placeholder="Enter level"
        name="level"
        value={newCourse.level || ""}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Description</label>
      <input
        type="text"
        placeholder="Enter description"
        name="description"
        value={newCourse.description || ""}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Image URL</label>
      <input
        type="text"
        placeholder="Enter image URL"
        name="image"
        value={newCourse.image || ""}
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="add-btn">Add</button>
  </form>
</div>

  );
};

export default Course