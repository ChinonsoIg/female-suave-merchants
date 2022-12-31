import React from 'react'
import Navbar from './nav';
import styles from "../../styles/Layout.module.scss";
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.mainBox}>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Layout;