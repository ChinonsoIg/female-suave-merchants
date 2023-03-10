import styles from "./../styles/globals.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { addComma } from "../utils/functions";
import LoadingSpinner from "./LoadingSpinner";

const ProductTable = ({
  title,
  categories,
  products,
  handleSearchSubmit,
  setSearch,
  currentPage,
  pageSize,
  isSearch,
  linkToMore
}) => {
  const router = useRouter();

  const findCategory = (id) => {
    const found = categories?.find(element => element._id == id)?.categoryName;
    return found;
  }


  return (
    <div>
      <h2 className={styles.table_data_title}>{title}</h2>
      <table className={styles.products_container}>
        <tbody>
          {isSearch && (
            <tr>
              <td colSpan={7}>
                <form onSubmit={handleSearchSubmit}>
                  <input type="search" onChange={(e) => setSearch(e.target.value)} />
                </form>
              </td>
            </tr>
          )}
          <tr>
            <th>S/N</th>
            <th>Name</th>
            {categories && <th>Category</th>}
            <th>Quantity</th>
            <th>Price (&#8358;)</th>
            <th>Status</th>
            {linkToMore && <th>More</th>}
          </tr>
          {!products && 
            <tr>
              <td colSpan={6} style={{textAlign: "center"}}>
                <LoadingSpinner
                  height="10px"
                  width="10px"
                />
              </td>
            </tr>
          }
          {products?.length === 0 &&  
            <tr>
              <td colSpan={6} style={{textAlign: "center"}}>No data</td>
            </tr>
          }
          {
            products && products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{item.name}</td>
                {categories && <td>{findCategory(item.categoryId)}</td>}
                <td>{item.quantity}</td>
                <td>{addComma(item.price)}</td>
                <td>{item.status}</td>
                {
                  linkToMore && (
                    <td>
                      <Link href={`${router.pathname}/${item._id}`} className={styles.link_to_more}>More...</Link>
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


const SalesTable = ({
  title,
  headers,
  orders,
  customers,
  handleSearchSubmit,
  setSearch,
  currentPage,
  pageSize
}) => {
  const router = useRouter();

  const findCustomer = (id) => {
    const found = customers?.find(element => element._id == id)?.name;
    return found;
  }



  return (
    <div className={styles.products_wrapper}>
      <h2 className={styles.table_data_title}>{title}</h2>
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
                <th key={ind}>{header.name}</th>
              ))
            }
          </tr>
          {!orders && 
            <tr>
              <td colSpan={6} style={{textAlign: "center"}}>
                <LoadingSpinner
                  height="10px"
                  width="10px"
                />
              </td>
            </tr>
          }
          {orders?.length === 0 && 
            <tr>
              <td colSpan={6} style={{textAlign: "center"}}>No data available</td>
            </tr>
          }
          {
            orders && orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{findCustomer(item.customerId)}</td>
                <td>{item.status}</td>
                <td>{addComma(item.shippingFee)}</td>
                <td>{addComma(item.subtotal)}</td>
                <td>{addComma(item.total)}</td>
                <td>
                  <Link href={`${router.pathname}/${item._id}`}>More...</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}



export { ProductTable, SalesTable };