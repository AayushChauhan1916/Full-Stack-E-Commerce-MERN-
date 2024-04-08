import { useContext, useEffect } from "react";
import "./cartitem.css";
import ShopContext from "../../context/shopcontext";
import remove_icon from "../assets/cart_cross_icon.png";

function cartItem() {
  const { all_products, cartItem, deleteToCart,totalCartAmount} = useContext(ShopContext);
  useEffect(()=>{
    
  })
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_products.map((e, i) => {
        if (cartItem[e.id] > 0) {
          return (
            <div key={i}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image.url} className="carticon-product-icon" alt="" />
                <p>{e.name}</p>
                <p>&#8377;{e.new_price}</p>
                <button className="cartitems-quantity">{cartItem[e.id]}</button>
                <p>&#8377;{e.new_price * cartItem[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => deleteToCart(e.id)}
                  alt=""
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>SubTotal</p>
                        <p>&#8377;{totalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>&#8377;{totalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed To CheckOut</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="promo code" />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default cartItem;
