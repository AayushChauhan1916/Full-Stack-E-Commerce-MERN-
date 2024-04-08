import "./productdisplay.css"
import star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png";
import ShopContext from "../../context/shopcontext";
import { useContext } from "react";

function ProductDisplay(props){
    // console.log(product)
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    // console.log(addToCart)
    // console.log(product)
    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image.url} alt="" />
                    <img src={product.image.url} alt="" />
                    <img src={product.image.url} alt="" />
                    <img src={product.image.url} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image.url} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>122</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">&#8377;{product.old_price}</div>
                    <div className="productdisplay-right-price-new">&#8377;{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, placeat? Aut, cumque. Consectetur, molestias nam! Minima id consequatur magni eum nisi! Repellendus corrupti mollitia.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>addToCart(product.id)}>Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductDisplay;