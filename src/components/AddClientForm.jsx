import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../features/clients/clientSlice';

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
    <div className="card">
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
        <button type="submit" className="btn btn-primary">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddClientForm;
