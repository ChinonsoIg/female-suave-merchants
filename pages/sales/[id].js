import styles from "../../styles/globals.module.scss";
import React from 'react'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { useFetchWithoutToken, useFetchWithToken } from "../../utils/services";
import SharedLayout from '../../components/layout/SharedLayout';

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Sale = () => {
  const router = useRouter();
  const routeId = router.query.id;

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

  console.log("Pat: ", data)



  if (status === "authenticated") {

    return (
      <SharedLayout>
        <h1>Sale Item</h1>
        <section>
          <div>
            <p>Customer</p>
            <p>{data?.order?.customerId}</p>
          </div>
          <div>
            <p>Status</p>
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
                    <td>{item.image}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div>
            <p>Shipping fee</p>
            <p>{data?.order?.shippingFee}</p>
          </div>
          <div>
            <p>Subtotal</p>
            <p>{data?.order?.subtotal}</p>
          </div>
          <div>
            <p>Total</p>
            <p>{data?.order?.total}</p>
          </div>
        </section>
      </SharedLayout>
    )
  }


}

export default Sale