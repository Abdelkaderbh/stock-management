import React from 'react';
import './mdp.css';
import { Form, message, Row, Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ModifierMdp = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Utilisateur non authentifié');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.put('http://localhost:4000/user/editpsw', {
        userId,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      });

      if (response.status === 200) {
        message.success('Mot de passe changé avec succès');
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error('Erreur lors du changement de mot de passe');
    }
  };

  return (
    <div className='password-container'>
      <h1>Changer mot de passe</h1>
      <Form form={form} layout="vertical" className='edit-password-form' onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Veuillez entrer votre ancien mot de passe' }]}
          >
            <Input.Password
              placeholder="Ancien Mot de passe"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Veuillez entrer votre nouveau mot de passe' }]}
          >
            <Input.Password
              placeholder="Nouveau Mot de passe"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Veuillez confirmer votre nouveau mot de passe' }]}
          >
            <Input.Password
              placeholder="Confirmer Mot de passe"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </Row>
        <Button type="primary" htmlType="submit">Sauvegarder</Button>
      </Form>
    </div>
  );
}

export default ModifierMdp;
