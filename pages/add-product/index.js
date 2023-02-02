import styles from "../../styles/AddProduct.module.scss";
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import SharedLayout from '../../components/layout/SharedLayout';
import { redirect } from "next/dist/server/api-utils";

const AddProduct = () => {
  const [checked, setChecked] = useState(false);
  const [formInputs, setFormInputs] = useState({ });
  const router = useRouter();

  const { status } = useSession({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = { ...formInputs, status: !checked ? "out of stock" : "available" }
    console.log("ll: ", data);

  }
  
  const handleCheckbox = () => {
    setChecked(!checked);
  };


  if (status === "loading") {
    return <h1>"Loading or not authenticated..."</h1>
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
          <label htmlFor="category">Category
            <select name="category" id="pet-select" onChange={handleInputsChange}>
              <option value="">--Choose an option--</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
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

        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      <p>{checked.toString()}</p>
    </SharedLayout>
  )

}

export default AddProduct