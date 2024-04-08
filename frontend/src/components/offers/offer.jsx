import "./offer.css"
import exclusive_image from "../assets/exclusive_image.png"

function Offers(){
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers for You</h1>
                <p>Only On Best Sellers Buttons</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    )
}

export default Offers;