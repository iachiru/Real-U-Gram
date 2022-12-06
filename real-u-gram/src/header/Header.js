import { useNavigate } from "react-router-dom";
import logo from "../images/logoRUG.jpg";
import "./Header.css";
import { useAuth } from "./../context/authContext";
import { 
    CiHome,
    CiHeart,
    CiSquareChevLeft,
    CiSearch,
    CiSettings,
    CiUser,
    CiPower,
    CiFaceFrown,
    CiFaceSmile,
    CiLogin
} from "react-icons/ci";
import LogIn from "../pages/profileRelated/LogIn";

const Header = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    if(user)
        return ( 
            <div className="container_header">
                <div className="logobox">
                    <img className="logo_nav" src={logo} alt="logo" />
                </div>
                <div className="greeting">
                    <p>You are logged in. <CiFaceSmile /></p>
                </div>
                <div className="icons">
                    <ul className="navlist">
                        <li>< CiHome size={28} alt="Home" onClick={() => navigate("/")} /></li>
                        <li>< CiSearch size={28}/></li>
                        <li>< CiHeart size={28}/></li>
                        <li>< CiUser size={28} onClick={() => navigate("/profile")} /></li>
                        <li>< CiSettings size={28}/></li>
                        <li>< CiSquareChevLeft size={28} onClick={() => navigate(-1)} /></li>
                        <li>< CiPower size={28} onClick={logOut} /></li>
                    </ul>
                </div>
            </div>
        );
    return ( 
        <div className="container_header">
            <div className="logo">
                <img className="logo_nav" src={logo} alt="logo" />
            </div>
            <div className="greeting">
                <p>Logged out. < CiFaceFrown /></p>
            </div>
            <div className="icons">
                <ul className="navlist">
                    
                    <li>< CiLogin size={28} onClick={LogIn} /></li>
                    
                </ul>
            </div>
        </div>
    );
};
 
export default Header;
