import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";


import SharedLayout from "../../components/layout/SharedLayout";
import { printNums } from "../../utils/functions";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import DataLimiter from "../../components/DataLimiter";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const inter = Inter({ subsets: ["latin"] });

const Ornaments = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  let pathName = router.pathname.slice(1);

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
  const token = session?.user?.token;


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
    if ((currentPage * limit) >= totalProducts) {
      return null;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  }

  const fetchProducts = async () => {
    const URL = `${BASE_URL_LOCAL}/products/byCategory/63c6a114143d9ca883038193?search=${search}&limit=${limit}&page=${currentPage}`;
    // x-www-form-urlencoded
    
    try {
      const res = await axios.get(URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      });

      const { data } = res;
      setProducts(data.products);
      setTotalProducts(data.totalProducts);

      setIsLoading(false);
      setIsError(false);

    } catch (error) {
      console.error("err: ", error);
      setIsError(true);
      setIsLoading(false);
    }

  };

  const fetchCategories = async () => {
    const URL = `${BASE_URL_LOCAL}/categories`;
    
    try {
      const res = await axios.get(URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      });

      const { data } = res;
      let found = data?.categories.found(element => element.categoryName === pathName);
      console.log("found: ", found._id)
      setCategories(data);
      // setIsLoading(false);
      // setIsError(false);

    } catch (error) {
      console.error("err: ", error);
      // setIsError(true);
      // setIsLoading(false);
    }

  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }

  }, [pathName])

  useEffect(() => {
    if (token) {
      fetchProducts();
    }

  }, [token, currentPage, limit])

  console.log("rout: ", router)


  if (!status || status === "loading") {
    return <Loading />
  }

  return (
    <SharedLayout>
      <h1>Ornaments</h1>
      <section className={styles.data_table}>
        
        <Table
          title="All Products in this category"
          category={true}
          products={products}
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
            totalProducts={totalProducts}
          />
          <Pagination
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            limit={limit}
            totalProducts={totalProducts}
          />
        </div>
      </section>


      <button
        onClick={() => signOut()}
      >Sign out</button>
    </SharedLayout>
  );




}


export default Ornaments