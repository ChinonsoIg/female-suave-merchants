import styles from "./../styles/Products.module.scss";


import Pagination from "../components/Pagination";
import { ProductTable } from "../components/Table";
import DataLimiter from "../components/DataLimiter";
import SharedLayout from '../../components/layout/SharedLayout'

const Products = () => {
  return (
    <SharedLayout>
      <h1>All Products</h1>
      <section className={styles.data_table}>
          <ProductTable
            title="Products"
            category={category?.categories}
            products={data?.products}
            handleSearchSubmit={handleSearchSubmit}
            setSearch={setSearch}
            currentPage={currentPage}
            pageSize={limit}
          />

          <div className={styles.data_modifier}>
            <DataLimiter
            limit={limit}
            handleLimit={handleLimit}
            allNums={allNums}
            totalProducts={data?.totalProducts}
          />
          <Pagination
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            limit={limit}
            totalProducts={data?.totalProducts}
          />
          </div>
        </section>
    </SharedLayout>
  )
}

export default Products