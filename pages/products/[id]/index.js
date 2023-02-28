import styles from "../../../styles/Products.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs"

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from "../../../components/layout/SharedLayout";
import Loading from "../../../components/Loading";
import { BackButton } from "../../../components/Buttons";
import FormModal from "../../../components/Modal";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const BASE_URL = process.env.NEXT_PUBLIC_API;
// const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const SingleProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { id } = router?.query || {};
  const splitPath = router?.asPath?.split("/");
  const currentPath = splitPath ? splitPath[1] : null

  const {
    status,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL}/products/${id}`);

  console.log("data: ", data);


  if (status === "authenticated") {
    return (
      <>
      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productId={data?.product?._id}
        name={data?.product?.name}
        category={data?.product?.category}
        categoryId={data?.product?.categoryId}
        description={data?.product?.description}
        price={data?.product?.price}
        quantity={data?.product?.quantity}
        status={data?.product?.status}
        prevImages={data?.product?.image}
      />
      <SharedLayout>
        <BackButton currentPath={currentPath} />
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
  
        <section className={styles.product_actions}>
          <button onClick={() => setOpenModal(true)} className={styles.btn_fill}>
            Edit
          </button>
          <button onClick={() => handleDelete(data?.product?._id)} className={styles.btn_danger}>Delete</button>
        </section>
  
      </SharedLayout>
      </>
    )
  }


  return <Loading />
  
  
}

export default SingleProduct;