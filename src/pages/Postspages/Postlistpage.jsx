import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import postsService from "../../services/post.service";
import PostCard from "../../Components/Postcard";
import { AuthContext } from "../../context/auth.context";
import { Button, Col, Row, Spin, Typography } from "antd";

const API_URL = "http://localhost:3000";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
          <Typography.Title level={3} style={{ margin: 0 }} type="secondary">Please signin to create a Post.</Typography.Title>
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
