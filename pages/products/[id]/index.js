import styles from "../../../styles/Products.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useState } from "react";
import Image from "next/image";

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from "../../../components/layout/SharedLayout";
// import { ButtonPrimary } from "../../../components/Buttons";
// import Link from "next/link";
import Loading from "../../../components/Loading";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router?.query || {};

  const {
    status,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL_LOCAL}/products/${id}`);

  // console.log("id: ", data);


  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1 data-testid="single-product-header">Single Product</h1>
        <section className={styles.product_details}>
          <div className={styles.image_container}>
            {data && data.product.image.map((img, ind) => (
              <div key={ind}>
                <Image
                  loader={myLoader}
                  src={img}
                  height={200}
                  width={200}
                  alt={data.product.name}
                />
              </div>
            ))}
          </div>
  
          <h3>Name: {data?.product?.name}</h3>
          <p>Category: {data?.product?.category}</p>
          <p>Description: {data?.product?.description}</p>
          <p>Price: {data?.product?.price}</p>
          <p>Quantity: {data?.product?.quantity}</p>
          <p>Status: {data?.product?.status}</p>
  
        </section>
  
        {/* <section className={styles.product_actions}>
          <button onClick={() => console.log("click")} className={styles.btn_fill}>
            <Link href={`${router.pathname}/${data?.product?._id}`}>Edit</Link>
          </button>
          <button onClick={() => handleDelete(data?.product?._id)} className={styles.btn_danger}>Delete</button>
        </section> */}
  
      </SharedLayout>
    )
  }


  return <Loading />
  
  
}

export default SingleProduct;