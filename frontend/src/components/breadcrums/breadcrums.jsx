import "./breadcrums.css";
import arrow_icon from "../assets/breadcrum_arrow.png";
import ProductDisplay from "../productdisplay/productdisplay.jsx";

function BreadCums(props) {
  const product = props.product[0];
  // console.log(props)
  return (
    <div>
      <div className="breadcrum">
        Home <img src={arrow_icon} alt="" /> SHOP{" "}
        <img src={arrow_icon} alt="" /> {product.category}{" "}
        <img src={arrow_icon} alt="" /> {product.name}
      </div>
      <ProductDisplay product={product}></ProductDisplay>
    </div>
  );
}

export default BreadCums;
