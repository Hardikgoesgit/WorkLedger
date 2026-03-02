import React from 'react';
import AddProjectForm from '../components/AddProjectForm';
import ProjectList from '../components/ProjectList';

const Projects = () => {
  return (
    <div className="page-container">
      <div className="grid">
        <div className="column">
          <AddProjectForm />
        </div>
        <div className="column">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Projects;
