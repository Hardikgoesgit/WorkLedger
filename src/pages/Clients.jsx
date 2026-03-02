import React from 'react';
import AddClientForm from '../components/AddClientForm';
import ClientList from '../components/ClientList';

const Clients = () => {
  return (
    <div className="page-container">
      <div className="grid">
        <div className="column">
          <AddClientForm />
        </div>
        <div className="column">
          <ClientList />
        </div>
      </div>
    </div>
  );
};

export default Clients;
