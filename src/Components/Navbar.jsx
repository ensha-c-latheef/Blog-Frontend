import Logo from "../assets/blogoluv.png";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import { Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar(){
    const { isLoggedIn, logOutUser,} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOutUser();
        navigate("/");
      };
    return(
        <nav className="navbar">
            <Link to={'/'}><div className="logo" ><img src={Logo} height={40} width={40}/>BlogoLuv</div></Link>
            <div className="navbar-actions">
                <Link to="/posts/list" >
                    <Button>Posts</Button>
                </Link>
                   
                {isLoggedIn ? (
                    <>
                        <Link to="/profile">
                            <Button>Profile</Button>
                        </Link>
                        <Link>
                            <Button  type="primary" onClick={handleLogout}>Logout</Button>
                        </Link>
                    </>
                ):(
                    <Link to="/sign-up">
                        <Button type="primary">sign-up</Button>
                    </Link> 
                )}
            </div>
        </nav>

    );
}
export default Navbar;
   
