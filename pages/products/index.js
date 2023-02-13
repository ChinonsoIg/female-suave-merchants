import styles from "../../styles/Products.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

import { useFetchWithToken } from "../../utils/services";
import Pagination from "../../components/Pagination";
import { ProductTable } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import SharedLayout from "../../components/layout/SharedLayout";
import { printNums } from "../../utils/functions";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/products?search=${search}&limit=${limit}&page=${currentPage}`);
  // const { data: customers } = useFetchWithToken(`${BASE_URL_LOCAL}/customers`);

  const allNums = printNums();

  const handleLimit = (event) => {
    const value = Number(event.target.value);
    setLimit(value);
  }

  const handlePrevPage = () => {
    if (currentPage <= 1) {
      return null;
    }
    return setCurrentPage((prevPage) => prevPage - 1)
  };

  const handleNextPage = () => {
    if ((currentPage * limit) >= data.totalProducts) {
      return null;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // fetchData();
  }

  return (
    <SharedLayout>
      <h1>All Products</h1>
      <section className={styles.data_table}>
          <ProductTable
            title="Product Table"
            products={data?.products}
            search={search}
            setSearch={setSearch}
            handleSearchSubmit={handleSearchSubmit}
            currentPage={currentPage}
            pageSize={limit}
            isSearch={true}
            linkToMore={true}
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