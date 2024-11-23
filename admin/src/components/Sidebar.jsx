import React from 'react';
import {Flex, Menu} from 'antd';
import logo from '../assets/logo.png'
import {DashboardOutlined,ProfileOutlined,LogoutOutlined,CarryOutOutlined,FileImageOutlined,LockOutlined} from '@ant-design/icons'
import { Link, Navigate, useNavigate } from 'react-router-dom';




const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try {
      localStorage.removeItem("token");
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <>
    <Flex align={'center'} justify={'center'}>
        <div className={`logo-container ${collapsed ? 'collapsed' : ''}`}>
            <img src={logo} alt="" className='logo' />
        </div>
    </Flex>
    <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' 
    items={[{
            key:'1',
            icon:<DashboardOutlined />,
            label:<Link to='/dashboard'> Dashboard </Link>,
            },
            {
            key:'2',
            icon:<ProfileOutlined />,
            label:'Produits',
            children: [
              {
                key: '3',
                label: <Link to='/add'>Ajouter Produit</Link>,
              },
              {
                key: '4',
                label: <Link to ='/products'> Liste Produits </Link>,
              },
           ]},
            {
            key:'5',
            icon:<CarryOutOutlined />,
            label:<Link to="/suppliers"> Forunisseur </Link>,
            },

            {
              key:'6',
              icon:<FileImageOutlined />,
              label:<Link to="/categories"> Categories </Link>,
            },

            {
              key:'7',
              icon:<LockOutlined />,
              label:<Link to="/changerMdp"> Modifier Mot de passe </Link>,
            },

            {
            key:'8',
            icon:<LogoutOutlined />,
            label:<span onClick={handleLogout}>Se Déconnecter</span>,
            } 
          ]}
        />
  
    </>
  )
}

export default Sidebar