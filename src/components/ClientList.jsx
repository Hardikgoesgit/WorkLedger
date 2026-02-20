import { useSelector } from 'react-redux';

const ClientList = () => {
  // Subscribe to clients state → UI re-renders when clients change
  const clients = useSelector((state) => state.clients.clients);

  return (
    <div className="card">
      <h3>Clients</h3>
      <div className="list">
        {clients.length === 0 ? (
          <p className="empty-state">No clients yet</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="list-item">
              <div>
                <h4>{client.name}</h4>
                <p className="text-muted">{client.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientList;
