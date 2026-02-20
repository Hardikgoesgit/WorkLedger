import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import ProjectList from './components/ProjectList';
import AddClientForm from './components/AddClientForm';
import AddProjectForm from './components/AddProjectForm';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
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
