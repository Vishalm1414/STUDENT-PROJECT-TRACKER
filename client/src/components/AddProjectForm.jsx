import React, { useState } from 'react';

const AddProjectForm = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [student, setStudent] = useState('');
  const [technology, setTechnology] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !student) {
      alert('Title matrum Student Name kandippa kudukanum!');
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      student,
      technology,
      deadline,
      status,
      progress: Number(progress),
      description,
    };

    onAddProject(newProject);

    // Form inputs-a clear panna:
    setTitle('');
    setStudent('');
    setTechnology('');
    setDeadline('');
    setStatus('Pending');
    setProgress(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Add New Project</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Student Name" value={student} onChange={(e) => setStudent(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Technology (e.g. MERN Stack)" value={technology} onChange={(e) => setTechnology(e.target.value)} style={inputStyle} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={inputStyle} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="number" placeholder="Progress % (0-100)" value={progress} onChange={(e) => setProgress(e.target.value)} min="0" max="100" style={inputStyle} />
      </div>
      <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, width: '100%', marginTop: '1rem', height: '80px' }} />
      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
        + Add Project
      </button>
    </form>
  );
};

const inputStyle = {
  padding: '0.6rem 0.8rem',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
  outline: 'none',
};

export default AddProjectForm;