import Logo from "../assets/blogoluv.png";
import { Link } from "react-router-dom";
import '../App.css';
import { Button } from "antd";

function Navbar(){
    return(
        <nav className="navbar">
            <Link to={'/'}><div className="logo" ><img src={Logo} height={40} width={40}/>BlogoLuv</div></Link>
            <div className="navbar-actions">
                <Link to="/list" className="navbar-links">
                    <Button>Lists</Button>
                </Link>
                <Link to="/sign-up" className="navbar-links">
                    <Button>sign-up</Button>
                </Link>   
                
            </div>
        </nav>

    );
}
export default Navbar;
   
