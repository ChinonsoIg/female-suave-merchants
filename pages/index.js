import styles from "./../styles/Home.module.scss";
import { useState, useEffect } from "react";

import { useFetchWithoutToken, useFetchWithToken } from "../utils/services";
import SharedLayout from "../components/layout/SharedLayout";
import { addComma } from "../utils/functions";
import Pagination from "../components/Pagination";
import { ProductTable } from "../components/Table";
import DataLimiter from "../components/DataLimiter";

const BASE_URL = process.env.NEXT_PUBLIC_API;


export default function Home() {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { 
    data: products, 
    isError, 
    isLoading,
  } = useFetchWithToken(`${BASE_URL}/products/merchant?limit=${limit}`)

  const { data: categories } = useFetchWithoutToken(`${BASE_URL}/categories`);

  const { data: sales } = useFetchWithToken(`${BASE_URL}/orders/merchant`);

  const totalIncome = sales?.orders?.reduce((acc, obj) => {
    return acc + obj?.total;
  }, 0)

  const customerIds = sales?.orders?.map((order) => order.customerId);
  const uniqueCustomers = new Set(customerIds)?.size


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
    if ((currentPage * limit) >= products.totalProducts) {
      return null;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };


  useEffect(() => {
    if(products && products.totalProducts < limit) {
      const value = Number(products?.totalProducts);
      setLimit(value)
    }

    return () => {
      console.log("clean")
    }
  }, [products?.totalProducts])
  

    return (
      <SharedLayout>
        <h1 data-testid="header">Dashboard</h1>
        <section className={styles.figures_grid_container}>
          <div className={styles.figures_grid_child}
            style={{ background: "#03a9f4" }}
          >
            <p className={styles.grid_title}>Sales</p>
            <p className={styles.grid_number}>{sales?.totalOrders ? sales?.totalOrders : 0}</p>
          </div>
          <div className={styles.figures_grid_child}
            style={{ background: "#009900" }}
          >
            <p data-testid="income" className={styles.grid_title}>Income (&#8358;)</p>
            <p className={styles.grid_number}>{totalIncome ? addComma(totalIncome) : 0}</p>
          </div>
          <div className={styles.figures_grid_child}
          style={{ background: "#ac43d6" }}
          >
            <p className={styles.grid_title}>Customers</p>
            <p className={styles.grid_number}>{uniqueCustomers ? uniqueCustomers : 0}</p>
          </div>
          <div className={styles.figures_grid_child}
          style={{ background: "#f68b1e" }}
          >
            <p className={styles.grid_title}>Products</p>
            <p className={styles.grid_number}>{products?.totalProducts ? products?.totalProducts : 0}</p>
          </div>
        </section>

        <section className={styles.data_table}>
          <ProductTable
            title="Recent Products"
            categories={categories?.categories}
            products={products?.products}
            setSearch={setSearch}
            search={search}
            currentPage={currentPage}
            pageSize={limit}
          />

          <div className={styles.data_modifier}>
            <DataLimiter
              limit={limit}
              handleLimit={handleLimit}
              totalProducts={products?.totalProducts}
            />
            <Pagination
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={currentPage}
              limit={limit}
              totalProducts={products?.totalProducts}
            />
          </div>
        </section>

      </SharedLayout>

    );

}


