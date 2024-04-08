import { useEffect, useState } from "react";
import "./listproduct.css";
import cross_icon from "../../assets/cross_icon.png";
import { toast } from "react-toastify";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const removetoast = () => {
    toast.success("🎁Product Remove Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchinfo = async () => {
    
    await fetch("http://localhost:8080/api/admin/allproducts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((e) => {
        console.log("something went Wrong " + e);
      });
  };

  useEffect(() => {
    fetchinfo();
  }, []);

  const removeProduct = async (id,image) => {
    const loadingToastId = toast.info("🗑️ Deleting.....", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    await fetch("http://localhost:8080/api/admin/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id,image:image }),
    });
    toast.dismiss(loadingToastId)
    removetoast();
    await fetchinfo();
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="listproduct-format listproduct-format-main">
                <img
                  src={item.image.url}
                  alt="product_image"
                  className="listproduct-product-icon"
                />
                <p>{item.name}</p>
                <p>&#8377;{item.old_price}</p>
                <p>&#8377;{item.new_price}</p>
                <p>{item.category}</p>
                <img
                  onClick={() => {
                    removeProduct(item.id,item.image);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
