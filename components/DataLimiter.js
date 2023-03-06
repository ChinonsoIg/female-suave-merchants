import styles from "../styles/globals.module.scss";
import React from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { printNums } from "../utils/functions";

const DataLimiter = ({
  limit,
  handleLimit,
  totalProducts,
}) => {

  let allNums = printNums(totalProducts);

  if (!totalProducts) {
    return null;
  }
  
  return (
    <p className={styles.items_per_page}>Showing
      <select
        className={styles.num_value}
        value={limit}
        onChange={handleLimit}
      >
        {allNums.map((num, ind) =>
          <option key={ind}>{num}</option>
        )}
      </select> out of {totalProducts}
      <MdOutlineKeyboardArrowDown
        size={20}
        color="#213F7D"
        className={styles.items_per_page_icon}
      />
    </p>
  )
}

export default DataLimiter;