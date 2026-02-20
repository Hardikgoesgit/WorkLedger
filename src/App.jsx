import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import ProjectList from './components/ProjectList';
import AddClientForm from './components/AddClientForm';
import AddProjectForm from './components/AddProjectForm';

function App() {
  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <Dashboard />
        
        <div className="grid">
          <div className="column">
            <AddClientForm />
            <ClientList />
          </div>
          
          <div className="column">
            <AddProjectForm />
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
