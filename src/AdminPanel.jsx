import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import InstructorForm from "./CreateInstructor";
import Course from "./Course";
import CourseTable from "./CourseTable";

const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com"

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [lectureDate, setLectureDate] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  useEffect(() => {
    // Fetch courses and instructors data from backend API
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${hostUrl}/api/course`);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Error While Fetching Course Data !!", {
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

  const fetchInstructors = async () => {
    try {
      const res = await axios.get(`${hostUrl}/api/instructor`);
      setInstructors(res.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      toast.error("Error While Fetching Instructor Data !!", {
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

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };

  const handleInstructorSelection = (instructorId) => {
    setSelectedInstructor(instructorId);
  };

  const handleLectureDateChange = (e) => {
    setLectureDate(e.target.value);
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      if (!selectedInstructor || !lectureDate) {
        toast.error("Please select an instructor and a date");
        return;
      }

      const existingLecture = courses.find(
        (course) =>
          course.instructor === selectedInstructor &&
          new Date(course.date).toDateString() === new Date(lectureDate).toDateString()
      );
  
      if (existingLecture) {
        toast.error("The instructor already has a lecture on this date");
        return;
      }
      const res = await axios.post(`${hostUrl}/api/lecture`, {
        date: lectureDate,
        instructor: selectedInstructor,
        course: selectedCourse._id,
      });
      console.log("res", res.data);
      setLectureDate("");
      setSelectedInstructor("");
      toast.success("Lecture Added Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding lecture:", error);
      toast.error("The instructor already has a lecture on this date !!", {
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

  const openModal = (modal) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => openModal("instructor")}
          style={{
            width: "100",
            height: "100",
            backgroundColor: "#0a64c5",
            marginRight: "0px",
          }}
        >
          Add Instructor
        </button>
        <button
          onClick={() => openModal("course")}
          style={{
            width: "100",
            height: "100",
            backgroundColor: "#0a64c5",
            marginLeft: "150px",
          }}
        >
          Add Course
        </button>
        <button
          onClick={() => openModal("courseTable")}
          style={{
            width: "100",
            height: "100",
            backgroundColor: "#0a64c5",
            marginLeft: "150px",
          }}
        >
          Show Course
        </button>
      </div>
      {activeModal === "instructor" && (
        <InstructorForm fetchData={fetchInstructors} onClose={closeModal} />
      )}
      {activeModal === "course" && (
        <Course fetchData={fetchCourses} onClose={closeModal} />
      )}
      {activeModal === "courseTable" && (
        <CourseTable
          courses={courses}
          handleCourseSelection={handleCourseSelection}
        />
      )}
      {selectedCourse && (
        <div>
          <h2>Add Lecture to {selectedCourse.name}</h2>
          <form onSubmit={handleAddLecture}>
            <input
              type="date"
              value={lectureDate}
              onChange={handleLectureDateChange}
            />
            <select
              value={selectedInstructor}
              onChange={(e) => handleInstructorSelection(e.target.value)}
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Lecture</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
