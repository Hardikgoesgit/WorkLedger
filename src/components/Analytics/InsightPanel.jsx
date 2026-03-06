import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Star, Users, Zap } from 'lucide-react';

const INSIGHTS = [
  {
    id: 1,
    text: 'Revenue increased 18% in the last 6 months — your strongest growth streak.',
    label: 'Revenue Growth',
    icon: TrendingUp,
    iconBg: 'rgba(35,134,54,0.2)',
    iconColor: '#3FB950',
    borderColor: 'rgba(35,134,54,0.25)',
    tag: '↑ +18%',
    tagColor: '#3FB950',
    tagBg: 'rgba(35,134,54,0.15)',
  },
  {
    id: 2,
    text: 'Transcription is your most profitable service type, contributing the highest margins.',
    label: 'Top Service',
    icon: Star,
    iconBg: 'rgba(210,153,34,0.2)',
    iconColor: '#E3B341',
    borderColor: 'rgba(210,153,34,0.25)',
    tag: 'Top Performer',
    tagColor: '#E3B341',
    tagBg: 'rgba(210,153,34,0.15)',
  },
  {
    id: 3,
    text: '2 clients generate 65% of your total revenue — consider diversifying your portfolio.',
    label: 'Client Focus',
    icon: Users,
    iconBg: 'rgba(88,166,255,0.15)',
    iconColor: '#58A6FF',
    borderColor: 'rgba(88,166,255,0.25)',
    tag: 'Action Item',
    tagColor: '#58A6FF',
    tagBg: 'rgba(88,166,255,0.12)',
  },
];

const InsightPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'linear-gradient(135deg, #131A2A 0%, #0D1117 60%, #111827 100%)',
        border: '1px solid #1F2D45',
        borderRadius: '12px',
        padding: '28px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle noise / glow layers */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(88,166,255,0.06) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(88,166,255,0.5), transparent)',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '8px', borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(88,166,255,0.2), rgba(31,111,235,0.1))',
            border: '1px solid rgba(88,166,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={16} color="#58A6FF" strokeWidth={2} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#E6EDF3', letterSpacing: '-0.3px' }}>
              AI Insights
            </h3>
            <p style={{ fontSize: '12px', color: '#8B949E', marginTop: '1px' }}>
              Intelligent findings from your data
            </p>
          </div>
        </div>

        {/* Powered by badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px', borderRadius: '999px',
          background: 'rgba(88,166,255,0.08)',
          border: '1px solid rgba(88,166,255,0.2)',
          fontSize: '11px', color: '#58A6FF', fontWeight: 500
        }}>
          <Zap size={10} fill="#58A6FF" />
          Powered by AI
        </div>
      </div>

      {/* Insights grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        position: 'relative',
      }}>
        {INSIGHTS.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ translateY: -2, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(22,27,34,0.8)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${insight.borderColor}`,
                borderRadius: '10px',
                padding: '18px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top glow strip */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${insight.iconColor}50, transparent)`,
              }} />

              {/* Icon + label row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                  padding: '7px',
                  borderRadius: '7px',
                  background: insight.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={14} color={insight.iconColor} strokeWidth={2} />
                </div>
                <span style={{
                  padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600,
                  background: insight.tagBg, color: insight.tagColor,
                  letterSpacing: '0.2px'
                }}>
                  {insight.tag}
                </span>
              </div>

              {/* Label */}
              <p style={{ fontSize: '11px', fontWeight: 600, color: insight.iconColor, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {insight.label}
              </p>

              {/* Body text */}
              <p style={{ fontSize: '12.5px', color: '#C9D1D9', lineHeight: 1.6, fontWeight: 400 }}>
                {insight.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InsightPanel;
