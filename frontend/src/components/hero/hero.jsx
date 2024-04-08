import "./hero.css";
import hand_icon from "../assets/hand_icon.png";
import arrow_icon from "../assets/arrow.png";
import hero_image from "../assets/hero_image.png";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
            <h2 className="hero-left-h2">New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collections </p>
                <p>for everyone</p>
                    <div className="hero-latest-btn">
                        <div>Latest Collections</div>
                        <img src={arrow_icon} alt="" />
                    </div>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  );
}

export default Hero;
