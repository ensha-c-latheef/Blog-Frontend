import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import postsService from "../../services/post.service";
import PostCard from "../../Components/Postcard";
import { AuthContext } from "../../context/auth.context";
import { Button, Col, Row, Spin, Typography, Modal, Card, } from "antd";
import SignUpPage from "../Signup";

const API_URL = "http://localhost:3000";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const getAllPosts = () => {
    postsService
      .getAllPosts()
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  return (
    <div>
     <div className="post-listing-topbar">
        {isLoggedIn ? (
          <Link to="/posts/create">
            <Button type="primary" size='large'>Create a post</Button>
          </Link>
        ) : (
          <div>
          <Button type="primary" onClick={showModal}>
            Create a post
          </Button>
           <Modal footer={null} title="" open={isModalOpen} onCancel={handleCancel} width={1000}style={{
            top: 20,
            }}>
             <SignUpPage />
           </Modal>
           </div>
        )}
      </div> 
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} key={post._id}>
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PostListPage;
