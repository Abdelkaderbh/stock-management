import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './stock.css';

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isPromo, setIsPromo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/${id}`);
        const product = response.data;
        form.setFieldsValue({
          colors: product.colors || '',
          prix: product.prix || '',
          status: product.status ? 'true' : 'false',
          InPromo: product.Promo?.InPromo ? 'true' : 'false',
          Percentage: product.Promo?.Percentage || '',
          quantite: product.quantite || '',
        });
        setIsPromo(product.Promo?.InPromo || false);
        setFileList(product.images.map((image, index) => ({
          uid: image,
          name: `image n° ${index+1}`,
          status: 'done',
          url: `http://localhost:4000/${image}`,
        })));
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, form]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePromoChange = (value) => {
    setIsPromo(value === 'true');
    form.setFieldsValue({ InPromo: value });
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && values[key] !== null) {
        if (key === 'status') {
          formData.append(key, values[key] === 'true');
        } else if (key === 'InPromo') {
          formData.append('InPromo', values[key] === 'true');
        } else if (key === 'Percentage') {
          formData.append('Percentage', values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
    });
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    try {
      const response = await axios.put(`http://localhost:4000/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Produit mis à jour avec succès");
        navigate("/products");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error("Failed to update product");
    }
  };

  return (
    <div className='add-product-container'>
      <h1>Modifier Produit</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className='add-product-form'
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Statut (En stock / Hors stock)" name="status">
              <Select placeholder="Sélectionnez le statut">
                <Select.Option value="true">En stock</Select.Option>
                <Select.Option value="false">Hors stock</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Promo (Oui / Non)" name="InPromo">
              <Select placeholder="Sélectionnez le statut" onChange={handlePromoChange}>
                <Select.Option value="true">Oui</Select.Option>
                <Select.Option value="false">Non</Select.Option>
              </Select>
            </Form.Item>
            {isPromo && (
              <Form.Item label="Pourcentage de réduction (%)" name="Percentage">
                <Input type="number" />
              </Form.Item>
            )}
            <Form.Item label="Quantité" name="quantite">
              <Input type="number" />
            </Form.Item>

          </Col>
          <Form.Item label="Images">
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
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" style={{ width: "10%" }}>
            Modifier
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
