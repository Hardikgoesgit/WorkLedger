import { motion } from 'framer-motion';

const AnalyticsCard = ({ title, subtitle, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-1 backdrop-blur-sm"
      style={{
        background: 'rgba(17, 24, 39, 0.9)',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
