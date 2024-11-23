import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions } from 'antd';
import './stock.css';

const InfoProduct = () => {
  const { id } = useParams();
  const [product, setProductDetails] = useState(null);

  const ProductInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/${id}`);
      setProductDetails(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ProductInfo();
  }, [id]);
  
  if (!product) {
    return <div>Loading...</div>;
  }

  const items = [
    {
      key: '0', children: (
        <div>
          <img src={`http://localhost:4000/${product.images[0]}`} style={{ maxWidth: '100px', margin: '5px' }} />
        </div>
      ),
    },
    {
      key: '1',
      label: 'Nom',
      children: product.nom,
    },
    {
      key: '12',
      label: 'Quantité',
      children: product.quantite,
    },
    {
      key: '13',
      label: 'Prix',
      children: `${product.prix} DT`,
    },
    {
      key: '14',
      label: 'Status',
      children: product.status ? 'En Stock' : 'Hors Stock',
    },
  ];

  return (
    <div className='add-product-container'>
      <Descriptions title="Information du Produit" items={items} />
    </div>
  );
};

export default InfoProduct;
