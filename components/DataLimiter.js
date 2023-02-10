import styles from "../styles/globals.module.scss";
import React from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DataLimiter = ({
  limit,
  handleLimit,
  allNums,
  totalProducts,
}) => {

  if (!totalProducts) {
    return null;
  }
  
  return (
    <p className={styles.items_per_page}>Showing
      <select
        className={styles.num_value}
        defaultValue={limit}
        onChange={handleLimit}
      >
        {allNums.map((num, ind) =>
          <option key={ind}>{num}</option>
        )}
      </select> out of {totalProducts}
      <MdOutlineKeyboardArrowDown
        onClick={handleLimit}
        size={20}
        color="#213F7D"
        className={styles.items_per_page_icon}
      />
    </p>
  )
}

export default DataLimiter;