import React from 'react';

const CourseTable = ({ courses, handleCourseSelection }) => {
  return (
    <div>
      <h2>Courses</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Level</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr
              key={course?._id}
              onClick={() => handleCourseSelection(course)}
            >
              <td style={{ border: '1px solid black', padding: '8px' }}>{course?.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{course?.level}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{course?.description}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <img src={course?.image} alt={course?.name} style={{ width: '100px', height: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
