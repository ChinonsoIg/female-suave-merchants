import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import AccessDenied from "../components/AccessDenied";
import SharedLayout from "../components/layout/SharedLayout";
import { SalesIcon } from "../utils/Icons";
import { printNums } from "../utils/functions";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    const URL = `${BASE_URL_LOCAL}/products?search=${search}&limit=${limit}&page=${currentPage}`;
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

  useEffect(() => {
    if (token) {
      console.log("token: ", token)
      fetchProducts();
    } else {
      console.log("not token : ")
    }

  }, [token, currentPage, limit])


  if (!status || status === "loading") {
    return <Loading />
  }

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

      {/* TODO:  Bar/Pie chart */}
      {/* <section>
          <h2>Bar/Pie chart</h2>
        </section> */}

      <section className={styles.data_table}>
        
        <Table
          title="All Products"
          category={true}
          products={products}
          handleSearchSubmit={handleSearchSubmit}
          setSearch={setSearch}
        />

        <div className={styles.data_modifier}>
          <p className={styles.items_per_page}>Showing
            <select
              className={styles.num_value}
              defaultValue={limit}
              onChange={handleLimit}
            >
              {allNums.map((num, ind) =>
                <option key={ind}>{num}</option>
              )}
            </select> out of {totalProducts}
            <MdOutlineKeyboardArrowDown onClick={handleLimit} size={20} color="#213F7D" className={styles.items_per_page_icon} />
          </p>
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


