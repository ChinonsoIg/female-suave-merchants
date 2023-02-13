import styles from "../../styles/AddProduct.module.scss";
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { customToast } from "../../components/Toasts";
import { useFetchWithoutToken, postWithToken } from "../../utils/services";
import SharedLayout from "../../components/layout/SharedLayout";
import Loading from "../../components/Loading";
import { FormInputs, FormTextArea } from "../../components/Form";

const uploadCarePublicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const AddProduct = () => {
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState([])
  const [formInputs, setFormInputs] = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  });
  const token = session?.user?.token;

  const { data: categories } = useFetchWithoutToken(`${BASE_URL_LOCAL}/categories`);

  const handleInputsChange = (e) => {
    setFormInputs(() => ({
      ...formInputs,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true);

    let modifiedData = {
      ...formInputs,
      image: images,
      status: !checked ? "out of stock" : "available"
    }

    axios.post(`${BASE_URL_LOCAL}/products`, modifiedData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log("res", res);
        let resText = res?.statusText ? res?.statusText : "Product created."
        customToast("success", resText, "top-right")
      })
      .catch((error) => {
        console.log("err: ", error);
        let errTex = error?.response?.data?.message ? error?.response?.data?.message : "An error occured!"
        customToast("error", errTex, "top-center")
      })
      .finally(() => {
        setTimeout(() => {
          setIsBtnLoading(false)
        }, 4800);
      })

  }

  
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1>Add new product</h1>
        <ToastContainer />

        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.name_category_box}>
            <FormInputs
              htmlFor="name"
              title="Name"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputsChange}
            />
            <label htmlFor="categoryId" className={styles.label}>
              Category
              <select name="categoryId" onChange={handleInputsChange}>
                <option value="">--Choose an option--</option>
                {
                  categories?.categories?.map((category) => {
                    const { _id, categoryName } = category;
                    return (
                      <option key={_id} value={_id}>{categoryName}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          <div className={styles.price_quantity_box}>
            <FormInputs
              htmlFor="price"
              title="Price"
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleInputsChange}
            />
            <FormInputs
              htmlFor="quantity"
              title="Quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={handleInputsChange}
            />
          </div>
          <div className={styles.textarea}>
            <FormTextArea
              htmlFor="description"
              title="Description"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleInputsChange}
            />
          </div>
          <div className={styles.last_box}>
            <label htmlFor="status">
              Status
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckbox}
                className={styles.switch}
              />
            </label>
          </div>

          <div className={styles.images_upload_box}>
            <label htmlFor="images">Add images</label>{" "}
            <Widget
              publicKey={uploadCarePublicKey}
              id="images"
              multiple
              onFileSelect={async (group) => {
                const files = await Promise.all(group.files());
                const urls = files.map((file) => file.cdnUrl);
                console.log("urls: ", urls);
                setImages([...urls]);
              }}
              previewStep="true"
              dataImageShrink="680x680"
              onChange={info => console.log("Upload completed:", info)}
            />
          </div>
          <div>
            <input type="submit" value={!isBtnLoading ? "Submit" : "Submitting"} className={!isBtnLoading ? styles.btn_fill : styles.btn_loading} />
          </div>
        </form>
      </SharedLayout>
    )

  }

  return <Loading />

}


export default AddProduct