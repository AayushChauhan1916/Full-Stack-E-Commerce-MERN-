import { useContext } from "react";
import ShopContext from "../context/shopcontext";
import {useParams} from "react-router-dom";
import BreadCums from "../components/breadcrums/breadcrums";
import DescriptionBox from "../components/description/descriptionbox";
import RelatedProducts from "../components/relatedproduct/relatedproduct";

function Product(){
    const {all_products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_products.filter((el)=>{return el.id == productId})
    // console.log(product)
    return (
        <div>
            <BreadCums product={product}></BreadCums>
            <DescriptionBox></DescriptionBox>
            <RelatedProducts></RelatedProducts>
        </div>
    )
}

export default Product;