import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { clientRevenue } from '../../data/analyticsData';

/* Gradient colours per bar – subtle variation on the primary blue */
const BAR_COLORS = ['#58A6FF', '#4D9AEF', '#428FDF', '#3784CF', '#2C79BF', '#1F6FEB'];

const ClientBarChart = () => {
  const totalRevenue = clientRevenue.reduce((sum, c) => sum + c.revenue, 0);
  const topClient = clientRevenue[0];
  const topClientShare = ((topClient.revenue / totalRevenue) * 100).toFixed(0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const share = ((payload[0].value / totalRevenue) * 100).toFixed(0);
      return (
        <div style={{
          background: '#1C2128',
          border: '1px solid #30363D',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <p style={{ color: '#E6EDF3', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
            {payload[0].payload.client}
          </p>
          <p style={{ color: '#58A6FF', fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>
            ${payload[0].value.toLocaleString()}
          </p>
          <p style={{ color: '#8B949E', fontSize: '11px' }}>{share}% of total</p>
        </div>
      );
    }
    return null;
  };

  /* Short label formatter – truncate long names */
  const formatLabel = (name) => name.length > 8 ? name.slice(0, 7) + '…' : name;

  return (
    <AnalyticsCard
      title="Client Contribution"
      subtitle="Revenue by top client"
      icon={Users}
      trend={`${topClientShare}%`}
      kpiValue={`$${(topClient.revenue / 1000).toFixed(1)}k`}
      kpiLabel={`${topClient.client} (top client)`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={clientRevenue}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(48,54,61,0.6)" horizontal={true} vertical={false} />
          <XAxis
            dataKey="client"
            stroke="transparent"
            tick={{ fill: '#8B949E', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatLabel}
          /* NO angle – labels stay horizontal and legible */
          />
          <YAxis
            stroke="transparent"
            tick={{ fill: '#8B949E', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(88,166,255,0.05)', radius: 4 }} />
          <Bar
            dataKey="revenue"
            radius={[4, 4, 0, 0]}
            maxBarSize={44}
            animationDuration={800}
          >
            {clientRevenue.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
};

export default ClientBarChart;
