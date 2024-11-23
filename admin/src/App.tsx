import React, { useState } from "react";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/Stock/AddProduct";
import ListProducts from "./pages/Stock/ListProducts";
import EditProduct from "./pages/Stock/EditProduct";
import InfoProduct from "./pages/Stock/InfoProduct";
import Login from "./pages/Login/Login";
import ModifierMdp from "./pages/MotDePasse/ModifierMdp";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Fournisseur from "./pages/Fournisseur/Fournisseur.jsx";
import Categories from "./pages/Categories/Categories.jsx";

const { Sider, Header, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="sider"
              >
                <Sidebar collapsed={collapsed} />
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  className="trigger-btn"
                />
              </Sider>
              <Layout>
                <Header className="header">
                  <Navbar />
                </Header>
                <Content className="content">
                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          </ProtectedRoute>
        }
      >
        {/* Nested protected routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="products" element={<ListProducts />} />
        <Route path="suppliers" element={<Fournisseur />} />
        <Route path="categories" element={<Categories />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
        <Route path="infoproduct/:id" element={<InfoProduct />} />
        <Route path="changerMdp" element={<ModifierMdp />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
}

export default App;
