import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Spin, Upload, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import postsService from "../../services/post.service";

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

function EditPostPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    postsService
      .getPostDetails(postId)
      .then((response) => {
        setPostData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [postId]);

  const onFinish = (values) => {
    // if (values.imageObj && values.imageObj[0]) {
    //   values.imageUrl = values.imageObj[0].response.image;
    // }
    postsService
      .editPostDetails(postId, values)
      .then((response) => {
        navigate(`/posts/${postId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

//   const deleteCake = () => {
//     cakeServices
//       .deleteCake(cakeId)
//       .then(() => {
//         navigate("/cakes");
//       })
//       .catch((error) => {
//         const errorDescription = error.response.data.message;
//         setErrorMessage(errorDescription);
//         setLoading(false);
//       });
//   };

//   const uploadProps = {
//     name: "image",
//     listType: "picture",
//     multiple: false,
//     maxCount: 1,
//     action: `${import.meta.env.VITE_SERVER_URL}/upload`,
//   };

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
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={18} lg={16} xl={12} xxl={10}>
        <Card title="Edit a post">
          <Form
            name="edit-post"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={postData}
          >
            {/* <Form.Item
              label="Upload Cake Picture"
              name="imageObj"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Update</Button>
              </Upload>
            </Form.Item> */}
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input post title!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please input content!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            {/* <Form.Item
              label="Cake Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input cake price!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Cake Preparation Time"
              name="preperationTime"
              rules={[
                {
                  required: true,
                  message: "Please input cake preperation Time!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item> */}
            <Flex align="center" gap={16}>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              {/* <Button type="primary" danger onClick={deleteCake}>
                Delete Cake
              </Button> */}
            </Flex>
          </Form>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default EditPostPage;
