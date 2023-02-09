import styles from "../../styles/AddProduct.module.scss";
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";

import { useFetchWithoutToken } from "../../utils/services";
import SharedLayout from "../../components/layout/SharedLayout";
import Loading from "../../components/Loading";
import { FormInputs, FormTextArea } from "../../components/Form";
import { nairaSymbol } from "../../utils/functions";

const uploadCarePublicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const AddProduct = () => {
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState([])
  const [formInputs, setFormInputs] = useState({});
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  });
  const token = session?.user?.token;

  const { data } = useFetchWithoutToken(`${BASE_URL_LOCAL}/categories`)

  const handleInputsChange = (e) => {
    setFormInputs(() => ({
      ...formInputs,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let modifiedData = {
      ...formInputs,
      image: images,
      status: !checked ? "out of stock" : "available"
    }

    try {
      const res = await axios.post(
        `${BASE_URL_LOCAL}/products`,
        modifiedData,
        {
          headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
      );

      setFormInputs({})

    } catch (error) {
      console.error("err: ", error);
    }

  }

  const handleCheckbox = () => {
    setChecked(!checked);
  };


  if (status === "authenticated") {
    return (
      <SharedLayout>
        <h1>Add new product</h1>
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
            <label htmlFor="categoryId" className={styles.label}>Category
              <select name="categoryId" onChange={handleInputsChange}>
                <option value="">--Choose an option--</option>
                {
                  data?.categories?.map((category) => {
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
            <input type="submit" className={styles.btn_fill} />
          </div>
        </form>
      </SharedLayout>
    )

  }

  return <Loading />

}


export default AddProduct