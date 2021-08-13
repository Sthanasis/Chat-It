import Navbar from './Toolbar/NavBar';
import Footer from './Footer';
import { ReactNode } from 'react';
import styles from '../styles/Layout.module.css';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props): JSX.Element => {
  return (
    <div className={styles.Layout}>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
