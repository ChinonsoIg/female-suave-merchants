import styles from "../../../styles/Products.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from "../../../components/layout/SharedLayout";
import { BackButton } from "../../../components/Buttons";
import FormModal from "../../../components/Modal";
import { customToast } from "../../../components/Toasts";
import LoadingSpinner from "../../../components/LoadingSpinner";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const SingleProduct = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { id } = router?.query || {};
  const splitPath = router?.asPath?.split("/");
  const currentPath = splitPath ? splitPath[1] : null

  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isError, isLoading } = useFetchWithToken(`${BASE_URL}/products/merchant/${id}`);

  const handleDelete = (productId) => {
    setIsBtnLoading(true);

    axios.delete(`${BASE_URL}/products/merchant/${productId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        // console.log("res", res);
        let resText = res?.statusText ? res?.statusText : "Product deleted successfully."
        customToast("success", resText, "top-right")
      })
      .catch((error) => {
        // console.log("err: ", error);
        let errTex = error?.response?.data?.message ? error?.response?.data?.message : "An error occured!"
        customToast("error", errTex, "top-center")
      })
      .finally(() => {
        setTimeout(() => {
          setIsBtnLoading(false);
          router.back();
        }, 4800);
      })

  }

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
        <ToastContainer />
        <h1
          className={styles.single_product_title} data-testid="single-product-header"
        >
          Single Product
        </h1>
        {!data && <LoadingSpinner height="15px" width="15px" />}
        {data &&
          <section className={styles.product_details}>
            <div className={styles.image_container}>
              {data.product.image.map((img, ind) => (
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
        }

        {data &&
          <section className={styles.product_actions}>
            <button onClick={() => setOpenModal(true)} className={styles.btn_fill}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(data?.product?._id)}
              className={!isBtnLoading ? styles.btn_danger : styles.btn_danger_loading}
            >
              {!isBtnLoading ? "Delete" : "Deleting..."}
            </button>
          </section>
        }

      </SharedLayout>
    </>
  )

}

export default SingleProduct;