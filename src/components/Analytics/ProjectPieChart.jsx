import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { projectStatus } from '../../data/analyticsData';

const COLORS = {
  Completed: '#238636',
  Ongoing: '#58A6FF',
  Pending: '#D29922',
};

const ProjectPieChart = () => {
  const totalProjects = projectStatus.reduce((sum, s) => sum + s.value, 0);
  const completedProjects = projectStatus.find(s => s.name === 'Completed')?.value || 0;
  const completionRate = ((completedProjects / totalProjects) * 100).toFixed(0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const pct = ((payload[0].value / totalProjects) * 100).toFixed(0);
      const color = payload[0].payload.color || COLORS[payload[0].name];
      return (
        <div style={{
          background: '#1C2128',
          border: '1px solid #30363D',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ color: '#E6EDF3', fontSize: '12px', fontWeight: 600 }}>{payload[0].name}</span>
          </div>
          <p style={{ color: '#8B949E', fontSize: '11px' }}>
            {payload[0].value} projects · {pct}%
          </p>
        </div>
      );
    }
    return null;
  };

  /* Side legend */
  const LegendRows = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '110px' }}>
      {projectStatus.map((entry) => {
        const pct = ((entry.value / totalProjects) * 100).toFixed(0);
        const color = entry.color || COLORS[entry.name];
        return (
          <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: '#8B949E', flex: 1 }}>{entry.name}</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#E6EDF3' }}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <AnalyticsCard
      title="Project Status"
      subtitle="Current project breakdown"
      icon={PieChartIcon}
      trend={`${completionRate}%`}
      kpiValue={totalProjects}
      kpiLabel="Total projects"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', height: '100%' }}>
        {/* Relative container so we can overlay the center text */}
        <div style={{ position: 'relative', width: '170px', height: '170px', flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatus}
                cx="50%" cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationDuration={800}
                labelLine={false}
              >
                {projectStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label as absolute overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#E6EDF3', lineHeight: 1 }}>
              {totalProjects}
            </span>
            <span style={{ fontSize: '10px', color: '#8B949E', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total
            </span>
          </div>
        </div>
        <LegendRows />
      </div>
    </AnalyticsCard>
  );
};

export default ProjectPieChart;
