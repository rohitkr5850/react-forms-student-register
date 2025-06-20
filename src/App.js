import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentCard from './components/StudentCard';
import axios from 'axios';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:3001/students");
    setStudents(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <StudentForm onStudentAdded={fetchStudents} />
      <h2>Total Registered: {students.length}</h2>
      <div>
        {students.map(student => (
          <StudentCard key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default App;
