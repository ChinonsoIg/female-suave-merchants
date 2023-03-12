import styles from "../styles/globals.module.scss";


const LoadingSpinner = ({ height, width }) => {

  return (
    <div className={styles.loading_parent}>
      <div
        className={styles.loader}
        style={{
          height,
          width
        }}
      >
      </div>
    </div>
  )
}

export default LoadingSpinner;