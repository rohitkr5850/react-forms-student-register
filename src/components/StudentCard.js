import React from 'react';

const StudentCard = ({ student, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <img src={student.avatar} alt={student.fullName} width="100" />
      <h3>{student.fullName}</h3>
      <p>Email: {student.email}</p>
      <p>Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <p>Skills: {student.skills.join(', ')}</p>
      <p>Time Slot: {student.timeSlot}</p>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  );
};

export default StudentCard;
