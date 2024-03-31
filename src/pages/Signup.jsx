import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row } from "antd";

import authService from "../services/auth.service";

function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const onFinish = (values) => {
    const {name, email, password} = values;
    authService.signup({ name, email, password})
    .then((response) => {
      navigate('/login');
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })    
  };

  return(
    <Row justify="center" align='middle'>
      <Col xs={24} sm={24} md={18} lg={16} xl={12} xxl={10}>
        <Card title="Please sign-up to create blog">
          <Form
            name="signup"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div>
              <p>If you already have an account, you can login <Link to={'/login'}>here</Link></p>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        { errorMessage  && <p style={{color: 'red', textAlign: "center"}}>{errorMessage}</p>}
        </Card>
      </Col>
    </Row>
  )
}

export default SignUpPage;