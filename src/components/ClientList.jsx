import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const ClientList = () => {
  // Subscribe to clients state → UI re-renders when clients change
  const clients = useSelector((state) => state.clients.clients);

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3>Clients</h3>
      <div className="list">
        {clients.length === 0 ? (
          <p className="empty-state">No clients yet</p>
        ) : (
          clients.map((client) => (
            <motion.div 
              key={client.id} 
              className="list-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <h4>{client.name}</h4>
                <p className="text-muted">{client.email}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ClientList;
