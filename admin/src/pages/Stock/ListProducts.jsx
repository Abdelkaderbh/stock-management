import React, { useEffect, useState } from 'react';
import { Table, Tag, Space,message  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './stock.css';
import ConfirmationPopup from '../../components/ConfirmationPopUp';



const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};




const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get('http://localhost:4000/product/all', {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        const productNames = [...new Set(response.data.map(product => product.nom))];
        columns[0].filters = productNames.map(name => ({ text: name, value: name }));
        setProducts(response.data.map(product => ({
          ...product,
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, [products]);
  
  const handleDelete = (record) => {
    setIsModalVisible(true);
    setProductIdToDelete(record._id);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setProductIdToDelete(null);
  };
 

  const handleConfirmDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/product/delete/${productId}`);
   
      setProducts(products.filter((product) => product._id !== productId));
      message.success('Produit Supprimé !');
    } catch (error) {
      message.error('erreur');
    }
    setIsModalVisible(false);
    setProductIdToDelete(null);
  };


  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      sorter: (a, b) => a.nom.length - b.nom.length,
      sortDirections: ['descend'],
      render: (text, record) => {
        const imageUrl = `http://localhost:4000/${record.images[0]}`;
        return (
          <div className="product-name" key={record._id}>
            <img src={imageUrl} className="product-image" style={{ width: '50px' }} />
            <span  className="product-text">   {text}</span>
          </div>
        );
      },
    },
    {
      title: 'Prix',
      dataIndex: 'prix',
      sorter: (a, b) => a.prix - b.prix,
      render:(prix)=>`${prix} DT`
    },
    {
      title: 'Quantité',
      dataIndex: 'quantite',
      sorter: (a, b) => a.quantite - b.quantite,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'En Stock' : 'Hors stock'}
        </Tag>
      ),
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: 'Catgorie',
      dataIndex: ["CatId", "categoryName"],
      render: (categoryName) => categoryName,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <InfoCircleOutlined style={{ color: 'lightblue',fontSize:'20px' }} onClick={() => navigate(`/infoproduct/${record._id}`)} />
          <EditOutlined style={{ color: 'orange' ,fontSize:'20px'}} onClick={() => navigate(`/editproduct/${record._id}`)} />
          <DeleteOutlined style={{ color: '#f95454',fontSize:'20px' }} onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  return (

    

    <div className='add-product-container'>
      <ConfirmationPopup visible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        productId={productIdToDelete}
      />
      <Table
        className='add-product-form'
        columns={columns}
        dataSource={products}
        onChange={onChange}
        rowKey="id"
      />
    </div>
  );
};

export default ListProducts;
