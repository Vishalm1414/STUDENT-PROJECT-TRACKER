import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Adjust API endpoint URL if needed
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        navigate('/');
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project.");
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading project details...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!project) return <div style={{ padding: '20px' }}>Project not found.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Back to Dashboard</Link>
      
      <h1 style={{ marginTop: '15px' }}>{project.title}</h1>
      <p style={{ color: '#555' }}>{project.description}</p>
      
      <div style={{ margin: '20px 0', lineHeight: '1.8' }}>
        <p><strong>Student Name:</strong> {project.studentName || project.student}</p>
        <p><strong>Technology:</strong> {project.technology}</p>
        <p><strong>Status:</strong> <span style={{ fontWeight: 'bold' }}>{project.status}</span></p>
        <p><strong>Deadline:</strong> {project.deadline}</p>
        
        <div style={{ marginTop: '10px' }}>
          <strong>Progress: {project.progress}%</strong>
          <div style={{ background: '#e0e0e0', borderRadius: '4px', height: '15px', width: '100%', marginTop: '5px' }}>
            <div 
              style={{ 
                width: `${project.progress}%`, 
                background: project.progress === 100 ? '#4caf50' : '#2196f3', 
                height: '100%', 
                borderRadius: '4px' 
              }} 
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleDelete} 
        style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Delete Project
      </button>
    </div>
  );
};

export default ProjectDetails;