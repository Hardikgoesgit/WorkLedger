import { useSelector, useDispatch } from 'react-redux';
import { togglePayment, removeProject } from '../features/projects/projectSlice';

const ProjectList = () => {
  const dispatch = useDispatch();
  
  // Subscribe to both projects and clients → UI re-renders when either changes
  const projects = useSelector((state) => state.projects.projects);
  const clients = useSelector((state) => state.clients.clients);

  // Helper function to get client name by ID
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const handleTogglePayment = (projectId) => {
    // UI Event → dispatch(action) → reducer updates state → UI re-renders
    dispatch(togglePayment(projectId));
  };

  const handleRemoveProject = (projectId) => {
    // UI Event → dispatch(action) → reducer updates state → selectors recompute → UI re-renders
    dispatch(removeProject(projectId));
  };

  return (
    <div className="card">
      <h3>Projects</h3>
      <div className="list">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h4>{project.title}</h4>
                <span className={`badge ${project.paid ? 'badge-success' : 'badge-warning'}`}>
                  {project.paid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <p className="text-muted">Client: {getClientName(project.clientId)}</p>
              <p className="project-amount">${project.amount.toLocaleString()}</p>
              <div className="project-actions">
                <button
                  className={`btn ${project.paid ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleTogglePayment(project.id)}
                >
                  {project.paid ? 'Mark Unpaid' : 'Mark Paid'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveProject(project.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
