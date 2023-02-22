import styles from "../../../styles/Sales.module.scss";
import React from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from '../../../components/layout/SharedLayout';
import { BackButton } from "../../../components/Buttons";
import { addComma } from "../../../utils/functions";


const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const SingleSale = () => {
  const router = useRouter();
  const routeId = router.query.id;
  const splitPath = router.asPath.split("/");
  const currentPath = splitPath[1]

  const { data: orders, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/orders/${routeId}`)
  const { data: customers } = useFetchWithToken(`${BASE_URL_LOCAL}/customers`)

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

  const findCustomer = (id) => {
    const found = customers?.customers?.find(element => element._id == id)?.name;
    return found;
  }

console.log("sess: ", session)

  if (status === "authenticated") {

    return (
      <SharedLayout>
        <BackButton currentPath={currentPath} />
        <h1 data-testid="header">Sale Item</h1>
        <section className={styles.sales_heading}>
          <div>
            <p data-testid="customer">Customer:</p>
            <p>{findCustomer(orders?.order?.customerId)}</p>
          </div>
          <div>
            <p data-testid="status">Status:</p>
            <p>{orders?.order?.status}</p>
          </div>
        </section>
        <section>
          <table className={styles.products_container}>
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price (&#8358;)</th>
                <th>Quantity</th>
              </tr>
              {
                orders?.order?.orderItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image 
                        loader={myLoader} 
                        src={item.image} 
                        height={100} 
                        width={100}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{addComma(item.price)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className={styles.table_sub_component}>
            <p>Shipping fee</p>
            <p>&#8358; {addComma(orders?.order?.shippingFee)}</p>
          </div>
          <div className={styles.table_sub_component}>
            <p>Subtotal</p>
            <p>&#8358; {addComma(orders?.order?.subtotal)}</p>
          </div>
          <div className={styles.table_sub_component}>
            <p>Total</p>
            <p>&#8358; {addComma(orders?.order?.total)}</p>
          </div>
        </section>
      </SharedLayout>
    )
  }

}


export default SingleSale