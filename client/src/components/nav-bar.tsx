import { Link } from 'react-router-dom';

import styles from '~/styles/components/nav-bar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.brand}>
        Press Gang
      </Link>
      <Link to="/job-applications/new" className="btn btn-primary">
        New Application
      </Link>
    </nav>
  );
};

export default NavBar;
