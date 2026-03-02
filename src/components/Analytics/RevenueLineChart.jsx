import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsCard from './AnalyticsCard';
import { monthlyRevenue } from '../../data/analyticsData';

const RevenueLineChart = () => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-semibold mb-2">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AnalyticsCard 
      title="Revenue Over Time" 
      subtitle="Monthly revenue trends"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyRevenue} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af" 
            style={{ fontSize: '12px' }}
            tickLine={false}
          />
          <YAxis 
            stroke="#9ca3af" 
            style={{ fontSize: '12px' }}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="paid" 
            stroke="#22c55e" 
            strokeWidth={3}
            name="Paid Revenue"
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="pending" 
            stroke="#f59e0b" 
            strokeWidth={3}
            name="Pending Revenue"
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
};

export default RevenueLineChart;
