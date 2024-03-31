import React from 'react';
import { Layout, } from 'antd';
const { Header, Footer, Content } = Layout;
import Navbar from "./Components/Navbar";
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
        
      
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}; 
  
  


export default App; 
