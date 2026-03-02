import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsCard from './AnalyticsCard';
import { clientRevenue } from '../../data/analyticsData';

const ClientBarChart = () => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-semibold">{payload[0].payload.client}</p>
          <p className="text-blue-400 text-sm font-medium">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <AnalyticsCard 
      title="Client Contribution" 
      subtitle="Top clients by revenue"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={clientRevenue} 
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="client" 
            stroke="#9ca3af" 
            style={{ fontSize: '11px' }}
            tickLine={false}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#9ca3af" 
            style={{ fontSize: '12px' }}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          >
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
};

export default ClientBarChart;
