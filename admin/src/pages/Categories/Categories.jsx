import React, { useEffect, useState,useContext } from "react";
import { Table, Space, message, Tag, Modal, Form, Input, Button } from "antd";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationPopup from "../../components/ConfirmationPopUp";
import "./Categories.css"; // Add custom styles if needed
import { AuthContext } from "../../context/AuthContext";


const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const { userId } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
        setCategories(
          response.data.map((category) => ({
            ...category,
            key: category._id,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [categories]);

  const openAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({ name: category.categoryName });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleSaveCategory = async (values) => {
    try {
      if (editingCategory) {
        const response = await axios.put(
          `http://localhost:4000/categories/update/${editingCategory._id}`,{
          ...values,
          userId,
        }
        );
        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id ? response.data : category
          )
        );
        message.success("Category updated successfully!");
      } else {
        const response = await axios.post("http://localhost:4000/categories/add",{...values,userId});
        setCategories([...categories, response.data]);
        message.success("Category added successfully!");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
      message.error("Failed to save category");
    }
  };

  const handleDelete = (record) => {
    setIsDeleteModalVisible(true);
    setCategoryIdToDelete(record._id);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setCategoryIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/categories/delete/${categoryIdToDelete}`);
      setCategories(categories.filter((category) => category._id !== categoryIdToDelete));
      message.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category");
    }
    setIsDeleteModalVisible(false);
    setCategoryIdToDelete(null);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      render: (text) => <Tag color="blue">{text}</Tag>,
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
    <div className="categories-container">
      {/* Confirmation Popup for Deletion */}
      <ConfirmationPopup
        visible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this category?"
      />

      {/* Add/Edit Category Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText={editingCategory ? "Save" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCategory}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter the category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Header with Add Button */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2>Liste des categories</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Add Category
        </Button>
      </div>

      {/* Category Table */}
      <Table columns={columns} dataSource={categories} rowKey="_id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default ListCategories;
