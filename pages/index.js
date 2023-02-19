import styles from "./../styles/Home.module.scss";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { useFetchWithoutToken, useFetchWithToken } from "../utils/services";
import SharedLayout from "../components/layout/SharedLayout";
import { addComma, printNums } from "../utils/functions";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { ProductTable } from "../components/Table";
import DataLimiter from "../components/DataLimiter";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;


export default function Component() {
  const [limit, setLimit] = useState(10);
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

  const allNums = printNums();

  const { data: products, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/products?limit=${limit}`)

  const { data: categories } = useFetchWithoutToken(`${BASE_URL_LOCAL}/categories`);

  const { data: sales } = useFetchWithToken(`${BASE_URL_LOCAL}/orders`);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  }

  // console.log("session: ", products);

  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1>Dashboard</h1>
        <section className={styles.figures_grid_container}>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Sales</p>
            <p className={styles.grid_number}>{sales?.totalOrders}</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Income (&#8358;)</p>
            <p className={styles.grid_number}>{addComma(totalIncome)}</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Customers</p>
            <p className={styles.grid_number}>{uniqueCustomers}</p>
          </div>
          <div className={styles.figures_grid_child}>
            <p className={styles.grid_title}>Products</p>
            <p className={styles.grid_number}>{products?.totalProducts}</p>
          </div>
        </section>

        <section className={styles.data_table}>
          <ProductTable
            title="Recent Products"
            categories={categories?.categories}
            products={products?.products}
            handleSearchSubmit={handleSearchSubmit}
            setSearch={setSearch}
            search={search}
            currentPage={currentPage}
            pageSize={limit}
          />

          <div className={styles.data_modifier}>
            <DataLimiter
            limit={limit}
            handleLimit={handleLimit}
            allNums={allNums}
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


        <button
          onClick={() => signOut()}
        >Sign out</button>
      </SharedLayout>

    );
  }

  return <Loading />

}


