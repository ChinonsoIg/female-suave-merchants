import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// import { SalesIcon } from "../utils/Icons";
import AccessDenied from "../components/AccessDenied";
import SharedLayout from "../components/layout/SharedLayout";
import { SalesIcon } from "../utils/Icons";
import { printNums } from "../utils/functions";


const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const [data, setData] = useState({});
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();
  // const router = useRouter();

  const allNums = printNums();

  const handleLimit = (event) => {
    const value = Number(event.target.value);
    setLimit(value);
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${BASE_URL_LOCAL}/products?limit=${limit}&page=${page}&search=${search}`, {
          headers: {
            "Authorization": `Bearer ${session?.user?.token}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

      if (res.status !== 200) {
        console.error("An error occured: ", res.statusText);
        // setIsError(true);
        // setErrorMessage(res.statusText);
        // setIsLoading(false);
        return;
      }

      const data = await res.json();
      // console.log("Data: ", data);
      setData(data);
      // setIsLoading(false);
      // setIsError(false);

    } catch (error) {
      console.error("err: ", error);
      // setIsError(true);
      // setErrorMessage("Check your network and try again");
      // setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers()
  }, [limit, session])

  // console.log(" lim: ", limit);
  // console.log(" data: ", data)


  if (session) {
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
                value={data?.perPageCount} 
                onChange={handleLimit}
              >
                {allNums.map((num, ind) => 
                  <option key={ind}>{num}</option>
                )}
              </select> out of {data?.totalCount}
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

  console.log("acces decnied", session)
  return <AccessDenied />

}



// export async function getServerSideProps(context) {
//   const { req } = context;
//   const session = await getSession({ req });

//   const res = await fetch(`${BASE_URL_LOCAL}/products`, {
//     headers: {
//       "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWUxNzVmNWIzZmVjMWEyNWRiMDI4ZmYiLCJmaXJzdE5hbWUiOiJKYW5lIiwibGFzdE5hbWUiOiJEb2UiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjc1MTYyMTM4LCJleHAiOjE2NzUyNDg1Mzh9.Fw6Pv6vwDJBjueDWX3fIBXi21ysgboJp7wTjDxzYRK4`,
//     },
//     reponsType: "json",
//   })
//   const data = await res.json();
//   console.log("res: ", data)

//   return {
//     props: { data },
//   };
// }