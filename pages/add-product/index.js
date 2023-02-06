import styles from "../../styles/AddProduct.module.scss";
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
// import UploadcareImage from '@uploadcare/nextjs-loader';
import { Widget } from "@uploadcare/react-widget";

import SharedLayout from '../../components/layout/SharedLayout';

const uploadCarePublicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const AddProduct = () => {
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState([])
  const [formInputs, setFormInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  })

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
    console.log("ll: ", modifiedData);

    try {
      const res = await fetch(
        `${BASE_URL_LOCAL}/products`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.user?.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData)
      }
      );

      if (res.status !== 200) {
        console.error("An error occured: ", res);
        return;
      }

      const data = await res.json();
      console.log("data: ", data)
      // setCategories(data);

    } catch (error) {
      console.error("err: ", error);
    }

  }

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${BASE_URL_LOCAL}/categories`, {
          headers: {
            "Authorization": `Bearer ${session?.user?.token}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
        );

        if (res.status !== 200) {
          console.error("An error occured: ", res.statusText);
          return;
        }

        const data = await res.json();
        // console.log("data: ", data)
        setCategories(data);

      } catch (error) {
        console.error("err: ", error);
      }
    };

    fetchCategories();

  }, [session])

  // console.log("sess: ", session)



  if (status === "loading") {
    return <h1>Loading or not authenticated...</h1>
  }

  return (
    <SharedLayout>
      <h1>Add new product</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.name_category_box}>
          <label htmlFor="name">
            Name
            <input type="text" name="name" placeholder="Name" onChange={handleInputsChange} />
          </label>
          <label htmlFor="categoryId">Category
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
          <label htmlFor="price">
            Price
            <input type="number" name="price" placeholder="Price" onChange={handleInputsChange} />
          </label>
          <label>
            Quantity
            <input type="number" name="quantity" placeholder="Quantity" onChange={handleInputsChange} />
          </label>
        </div>
        <div className={styles.textarea}>
          <label htmlFor="description">
            Description
            <textarea type="text" name="description" placeholder="Description" onChange={handleInputsChange} />
          </label>
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
          <label htmlFor='images'>Add images</label>{' '}
          <Widget
            publicKey={uploadCarePublicKey}
            id='images'
            className={styles.images_widget}
            multiple
            onFileSelect={async (group) => {
              const files = await Promise.all(group.files());
              const urls = files.map((file) => file.cdnUrl);
              console.log("urls: ", urls);
              setImages([...urls]);
            }}
            previewStep="true"
            dataImageShrink="680x680"
            onChange={info => console.log('Upload completed:', info)}
          />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </SharedLayout>
  )

}


export default AddProduct