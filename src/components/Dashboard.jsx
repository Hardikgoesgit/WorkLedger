import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  selectTotalRevenue,
  selectPaidRevenue,
  selectPendingRevenue,
  selectTotalProjects
} from '../redux/slices/projectSelectors';
import { motion } from 'framer-motion';
import RevenueLineChart from './Analytics/RevenueLineChart';
import ProjectPieChart from './Analytics/ProjectPieChart';
import ClientBarChart from './Analytics/ClientBarChart';
import WorkTypeChart from './Analytics/WorkTypeChart';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('Last 6 months');
  
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

      {/* Analytics Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Analytics</h2>
          
          {/* Time Filter Dropdown */}
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer text-sm font-medium hover:bg-gray-800/70"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 6 months">Last 6 months</option>
          </select>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevenueLineChart />
          <ProjectPieChart />
          <ClientBarChart />
          <WorkTypeChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
