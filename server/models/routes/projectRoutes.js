import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProjectForm from './components/AddProjectForm';

const App = () => {
  const [projects, setProjects] = useState([]);

  // A) Backend-il irundhu existing Projects-a load panna
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // B) New project-a Database-il store panna function
  const handleAddProject = async (newProject) => {
    try {
      const response = await axios.post('http://localhost:5000/api/projects', newProject);
      // DB-il save aana unique ID udan new project state-il add aagum
      setProjects([response.data, ...projects]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // C) Database-il irundhu Project-a delete panna
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id && p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <AddProjectForm onAddProject={handleAddProject} />

      <h2 style={{ margin: '1.5rem 0 1rem 0' }}>My Projects ({projects.length})</h2>

      <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div key={project._id || project.id} className="card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 className="card-title">{project.title}</h3>
              <span className={`badge badge-${project.status ? project.status.toLowerCase().replace(' ', '-') : 'pending'}`}>
                {project.status}
              </span>
            </div>
            
            <p className="card-desc" style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {project.description}
            </p>

            <div className="card-meta" style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              <span><strong>Student:</strong> {project.student}</span>
              <span><strong>Technology:</strong> {project.technology}</span>
              <span><strong>Deadline:</strong> {project.deadline}</span>
            </div>

            <div className="progress-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.progress}%`, height: '100%', background: '#2563eb' }}></div>
              </div>
            </div>

            <button 
              className="btn btn-danger" 
              onClick={() => handleDelete(project._id || project.id)}
              style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;