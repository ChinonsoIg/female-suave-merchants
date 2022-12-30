import React from 'react'
import Navbar from './nav';
import styles from "../../styles/Layout.module.scss";
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>Layout</main>
      <Footer />
    </>
  )
}

export default Layout;