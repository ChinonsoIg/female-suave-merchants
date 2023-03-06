import styles from "../../styles/Home.module.scss";
import { useState, useEffect } from "react";

import { useFetchWithToken } from "../../utils/services";
import SharedLayout from "../../components/layout/SharedLayout";
import { SalesTable } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import Pagination from "../../components/Pagination";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const Sales = () => {
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL}/orders/merchant?search=${search}&limit=${limit}&page=${currentPage}`);
  const { data: customers } = useFetchWithToken(`${BASE_URL}/customers/merchant`);

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
    if ((currentPage * limit) >= data.orders) {
      return null;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // fetchProducts();
  }

  const headers = [
    // { sn: "S/N" }, 
    { name: "Customer", id: "cusomerId" },
    { name: "Status", id: "status" },
    { name: "Shipping Fee (₦)", id: "shippingFee" },
    { name: "Subtotal (₦)", id: "subtotal" },
    { name: "Total (₦)", id: "total" },
  ];

  useEffect(() => {
    if(data && data.totalProducts < limit) {
      const value = Number(data?.totalProducts);
      setLimit(value)
    }

    return () => {
      console.log("clean")
    }
  }, [data?.totalProducts])


  // console.log("lim : ", limit)
    return (
      <SharedLayout>
        <h1 className={styles.sales_title} data-testid="header">Sales</h1>

        <section className={styles.data_table}>
          <SalesTable
            title="All Sales"
            headers={headers}
            orders={data?.orders}
            handleSearchSubmit={handleSearchSubmit}
            setSearch={setSearch}
            currentPage={currentPage}
            pageSize={limit}
            customers={customers?.customers}
          />

          <div className={styles.data_modifier}>
            <DataLimiter
              limit={limit}
              handleLimit={handleLimit}
              totalProducts={data?.totalOrders}
            />
            <Pagination
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={currentPage}
              limit={limit}
              totalProducts={data?.totalOrders}
            />
          </div>
        </section>
      </SharedLayout>
    )

}

export default Sales