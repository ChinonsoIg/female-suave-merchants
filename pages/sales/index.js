import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";

import { useFetchWithoutToken, useFetchWithToken } from "../../utils/services";
import SharedLayout from '../../components/layout/SharedLayout'
import { printNums } from "../../utils/functions";
import { Table } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import Pagination from "../../components/Pagination";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Sales = () => {
  const [limit, setLimit] = useState(3);
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
  
  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/orders?search=${search}&limit=${limit}&page=${currentPage}`)

  // const { data: category } = useFetchWithoutToken(`${BASE_URL_LOCAL}/categories`)

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

  console.log("sales : ", data)
  const headers = [
    // { sn: "S/N" }, 
    { name: "Customer", id: "cusomerId" },
    { name: "Shipping Fee", id: "shippingFee" },
    { name: "Status", id: "status" },
    { name: "Subtotal", id: "subtotal" },
    { name: "Total", id: "total" },
  ];

  return (
    <SharedLayout>
      <h1>Dashboard</h1>

      <section className={styles.data_table}>
          <Table
            title="All Orders"
            headers={headers}
            orders={data?.orders}
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