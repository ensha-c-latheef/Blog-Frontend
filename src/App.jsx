import React from 'react';
import { Layout, } from 'antd';
const { Header, Footer, Content } = Layout;
import Navbar from "./Components/Navbar";
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import { Routes, Route } from "react-router-dom";
import './App.css'





function App() {
  
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          padding:0
          }}
      >
        <Navbar />
      </Header>
      <Content
        style={{
            padding: "16px 24px",
            height: "calc(100vh - 128px)",
            overflowY: "auto",
            marginRight: "6px",
            }}
      >
       <Routes>
       <Route path="/sign-up" element={<SignUpPage />} />
       <Route path="/login" element={<LoginPage />} />
      </Routes> 
      
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        BlogoLuv ©{new Date().getFullYear()} Created by Ensha
      </Footer>
    </Layout>
  );
}; 
  
  


export default App; 
