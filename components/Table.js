import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./../styles/globals.module.scss";

const TableProduct = ({
  title,
  category,
  products,
  handleSearchSubmit,
  setSearch,
  currentPage,
  pageSize
}) => {
  const router = useRouter();
  console.log("s: ", router)

  const findCategory = (id) => {
    const found = category?.find(element => element._id == id)?.categoryName;
    return found;
  }


  return (
    <div>
      <h2>{title}</h2>
      <table className={styles.products_container}>
        <tbody>
          <tr>
            <td colSpan={7}>
              <form onSubmit={handleSearchSubmit}>
                <input type="search" onChange={(e) => setSearch(e.target.value)} />
              </form>
            </td>
          </tr>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            {/* {
              router.pathname === "/" ? null :
                <td>Tag</td>
            } */}
          </tr>
          {
            products && products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{item.name}</td>
                <td>{findCategory(item.categoryId)}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                {/* {
                  router.pathname === "/" ? null :
                    <td>
                      <span><Link href={`${router.pathname}/${item._id}`}>More...</Link> </span>
                    </td>
                } */}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}


const Table = ({
  title,
  headers,
  orders,
  handleSearchSubmit,
  setSearch,
  currentPage,
  pageSize
}) => {
  const router = useRouter();
  console.log("cas: ", orders)

  const findCategory = (id) => {
    const found = category?.find(element => element._id == id)?.categoryName;
    return found;
  }


  return (
    <div>
      <h2>{title}</h2>
      <table className={styles.products_container}>
        <tbody>
          <tr>
            <td colSpan={7}>
              <form onSubmit={handleSearchSubmit}>
                <input type="search" onChange={(e) => setSearch(e.target.value)} />
              </form>
            </td>
          </tr>
          <tr>
          <th>S/N</th>
            {
              headers.map((header, ind) => (
                <>
                
                <th key={ind}>{header.name}</th>
                </>
              ))
            }
          </tr>
          {
            orders && orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{item.customerId}</td>
                <td>{item.shippingFee}</td>
                <td>{item.status}</td>
                <td>{item.subtotal}</td>
                <td>{item.total}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}



export { TableProduct, Table };