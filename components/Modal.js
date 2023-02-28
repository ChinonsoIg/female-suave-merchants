// import styles from "../styles/globals.module.scss"
import styles from "../styles/AddProduct.module.scss"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormInputs, FormTextArea } from "./Form";
import { customToast } from "./Toasts";
import { useFetchWithoutToken } from "../utils/services";

const uploadCarePublicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API;
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const FormModal = ({ open, onClose, productId, name, categoryId, description, price, quantity, status, prevImages }) => {
  const [formInputs, setFormInputs] = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });
  const token = session?.user?.token;

  const { data: categories } = useFetchWithoutToken(`${BASE_URL}/categories`);

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
      name: formInputs.name ? formInputs.name : name,
      // category: formInputs.category ? formInputs.category : category,
      categoryId: formInputs.categoryId ? formInputs.categoryId : categoryId,
      description: formInputs.description ? formInputs.description : description,
      price: formInputs.price ? formInputs.price : price,
      quantity: formInputs.quantity ? formInputs.quantity : quantity,
      // status: formInputs.status ? formInputs.status : status,
      image: [...prevImages, ...images],
      status: !checked ? "out of stock" : "available"
    };

    console.log("jg: ", modifiedData)
    // onClose();

    axios.patch(`${BASE_URL_LOCAL}/products/${productId}`, modifiedData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log("res", res);
        let resText = res?.statusText ? res?.statusText : "Product updated successfully."
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
          onClose();
        }, 4800);
      })


  }

  const handleCheckbox = () => {
    setChecked(!checked);
  };


  if (!open) return null;

  return (
    <div className={styles.modal_wrapper}>
      <section className={styles.modal_container}>
        <div className={styles.modal_header_section}>
          <h4 className={styles.modal_header_title}>Edit Product</h4>
          <button onClick={onClose} className={styles.modal_close_btn}>x</button>
        </div>
        <form className={styles.form_container}
          onSubmit={handleSubmit}
        >
          <div className={styles.name_category_box}>
            <FormInputs
              htmlFor="name"
              title="Name"
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={name}
              onChange={handleInputsChange}
              data_testid="name"
            />
            <label htmlFor="categoryId" className={styles.label}>
              Category
              <select
                name="categoryId"
                // defaultValue={category}
                onChange={handleInputsChange}
                data-testid="categoryId"
              >
                <option value="">--Choose an option--</option>
                {
                  categories?.categories?.map((category) => {
                    const { _id, categoryName } = category;
                    return (
                      <option
                        key={_id}
                        value={_id}
                        selected={_id == categoryId}
                      >
                        {categoryName}
                      </option>
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
              defaultValue={price}
              onChange={handleInputsChange}
              data_testid="price"
            />
            <FormInputs
              htmlFor="quantity"
              title="Quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              defaultValue={quantity}
              onChange={handleInputsChange}
              data_testid="quantity"
            />
          </div>
          <div className={styles.textarea}>
            <FormTextArea
              htmlFor="description"
              title="Description"
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={description}
              onChange={handleInputsChange}
              data_testid="description"
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
                data-testid="status"
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
                // console.log("urls: ", urls);
                setImages([...urls]);
              }}
              previewStep="true"
              dataImageShrink="680x680"
              onChange={info => console.log("Upload completed:", info)}
            />
          </div>

          <section
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <input
              type="submit"
              value={!isBtnLoading ? "Submit" : "Submitting..."}
              className={!isBtnLoading ? styles.btn_fill : styles.btn_loading}
              role="button"
            />
            <button onClick={onClose} className={styles.btn_danger}>Cancel</button>
          </section>
        </form>
      </section>
    </div>
  );
}

export default FormModal;