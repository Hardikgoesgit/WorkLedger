import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../features/projects/projectSlice';
import { motion } from 'framer-motion';

const AddProjectForm = () => {
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  
  // Subscribe to clients from Redux store
  const clients = useSelector((state) => state.clients.clients);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientId && title.trim() && amount) {
      // UI Event → dispatch(action) → reducer updates state
      dispatch(addProject({ clientId, title, amount }));
      setClientId('');
      setTitle('');
      setAmount('');
    }
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>Add New Project</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <motion.button 
          type="submit" 
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Project
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddProjectForm;
