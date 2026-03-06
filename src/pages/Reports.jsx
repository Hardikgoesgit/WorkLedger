import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

const Reports = () => {
  const projects = useSelector((state) => state.projects.projects);
  const clients = useSelector((state) => state.clients.clients);

  const reportData = useMemo(() => {
    const totalRevenue = projects.reduce((sum, p) => sum + p.amount, 0);
    const paidRevenue = projects.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0);
    const pendingRevenue = totalRevenue - paidRevenue;

    const clientStats = clients.map(client => {
      const cps = projects.filter(p => p.clientId === client.id);
      const ct = cps.reduce((sum, p) => sum + p.amount, 0);
      const cp = cps.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0);
      return { ...client, projectCount: cps.length, totalRevenue: ct, paidRevenue: cp, pendingRevenue: ct - cp };
    });

    return { totalRevenue, paidRevenue, pendingRevenue, clientStats };
  }, [projects, clients]);

  const summaryCards = [
    { id: 'rpt-total', label: 'Total Expected', icon: DollarSign, value: `$${reportData.totalRevenue.toLocaleString()}`, variant: '' },
    { id: 'rpt-paid', label: 'Total Collected', icon: CheckCircle2, value: `$${reportData.paidRevenue.toLocaleString()}`, variant: 'stat-success' },
    { id: 'rpt-pending', label: 'Total Outstanding', icon: Clock, value: `$${reportData.pendingRevenue.toLocaleString()}`, variant: 'stat-warning' },
  ];

  return (
    <div className="page-container">
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#E6EDF3', letterSpacing: '-0.4px', marginBottom: '4px' }}>
          Financial Reports
        </h2>
        <p style={{ fontSize: '13px', color: '#8B949E' }}>Detailed revenue breakdown by client</p>
      </div>

      {/* Summary stat cards */}
      <motion.div
        className="stats-grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      >
        {summaryCards.map(({ id, label, icon: Icon, value, variant }) => (
          <motion.div
            key={id}
            id={id}
            className={`stat-card ${variant}`}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3>{label}</h3>
              <div style={{ padding: '6px', background: 'rgba(139,148,158,0.1)', borderRadius: '6px', display: 'flex' }}>
                <Icon size={14} color="#8B949E" strokeWidth={2} />
              </div>
            </div>
            <p className="stat-value">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Client breakdown */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E6EDF3', letterSpacing: '-0.2px' }}>
            Client Breakdown
          </h3>
          <span style={{ fontSize: '12px', color: '#8B949E' }}>
            {reportData.clientStats.length} clients
          </span>
        </div>

        <div className="list-container">
          {reportData.clientStats.length === 0 ? (
            <p className="empty-message">No client data available.</p>
          ) : (
            reportData.clientStats.map(client => (
              <motion.div
                key={client.id}
                className="list-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="item-details">
                  <h4>{client.name}</h4>
                  <p>{client.projectCount} project{client.projectCount !== 1 ? 's' : ''}</p>
                </div>
                <div className="item-actions">
                  <div style={{ fontWeight: 600, color: '#3FB950', fontSize: '13px' }}>
                    Paid: ${client.paidRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#E3B341', marginTop: '2px' }}>
                    Pending: ${client.pendingRevenue.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
