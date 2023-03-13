import styles from "../../styles/AddProduct.module.scss";
import { useState } from "react"
import { useSession } from "next-auth/react";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { customToast } from "../../components/Toasts";
import { useFetchWithoutToken } from "../../utils/services";
import SharedLayout from "../../components/layout/SharedLayout";
import { FormTextAreaWithValidation, FormWithValidation } from "../../components/Form";

const uploadCarePublicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API;

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  categoryId: yup.string().required("Product category is required"),
  price: yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  quantity: yup.number("Quantity must be a number")
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity is must be an integer"),
  description: yup.string()
    .required("Description is required")
    .min(10, "Description length must be more than 6 characters")
    .max(600, "Description length cannnot exceed 600 characters"),
}).required();


const AddProduct = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data: categories } = useFetchWithoutToken(`${BASE_URL}/categories`);

  const onSubmit = async (data) => {
    setIsBtnLoading(true);
    setDisabled(true)
    if(image.length === 0) {
      customToast("error", "You must add at least 1 image", "top-right");
      setTimeout(() => {
        setIsBtnLoading(false);
        setDisabled(false);
      }, 5000);
      return;
    }

    let modifiedData = {
      ...data,
      image,
      status: !checked ? "out of stock" : "available"
    }

    axios.post(`${BASE_URL}/products/merchant`, modifiedData, {
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
          setIsBtnLoading(false);
          setDisabled(false);
        }, 4800);
      })

  }

  const handleCheckbox = () => {
    setChecked(!checked);
  };


  return (
    <SharedLayout>
      <h1>Add new product</h1>
      <ToastContainer />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form_container}
      >
        <div className={styles.name_category_box}>
          <FormWithValidation
            htmlFor="name"
            title="Name"
            type="text"
            name="name"
            placeholder="Name"
            data_testid="name"
            register={register("name")}
            errors={errors.name?.message}
          />
          <label htmlFor="categoryId" className={styles.label}>
            Category
            <select
              name="categoryId"
              data-testid="categoryId"
              {...register("categoryId")}
              style={{ margin: "0" }}
            >
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
            <p
              style={{ 
                margin: "0", 
                fontSize: "12px", 
                color: "#b30000" 
              }}
            >
              {errors.categoryId?.message}
            </p>
          </label>
        </div>
        <div className={styles.price_quantity_box}>
          <FormWithValidation
            htmlFor="price"
            title="Price"
            type="number"
            name="price"
            placeholder="Price"
            data_testid="price"
            register={register("price")}
            errors={errors.price?.message}
          />
          <FormWithValidation
            htmlFor="quantity"
            title="Quantity"
            type="number"
            name="quantity"
            placeholder="Quantity"
            data_testid="quantity"
            register={register("quantity")}
            errors={errors.quantity?.message}
          />
        </div>
        <div className={styles.textarea}>
          <FormTextAreaWithValidation
            htmlFor="description"
            title="Description"
            type="text"
            name="description"
            placeholder="Description"
            data_testid="description"
            register={register("description")}
            errors={errors.description?.message}
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

        <div
          className={styles.images_upload_box}
        >
          <label htmlFor="image">Add images</label>{" "}
          <Widget
            publicKey={uploadCarePublicKey}
            id="image"
            multiple
            onFileSelect={async (group) => {
              const files = await Promise.all(group.files());
              const urls = files.map((file) => file.cdnUrl);
              setImage([...urls]);
            }}
            previewStep="true"
            dataImageShrink="680x680"
            onChange={info => {
              console.log("Upload completed:", info)
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            className={!isBtnLoading ? styles.btn_fill : styles.btn_loading}
            role="button"
            disabled={disabled}
          >
            {!isBtnLoading ? "Submit" : "Submitting..."}
          </button>
        </div>
      </form>
    </SharedLayout>
  );


}


export default AddProduct