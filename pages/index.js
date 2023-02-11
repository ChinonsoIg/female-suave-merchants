import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";

import { useFetchWithoutToken, useFetchWithToken } from "../utils/services";
import SharedLayout from "../components/layout/SharedLayout";
import { SalesIcon } from "../utils/Icons";
import { printNums } from "../utils/functions";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { TableProduct } from "../components/Table";
import DataLimiter from "../components/DataLimiter";
import AccessDenied from "../components/AccessDenied";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
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
      router.push("/auth/signin")
    },
  });

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/products?search=${search}&limit=${limit}&page=${currentPage}`)

  const { data: category } = useFetchWithoutToken(`${BASE_URL_LOCAL}/categories`)

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
    fetchProducts();
  }

  // console.log("data : ", category)

  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1>Dashboard</h1>
        <section className={styles.figures_grid_container}>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Sales</p>
            <p className={styles.grid_number}>100</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Income</p>
            <p className={styles.grid_number}>100</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Customers</p>
            <p className={styles.grid_number}>100</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Products</p>
            <p className={styles.grid_number}>100</p>
          </div>
        </section>

        <section className={styles.data_table}>
          <TableProduct
            title="All Products"
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


        <button
          onClick={() => signOut()}
        >Sign out</button>
      </SharedLayout>

    );
  }


  return <Loading />



}


