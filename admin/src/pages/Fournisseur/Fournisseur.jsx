import React, { useEffect, useState, useContext } from "react";
import { Table, Space, message, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../components/ConfirmationPopUp";
import { AuthContext } from "../../context/AuthContext";

const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [supplierIdToDelete, setSupplierIdToDelete] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null); // Track supplier being edited
  const { userId } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
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
        console.error("Error fetching suppliers:", error);
        message.error("Failed to load suppliers");
      }
    };

    fetchSuppliers();
  }, [suppliers]);

  // Handle modal visibility
  const openAddModal = () => {
    setEditingSupplier(null); // Reset editing state
    setIsModalVisible(true);
  };

  const openEditModal = (supplier) => {
    setEditingSupplier(supplier); // Set the supplier being edited
    form.setFieldsValue(supplier); // Populate form with existing data
    setIsModalVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    setEditingSupplier(null); // Reset editing state
    setIsModalVisible(false);
  };

  // Handle add/edit supplier
  const handleSaveSupplier = async (values) => {
    try {
      if (editingSupplier) {
        // Edit supplier
        const response = await axios.put(
          `http://localhost:4000/suppliers/update/${editingSupplier._id}`,
          values
        );
        setSuppliers(
          suppliers.map((supplier) =>
            supplier._id === editingSupplier._id ? response.data : supplier
          )
        );
        message.success("Supplier updated successfully");
      } else {
        // Add supplier
        const response = await axios.post("http://localhost:4000/suppliers/add", {
          ...values,
          userId,
        });
        setSuppliers([...suppliers, response.data]);
        message.success("Supplier added successfully");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving supplier:", error);
      message.error("Failed to save supplier");
    }
  };

  // Handle delete actions
  const handleDelete = (record) => {
    setIsDeleteModalVisible(true);
    setSupplierIdToDelete(record._id);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setSupplierIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/suppliers/delete/${supplierIdToDelete}`);
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierIdToDelete));
      message.success("Supplier deleted successfully");
    } catch (error) {
      message.error("Failed to delete supplier");
    }
    setIsDeleteModalVisible(false);
    setSupplierIdToDelete(null);
  };

  // Table columns definition
  const columns = [
    {
      title: "Fournisseur Name",
      dataIndex: "suppName",
      key: "suppName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "orange", fontSize: "20px" }}
            onClick={() => openEditModal(record)}
          />
          <DeleteOutlined
            style={{ color: "#f95454", fontSize: "20px" }}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Confirmation Popup for Deletion */}
      <ConfirmationPopup
        visible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Add/Edit Supplier Modal */}
      <Modal
        title={editingSupplier ? "Edit Supplier" : "Add Supplier"}
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText={editingSupplier ? "Save" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveSupplier}>
          <Form.Item
            name="suppName"
            label="Fournisseur Name"
            rules={[{ required: true, message: "Please enter the fournisseur name" }]}
          >
            <Input placeholder="Enter fournisseur name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ message: "Please enter the description" }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Header with Add Button */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2>Liste des fournisseurs</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Add Supplier
        </Button>
      </div>

      {/* Supplier Table */}
      <Table columns={columns} dataSource={suppliers} rowKey="_id" />
    </div>
  );
};

export default ListSuppliers;
