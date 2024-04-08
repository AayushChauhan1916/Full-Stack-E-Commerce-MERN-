import "./relatedproduct.css"
import related_product from "../assets/related_product";
import Item from "../items/item";

function RelatedProducts(){
    return (
        <div className="related-products">
            <h1>Related Products</h1>
            <hr />
            <div className="related-products-item">
                {related_product.map((item,i)=>{
                    return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}

export default RelatedProducts;