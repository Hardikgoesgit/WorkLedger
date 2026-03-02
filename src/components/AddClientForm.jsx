import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../redux/slices/clientSlice';
import { motion } from 'framer-motion';

const AddClientForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      // UI Event → dispatch(action)
      dispatch(addClient({ name, email }));
      setName('');
      setEmail('');
    }
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>Add New Client</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <motion.button 
          type="submit" 
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Client
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddClientForm;