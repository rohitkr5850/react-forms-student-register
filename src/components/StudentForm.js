import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  fullName: '',
  email: '',
  age: '',
  gender: '',
  skills: [],
  timeSlot: '',
  agreed: false,
  avatar: '',
};

const avatars = {
  Male: "https://randomuser.me/api/portraits/men/75.jpg",
  Female: "https://randomuser.me/api/portraits/women/65.jpg",
  Other: "https://randomuser.me/api/portraits/lego/2.jpg",
};

const StudentForm = ({ onStudentAdded }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (form.gender) {
      setForm(prev => ({
        ...prev,
        avatar: avatars[form.gender]
      }));
    }
  }, [form.gender]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'skills') {
      const newSkills = checked
        ? [...form.skills, value]
        : form.skills.filter(skill => skill !== value);
      setForm({ ...form, skills: newSkills });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const { fullName, email, age, gender, skills, timeSlot, agreed } = form;
    if (!fullName || !email || !age || !gender || !skills.length || !timeSlot || !agreed) {
      return "All fields are required and Terms must be agreed!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validate();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    try {
      await axios.post("http://localhost:3001/students", form);
      setForm(initialForm);
      setError("");
      onStudentAdded(); 
    } catch (err) {
      setError("Submission failed. Check server.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />

      <div>
        <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> Female</label>
        <label><input type="radio" name="gender" value="Other" checked={form.gender === 'Other'} onChange={handleChange} /> Other</label>
      </div>

      <div>
        <label><input type="checkbox" name="skills" value="HTML" onChange={handleChange} /> HTML</label>
        <label><input type="checkbox" name="skills" value="CSS" onChange={handleChange} /> CSS</label>
        <label><input type="checkbox" name="skills" value="JavaScript" onChange={handleChange} /> JavaScript</label>
        <label><input type="checkbox" name="skills" value="React" onChange={handleChange} /> React</label>
      </div>

      <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
        <option value="">Select Time Slot</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <div>
        <label><input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} /> I agree to the Terms & Conditions</label>
      </div>

      <input name="avatar" value={form.avatar} readOnly placeholder="Avatar URL" />

      <button type="submit">Register</button>
    </form>
  );
};

export default StudentForm;
