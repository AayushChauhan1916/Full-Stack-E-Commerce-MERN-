import "./navbar.css";
import Logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png"
import Button from '@mui/material/Button';
import { useContext, useState } from "react";
import {Link} from "react-router-dom";
import ShopContext from "../../context/shopcontext";
import { useRef } from "react";
import { toast } from 'react-toastify';
// import nav_dropdown from "../assets/dropdown_icon.png";

function navbar() {
  let[underline,setUnderLine] = useState("shop");
  const {totalCartItem,user} = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle =(e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const logout = async()=>{
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials' : true
        },
      });

      const data = await response.json(); // Wait for response to be parsed as JSON

      if (data.success) {
        toast.success("Logout Successfully");
        setTimeout(() => {
          window.location.replace("/");
        },500);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return(
    <div className="navbar">
      <div className="nav_logo">
        <img  className="nav_image"src={Logo}></img>
        <p className="nav_title">Shopify</p>
      </div>
      <i className="fa-solid fa-circle-chevron-down navdropdown" onClick={dropdown_toggle}></i>
      <div ref={menuRef} className="nav_menu">
        <ul className="nav_menu_list">
          <li onClick={()=>{setUnderLine("shop")}}><Link className="link" to='/'>Shop</Link>{underline==="shop"?<hr/>:""}</li>
          <li onClick={()=>{setUnderLine("man")}}><Link className="link" to='/men'>Men</Link>{underline==="man"?<hr/>:""}</li>
          <li onClick={()=>{setUnderLine("women")}}><Link className="link" to='/womens'>Women</Link>{underline==="women"?<hr/>:""}</li>
          <li onClick={()=>{setUnderLine("kids")}}><Link className="link" to='/kids'>Kids</Link> {underline==="kids"?<hr/>:""}</li>
        </ul>
      </div>
      <div className="nav-login-cart">
      <div className="nav-login">
        <div >{user?<h4 className="userInfo">Welcome,{user.user.username}</h4>:null}</div>
        <div className="nav-login-cart-button">
        {user?<Button><Link onClick={logout} className="link">Logout</Link></Button>:<Button><Link className="link" to='/login'>Login</Link></Button>}
        </div>
      </div>
        <Link className="link" to='/cart'><img className="nav_cart" src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{totalCartItem()}</div>
      </div>
    </div>
  )
}

export default navbar;
