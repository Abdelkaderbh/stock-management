import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmationPopup = ({ visible, onCancel, onConfirm, productId }) => {
  return (
    <Modal
      title="Delete Product"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="confirm" danger onClick={() => onConfirm(productId)}>
          Confirmer
        </Button>,
      ]}
    >
      <p>Êtes-vous sûr de vouloir supprimer ?</p>
    </Modal>
  );
};

export default ConfirmationPopup;
