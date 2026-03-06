import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import {
  selectTotalRevenue,
  selectPaidRevenue,
  selectPendingRevenue,
  selectTotalProjects
} from '../redux/slices/projectSelectors';
import { motion, AnimatePresence } from 'framer-motion';
import RevenueLineChart from './Analytics/RevenueLineChart';
import ProjectPieChart from './Analytics/ProjectPieChart';
import ClientBarChart from './Analytics/ClientBarChart';
import WorkTypeChart from './Analytics/WorkTypeChart';
import InsightPanel from './Analytics/InsightPanel';
import {
  DollarSign, CheckCircle2, Clock, FolderOpen,
  ChevronDown, Check, Calendar
} from 'lucide-react';

/* ── Time-filter options ── */
const TIME_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 6 months', 'Last 12 months'];

/* ── Custom dropdown component ── */
const TimeDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 50 }}>
      <button
        id="time-filter-btn"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 14px',
          background: open ? 'rgba(88,166,255,0.1)' : '#161B22',
          border: `1px solid ${open ? 'rgba(88,166,255,0.5)' : '#30363D'}`,
          borderRadius: '8px',
          color: '#E6EDF3',
          fontSize: '13px', fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        <Calendar size={13} color="#8B949E" />
        {value}
        <ChevronDown
          size={13}
          color="#8B949E"
          style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              minWidth: '170px',
              background: '#1C2128',
              border: '1px solid #30363D',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            {TIME_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '8px',
                  padding: '9px 14px',
                  background: 'transparent',
                  border: 'none',
                  color: value === opt ? '#58A6FF' : '#C9D1D9',
                  fontSize: '13px', fontWeight: value === opt ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(88,166,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {opt}
                {value === opt && <Check size={12} color="#58A6FF" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Stat card data ── */
const STAT_CARDS = [
  { id: 'total-revenue', label: 'Total Revenue', icon: DollarSign, variant: '', format: (v) => `$${v.toLocaleString()}` },
  { id: 'paid-revenue', label: 'Paid Revenue', icon: CheckCircle2, variant: 'stat-success', format: (v) => `$${v.toLocaleString()}` },
  { id: 'pending-revenue', label: 'Pending Revenue', icon: Clock, variant: 'stat-warning', format: (v) => `$${v.toLocaleString()}` },
  { id: 'total-projects', label: 'Total Projects', icon: FolderOpen, variant: 'stat-info', format: (v) => v },
];

/* ── Main Dashboard ── */
const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('Last 6 months');
  const totalRevenue = useSelector(selectTotalRevenue);
  const paidRevenue = useSelector(selectPaidRevenue);
  const pendingRevenue = useSelector(selectPendingRevenue);
  const totalProjects = useSelector(selectTotalProjects);

  const values = [totalRevenue, paidRevenue, pendingRevenue, totalProjects];

  return (
    <div className="dashboard">
      {/* ─── Summary KPIs ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#E6EDF3', letterSpacing: '-0.4px', marginBottom: '2px' }}>
            Overview
          </h2>
          <p style={{ fontSize: '12px', color: '#8B949E' }}>Your workspace at a glance</p>
        </div>
      </div>

      <motion.div
        className="stats-grid"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      >
        {STAT_CARDS.map(({ id, label, icon: Icon, variant, format }, i) => (
          <motion.div
            key={id}
            id={id}
            className={`stat-card ${variant}`}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          >
            {/* z-index:2 wrapper keeps content above the sweeping ::before flood */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3>{label}</h3>
                <div style={{
                  padding: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  display: 'flex',
                }}>
                  <Icon size={14} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                </div>
              </div>
              <p className="stat-value">{format(values[i])}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Analytics Section ─── */}
      <div style={{ marginTop: '40px' }}>
        {/* Section header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#E6EDF3', letterSpacing: '-0.3px', marginBottom: '2px' }}>
              Analytics
            </h2>
            <p style={{ fontSize: '12px', color: '#8B949E' }}>Revenue trends and project performance</p>
          </div>
          <TimeDropdown value={timeFilter} onChange={setTimeFilter} />
        </div>

        {/* Chart grid — strict 2-col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <RevenueLineChart />
          <ProjectPieChart />
          <ClientBarChart />
          <WorkTypeChart />
        </div>

        {/* AI Insights — full width */}
        <InsightPanel />
      </div>
    </div>
  );
};

export default Dashboard;
