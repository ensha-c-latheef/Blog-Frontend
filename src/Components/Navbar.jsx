import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "antd";
import Logo from "../assets/blogoluv.png";
import { AuthContext } from "../context/auth.context";
import '../App.css';
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

function Navbar(){
    const { isLoggedIn, logOutUser, user} = useContext(AuthContext);
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
                   
                {isLoggedIn && user ? (
                    <>
                        <Link to="/profile">
                        <Button
                        icon={
                          user.imageUrl ? (
                            <Avatar shape="circle" size='small' src={user.imageUrl} />
                          ) : (
                            <UserOutlined />
                          )
                        }
                        style={{
                          paddingLeft: 4
                        }}
                      >{user.name}</Button>
                        </Link>
                        <div style={{ height: "100%" }}>
                            <Button  type="primary" onClick={handleLogout}>Logout</Button>
                        </div>
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
   
