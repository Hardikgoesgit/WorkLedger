import { useSelector } from 'react-redux';
import { selectTotalProjects } from '../features/projects/projectSelectors';

const Header = () => {
  // Selector recomputes when state changes → UI re-renders
  const totalProjects = useSelector(selectTotalProjects);

  return (
    <header className="header">
      <h1>Freelancer CRM Dashboard</h1>
      <p className="subtitle">Managing {totalProjects} projects</p>
    </header>
  );
};

export default Header;
