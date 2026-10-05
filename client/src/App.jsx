import React, { useState } from 'react';
import AddProjectForm from './components/AddProjectForm'; // Path correct-a irukku nu paarthukkonga

const App = () => {
  // 1. Hardcoded initial data (Ungaloda existing projects):
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Student Attendance System',
      student: 'Vishal',
      technology: 'MERN Stack',
      deadline: '2026-10-15',
      status: 'In Progress',
      progress: 70,
      description: 'A web application to manage student attendance.',
    },
    {
      id: 2,
      title: 'College Event Management',
      student: 'Vishal',
      technology: 'React + Node.js',
      deadline: '2026-11-10',
      status: 'Pending',
      progress: 30,
      description: 'Application for managing college events and registrations.',
    },
  ]);

  // 2. User dynamic-a add pannum new project-a state-il add panna function:
  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  // 3. Delete panna function:
  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Dynamic Form Component-a inge render pannugirom */}
      <AddProjectForm onAddProject={handleAddProject} />

      {/* Projects Count Header */}
      <h2 style={{ margin: '1.5rem 0 1rem 0' }}>My Projects ({projects.length})</h2>

      {/* Dynamic Cards List */}
      <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div key={project.id} className="card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 className="card-title">{project.title}</h3>
              <span className={`badge badge-${project.status.toLowerCase().replace(' ', '-')}`}>
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

            {/* Progress Bar */}
            <div className="progress-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.progress}%`, height: '100%', background: '#2563eb' }}></div>
              </div>
            </div>

            {/* Delete Action */}
            <button 
              className="btn btn-danger" 
              onClick={() => handleDelete(project.id)}
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