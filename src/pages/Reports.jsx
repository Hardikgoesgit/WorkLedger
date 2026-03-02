import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Reports = () => {
  const { darkMode } = useContext(AppContext);
  const projects = useSelector((state) => state.projects.projects);
  const clients = useSelector((state) => state.clients.clients);

  // useMemo for derived data optimization
  const reportData = useMemo(() => {
    console.log('Calculating report data...');
    
    const totalRevenue = projects.reduce((sum, p) => sum + p.amount, 0);
    const paidRevenue = projects.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0);
    const pendingRevenue = totalRevenue - paidRevenue;
    
    const clientStats = clients.map(client => {
      const clientProjects = projects.filter(p => p.clientId === client.id);
      const clientTotal = clientProjects.reduce((sum, p) => sum + p.amount, 0);
      const clientPaid = clientProjects.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0);
      
      return {
        ...client,
        projectCount: clientProjects.length,
        totalRevenue: clientTotal,
        paidRevenue: clientPaid,
        pendingRevenue: clientTotal - clientPaid
      };
    });

    return {
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      clientStats
    };
  }, [projects, clients]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-container">
      <h2>Financial Reports</h2>
      <p style={{ marginBottom: '20px', color: darkMode ? '#aaa' : '#666' }}>
        Detailed breakdown of revenue by client.
      </p>

      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="stat-card" variants={itemVariants}>
          <h3>Total Expected</h3>
          <p className="stat-value">${reportData.totalRevenue.toLocaleString()}</p>
        </motion.div>
        <motion.div className="stat-card stat-success" variants={itemVariants}>
          <h3>Total Collected</h3>
          <p className="stat-value">${reportData.paidRevenue.toLocaleString()}</p>
        </motion.div>
        <motion.div className="stat-card stat-warning" variants={itemVariants}>
          <h3>Total Outstanding</h3>
          <p className="stat-value">${reportData.pendingRevenue.toLocaleString()}</p>
        </motion.div>
      </motion.div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Client Breakdown</h3>
      <div className="list-container">
        {reportData.clientStats.length === 0 ? (
          <p className="empty-message">No client data available.</p>
        ) : (
          reportData.clientStats.map(client => (
            <motion.div 
              key={client.id} 
              className="list-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="item-details">
                <h4>{client.name}</h4>
                <p>{client.projectCount} Projects</p>
              </div>
              <div className="item-actions" style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>
                  Paid: ${client.paidRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--warning-color)' }}>
                  Pending: ${client.pendingRevenue.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
