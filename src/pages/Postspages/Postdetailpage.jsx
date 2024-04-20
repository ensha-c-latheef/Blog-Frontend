import { useState, useEffect, useContext } from "react";
import { Interweave } from 'interweave';

import { Link, useParams, useNavigate } from "react-router-dom";

import postsService from "../../services/post.service";
// import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Divider, Button, List, Avatar, Flex, Form, Input, Spin, Grid } from "antd";
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, LikeOutlined, LikeFilled} from "@ant-design/icons";

function PostDetailsPage(props) {
  const { user, setCartItemCount, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState('');


  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentForm] = Form.useForm();
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

  let hasLikedValueObj = post && user && post.likes && Array.isArray(post.likes) && (post.likes.find(like => like.author._id === user._id))

  let hasLikedValue = hasLikedValueObj ? hasLikedValueObj.hasLiked : false;
  const toggleLikeToPost= () => {
    postsService
      .addLikeStatusToPost({postId, hasLiked: !hasLikedValue})
      .then(() => {
        getPost();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
  };

  
  const deleteComment= (commentId) => {
    postsService
      .deleteComment(commentId)
      .then(() => {
        getPost();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
  };
  const onCommentFinish = (values) => {
    const { comment } = values;
    postsService.addPostComment({
      postId,
      comment,
    }).then(() => {
      commentForm.setFieldsValue({ comment: '' });
      getPost();
    })
    .catch((error) => console.log(error));
  }

  const onCommentEditFinish = (values) => {
    const { editingComment } = values;
    postsService.updateComment(editingCommentId, editingComment)
    .then(() => {
      setEditingCommentId('')
      getPost();
    })
    .catch((error) => console.log(error));
  }

  const startEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };


  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    )
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
        <Row gutter={[16, 0]} align={"middle"}>
          <Col>
            <Link to="/posts/list">
              <Button icon={<ArrowLeftOutlined />}>
                Back to the list of posts
              </Button>
            </Link>
          </Col>
           <Col>
            {
              isLoggedIn && user && post.author._id === user._id && (
                <Link to={`/posts/edit/${postId}`}>
                  <Button type="primary" style={{marginRight:12}}icon={<EditOutlined />}>Edit Post</Button>
                </Link>
              )
            }
            {
              isLoggedIn && user && post.author._id === user._id ? (
                <Button type="primary" danger onClick={deletePost} icon={<DeleteOutlined />}>
                  Delete
                </Button>
              ) : (
                <Button shape="circle" danger onClick={toggleLikeToPost} icon={ hasLikedValue ? <LikeFilled /> : <LikeOutlined />} />
              )
            }
            {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
          </Col> 
        </Row>

        <Divider />
        {
          isLoggedIn && user && post.author._id !== user._id ? (
            <>
              <Form
                name="comment"
                onFinish={onCommentFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Typography.Title level={5}>Add Your Comment:</Typography.Title>
                
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
          Comments
        </Typography.Title>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={post.comments}
          renderItem={(item, index) => {
            if (editingCommentId === item._id) {
              return (
                <Form
                name="edit-comment"
                onFinish={onCommentEditFinish}
                autoComplete="off"
                layout="vertical"
                key={editingCommentId}
                style={{ padding: '12px 24px' }}
              >
                <Typography.Title level={5}>Edit Your Comment:</Typography.Title>
                
                <Form.Item
                  label="Comment"
                  name="editingComment"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your comment!',
                    },
                  ]}
                  initialValue={item.comment}
                >
                  <Input.TextArea rows={5}/>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update comment
                  </Button>
                </Form.Item>
                <Divider />
              </Form>    
              )
            }
            return (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.author.imageUrl ? item.author.imageUrl : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                }
                title={<Flex align="center" justify="flex-start" gap={8}><Typography.Title level={5} style={{margin: 0}} >{item.author.name}</Typography.Title><Typography.Text type="secondary">{new Date(item.createdAt).toLocaleString('en-UK')}</Typography.Text></Flex>}
                description={item.comment}
              />
              {
                isLoggedIn && user && item.author._id === user._id && (
                <Button danger shape="circle" onClick={() => {deleteComment(item._id)}} icon={<DeleteOutlined />} />
              )
              }
              {
                isLoggedIn && user && item.author._id === user._id && (
                <Button type="primary" ghost shape="circle" style={{marginLeft:10}} onClick={() => {startEditComment(item._id)}} icon={<EditOutlined />} />
              )
              }
            </List.Item>
          )
        }
        
        }
        />
        <Divider />
      </Col>
    </Row>
  ); 
}

export default PostDetailsPage;
