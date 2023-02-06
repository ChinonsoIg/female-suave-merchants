import styles from "./../styles/globals.module.scss";

const Table = ({
  title,
  category,
  products,
  handleSearchSubmit,
  setSearch,
}) => {
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
            {category && <th>Category</th>}
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
          {
            products && products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                {category && <td>{item.category}</td>}
                <td>{item.quatity}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                <td>
                  <span>More...</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;