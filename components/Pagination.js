import React from 'react'
import styles from "../styles/globals.module.scss";

const Pagination = ({
  handlePrevPage,
  handleNextPage,
  currentPage,
  limit,
  totalProducts
}) => {

  if (!totalProducts) {
    return null;
  }

  return (
    <div className={styles.pagination_container}>
      <button
        onClick={handlePrevPage}
        className={`${styles.prev} ${currentPage <= 1 ? styles.disabled : null}`}
      >
        Prev
      </button>
      <p className={styles.pageNumber}>{currentPage}</p>
      <button
        onClick={handleNextPage}
        className={`${styles.next} ${(currentPage * limit) >= totalProducts ? styles.disabled : null}`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;