import "./footer.css"
import footer_logo from "../assets/logo_big.png"
import instagram from "../assets/instagram_icon.png"
import pintester from "../assets/pintester_icon.png"
import whatsapp from "../assets/whatsapp_icon.png"

function Footer(){
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Shopify</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pintester} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer;