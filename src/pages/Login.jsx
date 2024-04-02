import { useContext, useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const onFinish = (values) => {
    const {email, password} = values;
    authService.login({email, password})
    .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();    
        navigate('/posts/list');                                 
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
    
  };
  
  return(
    <Row justify="center" align='middle'>
      <Col xs={24} sm={24} md={18} lg={16} xl={12} xxl={10}>
        <Card title="Please login to continue">
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
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
              <p>If you don't have an account yet, you can create your account <Link to={'/sign-up'}>here</Link></p>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          { errorMessage  && <p style={{color: 'red', textAlign: "center"}}>{errorMessage}</p>}
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage;