import React, { useState, useEffect } from 'react';
import { Card, Row, Col  } from 'antd';
import './dashboard.css';
import axios from 'axios';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [supplier, setSuppliers] = useState([]);
  const [categories,setCats] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
      const response = await axios.get('http://localhost:4000/product/all',{
        headers: {
          Authorization: `Bearer ${token}`, 
     }});
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  
  const fetchCatg = async () => {
    try {
      const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get("http://localhost:4000/categories/all", {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setCats(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get("http://localhost:4000/suppliers/all", {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(()=>{
    fetchCatg();
  },[])


  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]} className="top-cards">
        <Col span={6}>
          <Card title="Nombre des Produits" bordered={false}>
            {products ? products.length : 0}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Nombre des founisseurs" bordered={false}>
            {supplier ? supplier.length : 0}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Nombre des categories" bordered={false}>
            {categories ? categories.length :0}
          </Card>
        </Col>
      
      </Row>
 
    </div>
  );
};

export default Dashboard;
