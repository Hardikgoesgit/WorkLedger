import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, subtitle, children, icon: Icon, trend, kpiValue, kpiLabel, fullWidth = false }) => {
  const isPositiveTrend = trend && parseFloat(trend) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '360px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        borderColor: 'rgba(88,166,255,0.35)',
        boxShadow: '0 0 0 1px rgba(88,166,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Subtle top accent glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '20%', right: '20%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(88,166,255,0.4), transparent)',
        borderRadius: '1px',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && (
            <div style={{
              padding: '6px',
              background: 'rgba(88,166,255,0.1)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon size={13} color="#58A6FF" strokeWidth={2} />
            </div>
          )}
          <h3 style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#E6EDF3',
            letterSpacing: '-0.1px',
          }}>
            {title}
          </h3>
        </div>

        {trend && (
          <span style={{
            padding: '3px 8px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            background: isPositiveTrend ? 'rgba(35,134,54,0.2)' : 'rgba(248,81,73,0.2)',
            color: isPositiveTrend ? '#3FB950' : '#f85149',
            border: `1px solid ${isPositiveTrend ? 'rgba(35,134,54,0.35)' : 'rgba(248,81,73,0.35)'}`,
          }}>
            {isPositiveTrend ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p style={{ fontSize: '12px', color: '#8B949E', marginBottom: '16px' }}>
          {subtitle}
        </p>
      )}

      {/* KPI */}
      {kpiValue && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#E6EDF3',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}>
            {kpiValue}
          </p>
          <p style={{ fontSize: '11px', color: '#8B949E', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {kpiLabel || 'Total'}
          </p>
        </div>
      )}

      {/* Chart area */}
      <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
