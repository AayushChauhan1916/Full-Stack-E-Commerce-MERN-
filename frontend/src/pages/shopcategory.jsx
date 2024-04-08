import "./css/shopcategory.css"
import ShopContext from "../context/shopcontext";
import { useContext } from "react";
import dropdown_icon from "../components/assets/dropdown_icon.png"
import Item from "../components/items/item.jsx";

function ShopCategory(props){
    const {all_products} = useContext(ShopContext)
    // console.log(all_products)
    return (
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt="offer_banner"/>
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>

            <div className="shopcategory-outer">
                <div className="shopcategory-products">
                    {all_products.map((item,i)=>{
                        console.log(props.category)
                        if(item.category == props.category){
                            return <Item key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}></Item>
                        }else{
                            return null
                        }
                    })}
                </div>
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory;