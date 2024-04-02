import React from 'react';
import { Layout, } from 'antd';
const { Header, Footer, Content } = Layout;
import Navbar from "./Components/Navbar";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import AddPostPage from './pages/Postspages/Addpostpage';
import PostListPage from './pages/Postspages/Postlistpage';
import PostDetailsPage from './pages/Postspages/Postdetailpage';
import EditPostPage from './pages/Postspages/Editpostpage';
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
            padding: "16px 24px 0 24px",
            height: "calc(100vh - 128px)",
            overflowY: "auto",
            marginRight: "6px",
            }}
      >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts/create" element={<AddPostPage />} />
          <Route path="/posts/list" element={<PostListPage />} />
          <Route path="/posts/:postId" element={<PostDetailsPage />} />
          <Route path="/posts/edit/:postId" element={<EditPostPage />} />
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
