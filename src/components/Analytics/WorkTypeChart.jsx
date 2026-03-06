import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Briefcase } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { workTypeData } from '../../data/analyticsData';

const WorkTypeChart = () => {
  const topService = workTypeData[0];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#1C2128',
          border: '1px solid #30363D',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: payload[0].payload.color, flexShrink: 0 }} />
            <span style={{ color: '#E6EDF3', fontSize: '12px', fontWeight: 600 }}>{payload[0].name}</span>
          </div>
          <p style={{ color: '#8B949E', fontSize: '11px' }}>{payload[0].value}% of total work</p>
        </div>
      );
    }
    return null;
  };

  /* Side legend */
  const LegendRows = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '115px' }}>
      {workTypeData.map((entry) => (
        <div key={entry.type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: '#8B949E', flex: 1 }}>{entry.type}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#E6EDF3' }}>{entry.value}%</span>
        </div>
      ))}
    </div>
  );

  const shortName = topService.type.length > 8 ? topService.type.slice(0, 7) + '…' : topService.type;

  return (
    <AnalyticsCard
      title="Work Type Distribution"
      subtitle="Services breakdown"
      icon={Briefcase}
      trend={`${topService.value}%`}
      kpiValue={topService.type}
      kpiLabel="Most common service"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', height: '100%' }}>
        {/* Relative wrapper for absolute center-label overlay */}
        <div style={{ position: 'relative', width: '170px', height: '170px', flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={workTypeData}
                cx="50%" cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
                nameKey="type"
                strokeWidth={0}
                animationDuration={800}
                labelLine={false}
              >
                {workTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#E6EDF3', lineHeight: 1, textAlign: 'center', maxWidth: '80px' }}>
              {shortName}
            </span>
            <span style={{ fontSize: '10px', color: '#8B949E', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Top
            </span>
          </div>
        </div>
        <LegendRows />
      </div>
    </AnalyticsCard>
  );
};

export default WorkTypeChart;
