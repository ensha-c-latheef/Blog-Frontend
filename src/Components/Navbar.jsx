import Logo from "../assets/tutti-cake-logo.png";
import { Link } from "react-router-dom";
import '../App.css';
import { Button } from "antd";

function Navbar(){
    return(
        <nav className="navbar">
            <Link to={'/'}><div className="logo" ><img src={Logo} height={40} width={40}/>Tutti-cake</div></Link>
            <div className="navbar-actions">
                <Button>Lists</Button>
                <Button>sign-up</Button>
                
            </div>
        </nav>

    );
}
export default Navbar;
   
