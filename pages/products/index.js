import styles from "../../styles/Products.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { useFetchWithToken } from "../../utils/services";
import Pagination from "../../components/Pagination";
import { ProductTable } from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";
import SharedLayout from "../../components/layout/SharedLayout";
import { printNums } from "../../utils/functions";
import Loading from "../../components/Loading";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const Products = () => {
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

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL}/products/merchant?search=${search}&limit=${limit}&page=${currentPage}`);

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


  // console.log("session: ", session)
  // console.log("data: ", data)


  if (status === "authenticated") {
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

  return <Loading />


}

export default Products