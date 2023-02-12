import styles from "../../styles/Sales.module.scss";
import React from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useFetchWithoutToken, useFetchWithToken } from "../../../utils/services";
import SharedLayout from '../../../components/layout/SharedLayout';
import { BackButton } from "../../../components/Buttons";


const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Sale = () => {
  const router = useRouter();
  const routeId = router.query.id;
  const splitPath = router.asPath.split("/");
  const currentPath = splitPath[1]

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/orders/${routeId}`)

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


  if (status === "authenticated") {

    return (
      <SharedLayout>
        <BackButton currentPath={currentPath} />
        <h1>Sale Item</h1>
        <section className={styles.sales_heading}>
          <div>
            <p>Customer:</p>
            <p>{data?.order?.customerId}</p>
          </div>
          <div>
            <p>Status:</p>
            <p>{data?.order?.status}</p>
          </div>
        </section>
        <section>
          <table className={styles.products_container}>
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {
                data?.order?.orderItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image 
                        loader={myLoader} 
                        src={item.image} 
                        height={100} 
                        width={100}
                        alt="product "
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className={styles.table_sub_component}>
            <p>Shipping fee</p>
            <p>{data?.order?.shippingFee}</p>
          </div>
          <div className={styles.table_sub_component}>
            <p>Subtotal</p>
            <p>{data?.order?.subtotal}</p>
          </div>
          <div className={styles.table_sub_component}>
            <p>Total</p>
            <p>{data?.order?.total}</p>
          </div>
        </section>
      </SharedLayout>
    )
  }

}


export default Sale