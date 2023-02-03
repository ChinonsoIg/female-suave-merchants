import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// import { SalesIcon } from "../utils/Icons";
// import { authOptions } from "../pages/api/auth/[...nextauth]";
import AccessDenied from "../components/AccessDenied";
import SharedLayout from "../components/layout/SharedLayout";
import { SalesIcon } from "../utils/Icons";
import { printNums } from "../utils/functions";
import Loading from "../components/Loading";

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const [data, setData] = useState({});
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  })

  const allNums = printNums();
  const handleLimit = (event) => {
    const value = Number(event.target.value);
    setLimit(value);
  }

  const fetchUsers = async () => {
    // ?limit=${limit}&page=${page}&search=${search}
    try {
      const res = await fetch(
        `${BASE_URL}/products`, {
          method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.user?.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        }
      });

      if (res.status !== 200) {
        console.error("An error occured: ", res);
        setIsError(true);
        return;
      }

      const data = await res.json();
      setData(data);
      setIsLoading(false);
      setIsError(false);

    } catch (error) {
      console.error("err: ", error);
      setIsError(true);
      setIsLoading(false);
    }

  };


  useEffect(() => {
    fetchUsers()
  }, [limit, page, search])

  console.log("data : ", data)


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
        <div>
          <h2>Table</h2>
          <table className={styles.products_container}>
            <tbody>
              <tr>
                <td colSpan={7}>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
              {
                data.products && data.products.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quatity}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      {/* <span><BsThreeDotsVertical /></span> */}
                      <span>More...</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className={styles.data_modifier}>
          <p className={styles.items_per_page}>Showing
            <select
              className={styles.num_value}
              value={data.productsPerPage}
              onChange={handleLimit}
            >
              {allNums.map((num, ind) =>
                <option key={ind}>{num}</option>
              )}
            </select> out of {data.totalProducts}
            <MdOutlineKeyboardArrowDown onClick={handleLimit} size={20} color="#213F7D" className={styles.items_per_page_icon} />
          </p>
          <p>
            Paginate
            {/* <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> */}
          </p>
        </div>
      </section>



      <button
        onClick={() => signOut()}
      >Sign out</button>
    </SharedLayout>
  );




}


