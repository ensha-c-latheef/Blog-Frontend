import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import postsService from "../../services/post.service";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function AddpostPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.thumbImageObj && values.thumbImageObj[0]) {
      values.thumbnailImageUrl = values.thumbImageObj[0].response.image;
    }
    if (values.coverImageObj && values.coverImageObj[0]) {
      values.coverImageUrl = values.coverImageObj[0].response.image;
    }
    postsService
      .addPost(values)
      .then((response) => {
        navigate("/posts/list");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const uploadProps = {
    name: "image",
    listType: "picture",
    multiple: false,
    maxCount: 1,
    action: `${import.meta.env.VITE_SERVER_URL}/upload`,
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={18} lg={16} xl={12} xxl={10}>
        <Card title="Please add post details">
          <Form
            name="add-post"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Upload Thumbnail Image"
              name="thumbImageObj"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Upload Cover Image"
              name="coverImageObj"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Post Title"
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
                  message: "Please input post content!",
                },
              ]}
            >
             <ReactQuill theme="snow" value={value} onChange={setValue} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default AddpostPage;
