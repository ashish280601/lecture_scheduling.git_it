import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com"

const LecturesList = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await axios.get(`${hostUrl}/api/lecture`);
      console.log("res", res.data);
      setLectures(res.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      toast.error("Error While Fetching Instructor Data!!", {
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
      <h1>Lectures List</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Sr. No</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Course</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Instructor</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr key={lecture._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{new Date(lecture.date).toLocaleDateString()}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{lecture.course.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{lecture.instructor.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LecturesList;
