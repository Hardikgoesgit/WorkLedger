import { useSelector, useDispatch } from 'react-redux';
import { togglePayment, removeProject } from '../redux/slices/projectSlice';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.div 
      className="card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3>Projects</h3>
      <div className="list">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet</p>
        ) : (
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                className="project-card"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                layout
                transition={{ duration: 0.3 }}
              >
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <motion.span 
                    className={`badge ${project.paid ? 'badge-success' : 'badge-warning'}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    key={project.paid ? 'paid' : 'pending'}
                  >
                    {project.paid ? 'Paid' : 'Pending'}
                  </motion.span>
                </div>
                <p className="text-muted">Client: {getClientName(project.clientId)}</p>
                <p className="project-amount">${project.amount.toLocaleString()}</p>
                <div className="project-actions">
                  <motion.button
                    className={`btn ${project.paid ? 'btn-secondary' : 'btn-success'}`}
                    onClick={() => handleTogglePayment(project.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {project.paid ? 'Mark Unpaid' : 'Mark Paid'}
                  </motion.button>
                  <motion.button
                    className="btn btn-danger"
                    onClick={() => handleRemoveProject(project.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectList;
