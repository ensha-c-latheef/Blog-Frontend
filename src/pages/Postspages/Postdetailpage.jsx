import { useState, useEffect, useContext } from "react";
import { Interweave } from 'interweave';

import { Link, useParams, useNavigate } from "react-router-dom";

import postsService from "../../services/post.service";
// import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button, List, Avatar, Flex, Rate, Form, Input, Spin, Grid } from "antd";
import { ArrowLeftOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function PostDetailsPage(props) {
  const { user, setCartItemCount, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();


  const getPost = () => {
    setLoading(true);
    postsService
      .getPostDetails(postId)
      .then((response) => {
        const onePost = response.data;
        setPost(onePost);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

//   const onReviewFinish = (values) => {
//     const { rating, comment } = values;
//     const author = user._id;
//     const cake = cakeId;
//     cakeServices.addCakeReview({
//       author,
//       cake,
//       comment,
//       rating,
//     }).then(() => {
//       form.setFieldsValue({ comment: '', rating: 0});
//       getCake();
//     })
//     .catch((error) => console.log(error));
//   }

//   const addCakeToCart = () => {

//     orderServices.addCakeToCart(cakeId)
//       .then((addResponse) => {
//         orderServices.getCartDetails()
//         .then((response) => {
//           const count = response.data.cakes.length
//           setCartItemCount(count);
//           navigate('/cakes')
//         })
//       })
//       .catch((error) => console.log(error));
//   };

  useEffect(() => {
    getPost();
  }, []);

  const deletePost= () => {
    postsService
      .deletePost(postId)
      .then(() => {
        navigate("/posts/list");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
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
    <Row gutter={[24, 0]} align="top">
      <Col span={16}>
        <Image width={"60%"} src={post.coverImageUrl} preview={false} />
        <Typography.Title
          level={screens.lg ? 2 : 4}
          style={{
            margin: 0,
          }}
        >
          {post.title}
        </Typography.Title>
        {/* <Typography.Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          created by: {post.author && post.author.name}
        </Typography.Title> */}
        <Divider />
        <Typography.Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Content:
        </Typography.Title>
        <div><Interweave content={post.content} /></div>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          created by: {post.author && post.author.name}
        </Typography.Title>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col>
            <Link to="/posts/list">
              <Button icon={<ArrowLeftOutlined />}>
                Back to the list of posts
              </Button>
            </Link>
          </Col>
           <Col>
            {
              isLoggedIn && post.author._id === user._id && (
                <Link to={`/posts/edit/${postId}`}>
                  <Button type="primary" style={{marginRight:12}}icon={<EditOutlined />}>Edit Post</Button>
                </Link>
              )
            }
            {
              isLoggedIn && post.author._id === user._id && (
                <Button type="primary"  onClick={deletePost} icon={<ShoppingCartOutlined />}>
                  Delete
                </Button>
              )
            }
            {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
          </Col> 
        </Row>

        <Divider />
        {/* {
          isLoggedIn && cake.vendor._id !== user._id ? (
            <>
              <Form
                name="review"
                onFinish={onReviewFinish}
                autoComplete="off"
                layout="vertical"
                form={form}
              >
                <Typography.Title level={5}>Add Your Review:</Typography.Title>
                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your rating!',
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="Comment"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your comment!',
                    },
                  ]}
                >
                  <Input.TextArea rows={5}/>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit comment
                  </Button>
                </Form.Item>
              </Form>                

              <Divider />
            </>
          ) : null
        }
        <Typography.Title level={4}>
          Reviews
        </Typography.Title>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={cake.reviews}
          renderItem={(item, index) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.author.imageUrl ? item.author.imageUrl : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                }
                title={<Flex align="baseline" justify="flex-start" gap={8}><Typography.Title level={5}>{item.author.name}</Typography.Title><Rate value={item.rating} disabled /><Typography.Text type="secondary">{new Date(item.createdAt).toLocaleString('en-UK')}</Typography.Text></Flex>}
                description={item.comment}
              />
            </List.Item>
          )}
        />
        <Divider />
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Price:</Typography.Text>
          <Typography.Title
            level={screens.lg ? 3 : 5}
            style={{
              margin: 0,
            }}
          >
            {cake.price} €
          </Typography.Title>
        </Card>
        <Card>
          <Typography.Text>Preperation time:</Typography.Text>
          <Typography.Title
            level={screens.lg ? 3 : 5}
            style={{
              margin: 0,
            }}
          >
            {cake.preperationTime} hrs.
          </Typography.Title>
        </Card> */}
      </Col>
    </Row>
  ); 
}

export default PostDetailsPage;
