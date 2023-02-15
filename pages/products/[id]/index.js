import styles from "../../../styles/Products.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from "../../../components/layout/SharedLayout";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/products/${id}`);

  console.log("id: ", data)

  return (
    <SharedLayout>
      <h1>Single Product</h1>
      <section>
        <div>
          {data && data.product.image.map((img, ind) => (
            <div key={ind}>
              <Image
                loader={myLoader}
                src={img}
                height={100}
                width={100}
                alt={data.product.name}
              />
            </div>
          ))}
        </div>

        <h3>Name: {data.product.name}</h3>
        <p>Category: {data.product.category}</p>
        <p>{data.product.description}</p>
        <p>Price: {data.product.price}</p>
        <p>Quantity: {data.product.quantity}</p>
        <p>Status: {data.product.status}</p>

      </section>
    </SharedLayout>
  )
}

export default Product;