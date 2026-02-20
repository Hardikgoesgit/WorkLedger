import { useSelector } from 'react-redux';
import {
  selectTotalRevenue,
  selectPaidRevenue,
  selectPendingRevenue,
  selectTotalProjects
} from '../features/projects/projectSelectors';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // All selectors recompute when projects state changes → UI re-renders
  const totalRevenue = useSelector(selectTotalRevenue);
  const paidRevenue = useSelector(selectPaidRevenue);
  const pendingRevenue = useSelector(selectPendingRevenue);
  const totalProjects = useSelector(selectTotalProjects);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="dashboard">
      <h2>Summary</h2>
      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="stat-card" variants={cardVariants}>
          <h3>Total Revenue</h3>
          <p className="stat-value">${totalRevenue.toLocaleString()}</p>
        </motion.div>
        <motion.div className="stat-card stat-success" variants={cardVariants}>
          <h3>Paid Revenue</h3>
          <p className="stat-value">${paidRevenue.toLocaleString()}</p>
        </motion.div>
        <motion.div className="stat-card stat-warning" variants={cardVariants}>
          <h3>Pending Revenue</h3>
          <p className="stat-value">${pendingRevenue.toLocaleString()}</p>
        </motion.div>
        <motion.div className="stat-card stat-info" variants={cardVariants}>
          <h3>Total Projects</h3>
          <p className="stat-value">{totalProjects}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
