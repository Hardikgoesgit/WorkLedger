import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, FolderKanban, Users, BarChart3, Layers, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

const ROUTE_LABELS = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/clients': 'Clients',
  '/reports': 'Reports',
};

const Header = () => {
  const location = useLocation();
  const currentLabel = ROUTE_LABELS[location.pathname] ?? 'Overview';

  return (
    <header className="header">
      <div className="header-content">
        {/* Left: Logo + Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg, #58A6FF 0%, #1F6FEB 100%)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Layers size={14} color="#0D1117" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#E6EDF3', letterSpacing: '-0.3px' }}>
              WorkLedger
            </span>
          </div>

          {/* Nav */}
          <nav className="nav-links">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={isActive ? 'active' : ''}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Icon size={13} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Breadcrumb + System status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span>WorkLedger</span>
            <ChevronRight size={12} />
            <span className="breadcrumb-current">{currentLabel}</span>
          </div>

          {/* Status dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#3FB950' }}>
            <span style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#3FB950',
              boxShadow: '0 0 6px #3FB950',
              display: 'inline-block'
            }} />
            Live
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
