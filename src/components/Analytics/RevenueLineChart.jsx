import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { monthlyRevenue } from '../../data/analyticsData';

const RevenueLineChart = () => {
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.paid + month.pending, 0);
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].paid + monthlyRevenue[monthlyRevenue.length - 1].pending;
  const prevMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].paid + monthlyRevenue[monthlyRevenue.length - 2].pending;
  const trendPct = ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#1C2128',
          border: '1px solid #30363D',
          borderRadius: '8px',
          padding: '12px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <p style={{ color: '#8B949E', fontSize: '11px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {payload[0]?.payload?.month}
          </p>
          {payload.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
              <span style={{ color: '#8B949E', fontSize: '12px' }}>{entry.name}:</span>
              <span style={{ color: '#E6EDF3', fontSize: '12px', fontWeight: 600 }}>${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AnalyticsCard
      title="Revenue Over Time"
      subtitle="Monthly paid vs. pending"
      icon={TrendingUp}
      trend={`${trendPct > 0 ? '+' : ''}${trendPct}%`}
      kpiValue={`$${(lastMonthRevenue / 1000).toFixed(1)}k`}
      kpiLabel="This month"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            {/* Electric blue – primary paid series */}
            <linearGradient id="fillPaid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#58A6FF" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#58A6FF" stopOpacity={0.01} />
            </linearGradient>
            {/* Gold – pending series */}
            <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D29922" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#D29922" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(48,54,61,0.6)" vertical={false} />

          <XAxis
            dataKey="month"
            stroke="transparent"
            tick={{ fill: '#8B949E', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="transparent"
            tick={{ fill: '#8B949E', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
            width={38}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(88,166,255,0.3)', strokeWidth: 1, strokeDasharray: '4 2' }} />

          <Area
            type="monotone"
            dataKey="paid"
            name="Paid"
            stroke="#58A6FF"
            strokeWidth={2}
            fill="url(#fillPaid)"
            dot={false}
            activeDot={{ r: 4, fill: '#58A6FF', stroke: '#0D1117', strokeWidth: 2 }}
            animationDuration={900}
          />
          <Area
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke="#D29922"
            strokeWidth={1.5}
            strokeDasharray="6 3"
            fill="url(#fillPending)"
            dot={false}
            activeDot={{ r: 4, fill: '#D29922', stroke: '#0D1117', strokeWidth: 2 }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
};

export default RevenueLineChart;
