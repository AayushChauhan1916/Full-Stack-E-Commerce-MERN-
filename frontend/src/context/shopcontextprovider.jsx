import ShopContext from "./shopcontext";
import allProduct from "../components/assets/all_product";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < allProduct.length; i++) {
    cart[i + 1] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  // const all_products = allProduct;
  const [all_products, setall_Products] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart);

  const [user, setUser] = useState(null);

  // cart fetch
  useEffect(()=>{
    if(user){
        fetch("http://localhost:8080/api/cart/getcart",{
            method:"POST",
            credentials:"include",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:""
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            setCartItem(data.cart)
        })
    }
  },[user])

  // fetch user

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/login/success",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("User Logged IN")
          setUser(data);
        } else {
          console.log("User Not Logged IN");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);

  //   fetch product details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/allproducts",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        // console.log(data)
        if (data) {
          setall_Products(data);
        }
      } catch (error) {
        // alert(error)
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (itemId) => {
    setCartItem((preVal) => {
      return { ...preVal, [itemId]: preVal[itemId] + 1 };
    });
    if (user) {
      fetch("http://localhost:8080/api/cart/addtocart", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.success("Item Add successfully");
        });
    }
  };

  const deleteToCart = (itemId) => {
    setCartItem((preVal) => {
      return { ...preVal, [itemId]: preVal[itemId] - 1 };
    });
    if (user) {
      fetch("http://localhost:8080/api/cart/removetocart", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        });
    }
  };

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const totalCartItem = () => {
    let totalitem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalitem += cartItem[item];
      }
    }
    return totalitem;
  };

  return (
    <ShopContext.Provider
      value={{
        all_products,
        cartItem,
        addToCart,
        deleteToCart,
        totalCartAmount,
        totalCartItem,
        user,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
