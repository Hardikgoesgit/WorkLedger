import { useSelector } from 'react-redux';
import {
  selectTotalRevenue,
  selectPaidRevenue,
  selectPendingRevenue,
  selectTotalProjects
} from '../features/projects/projectSelectors';

const Dashboard = () => {
  // All selectors recompute when projects state changes → UI re-renders
  const totalRevenue = useSelector(selectTotalRevenue);
  const paidRevenue = useSelector(selectPaidRevenue);
  const pendingRevenue = useSelector(selectPendingRevenue);
  const totalProjects = useSelector(selectTotalProjects);

  return (
    <div className="dashboard">
      <h2>Summary</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card stat-success">
          <h3>Paid Revenue</h3>
          <p className="stat-value">${paidRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card stat-warning">
          <h3>Pending Revenue</h3>
          <p className="stat-value">${pendingRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card stat-info">
          <h3>Total Projects</h3>
          <p className="stat-value">{totalProjects}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
