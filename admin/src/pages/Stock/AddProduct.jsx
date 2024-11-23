import React, { useState, useEffect,useContext } from 'react';
import { Form, Input, Button, InputNumber, Select, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './stock.css';
import { AuthContext } from '../../context/AuthContext';

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { userId } = useContext(AuthContext);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    const fetchCategories = async () => {
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
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
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
        console.error("Failed to fetch suppliers:", error);
      }
    };

    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("nom", values.nom);
    formData.append("quantite", values.quantite);
    formData.append("prix", values.prix);
    formData.append("status", values.status);
    formData.append("Promo", values.Promo);
    formData.append("CatId", values.CatId);
    formData.append("SupplierId", values.SupplierId);
    formData.append("userId",userId);
    console.log("user id :",userId);
    

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const response = await axios.post("http://localhost:4000/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        message.success("Produit ajouté avec succès");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add product");
    }
  };

  return (
    <div className='add-product-container'>
      <h1>Ajouter Produit</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className='add-product-form'
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Nom" name="nom" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantité" name="quantite" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Prix (DT)" name="prix" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select placeholder="Sélectionnez le status">
                <Select.Option value="En Stock">En Stock</Select.Option>
                <Select.Option value="Hors Stock">Hors Stock</Select.Option>
              </Select>
            </Form.Item>
          </Col>
     
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Catégorie" name="CatId" rules={[{ required: true }]}>
              <Select placeholder="Sélectionnez une catégorie">
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.categoryName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Fournisseur" name="SupplierId" rules={[{ required: true }]}>
              <Select placeholder="Sélectionnez un fournisseur">
                {suppliers.map((supplier) => (
                  <Select.Option key={supplier._id} value={supplier._id}>
                    {supplier.suppName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Images" rules={[{ required: true }]}>
              <Upload
                multiple
                listType="picture"
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddProductForm;
