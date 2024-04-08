import "./addproduct.css";
import uploadarea from "../../assets/upload_area.svg";
import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  // console.log(image)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    filename: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const ChangeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const addProductdetails = async () => {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("image", image);

    const loadingToastId = toast.info("📤 Uploading...", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

    await fetch("http://localhost:8080/api/admin/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      // console.log(responseData);
      product.image = responseData.image_url;
      product.filename = responseData.image_filename;
      await fetch("http://localhost:8080/api/admin/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.dismiss(loadingToastId)
          data.success
            ? toast.success("🎁 Product Added Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              })
            : toast.error(" Something Went Wrong", {
                position: "top-center",
                autoClose: 50,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
      })
      setProductDetails({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
      });
      setImage(false);
    }
    if((responseData.success == false)){
      toast.error(responseData.message)
    };
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={ChangeHandler}
          type="text"
          name="name"
          placeholder="Product Title Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            value={productDetails.old_price}
            onChange={ChangeHandler}
            name="old_price"
            placeholder="Old Price Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            value={productDetails.new_price}
            onChange={ChangeHandler}
            name="new_price"
            placeholder="Offer Price Here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={ChangeHandler}
          className="addproduct-selector"
        >
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="Kid">kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadarea}
            alt="img"
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProductdetails();
        }}
        className="addproduct-btn"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
