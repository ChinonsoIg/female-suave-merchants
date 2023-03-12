import styles from "../../styles/Products.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useFetchWithToken } from "../../utils/services";
import Pagination from "../../components/Pagination";
import { ProductTable } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import SharedLayout from "../../components/layout/SharedLayout";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();


  const {
    data,
    isError,
    isLoading
  } = useFetchWithToken(`${BASE_URL}/products/merchant?search=${search}&limit=${limit}&page=${currentPage}`);

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

  useEffect(() => {
    if(data && data.totalProducts < limit) {
      const value = Number(data?.totalProducts);
      setLimit(value)
    }

    return () => {
      console.log("clean")
    }
  }, [data?.totalProducts])

    return (
      <SharedLayout>
        <h1 className={styles.products_title} data-testid="header">All Products</h1>
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
    );

}

export default Products