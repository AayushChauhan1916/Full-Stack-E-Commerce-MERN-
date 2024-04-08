import './item.css';
import { Link } from "react-router-dom";

function Item(props){
    return (
        <div className="item">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image.url} alt="" /></Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-now">
                ₹{props.new_price}
                </div>
                <div className="item-price-old">
                ₹{props.old_price}
                </div>
            </div>
        </div>
    )
}

export default Item;