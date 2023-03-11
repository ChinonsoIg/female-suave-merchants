import styles from "../styles/globals.module.scss";
import React from "react";
import { Raleway } from "@next/font/google"

const raleway = Raleway({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

const Loading = () => {
  return (
    <div className={raleway.className} style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <h3>Loading...</h3>
    </div>
  )
}


const LoadingSpinner = () => {

  return (
    <div className={styles.loading_parent}>
    <div className={styles.loader}></div>
    </div>
  )
}

export { Loading, LoadingSpinner };