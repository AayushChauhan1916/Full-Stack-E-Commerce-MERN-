import './navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = ()=>{
    return (
        <div className="navbar">
            <img src={nav_logo} className='nav-logo' alt="" />
            <img src={navProfile} alt="" className='nav-profile' />
        </div>
    )
}

export default Navbar;
