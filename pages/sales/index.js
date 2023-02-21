import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";

import { useFetchWithoutToken, useFetchWithToken } from "../../utils/services";
import SharedLayout from '../../components/layout/SharedLayout'
import { printNums } from "../../utils/functions";
import { SalesTable } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Sales = () => {
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const {
    status,
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  });

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/orders?search=${search}&limit=${limit}&page=${currentPage}`);
  const { data: customers } = useFetchWithToken(`${BASE_URL_LOCAL}/customers`);


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
    if ((currentPage * limit) >= data.orders) {
      return null;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  }

  const headers = [
    // { sn: "S/N" }, 
    { name: "Customer", id: "cusomerId" },
    { name: "Status", id: "status" },
    { name: "Shipping Fee (₦)", id: "shippingFee" },
    { name: "Subtotal (₦)", id: "subtotal" },
    { name: "Total (₦)", id: "total" },
  ];


  // console.log("lim : ", limit)



  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1 data-testid="header">Sales</h1>

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
              allNums={allNums}
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

  return <Loading />


}

export default Sales