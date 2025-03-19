import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UserForm = ({ show, onHide, user, fetchUsers, apiUrl }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mssv: user?.mssv || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.put(`${apiUrl}/${user.id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      fetchUsers();
      onHide();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Sửa Người dùng" : "Thêm Người dùng"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mssv</Form.Label>
            <Form.Control
              type="mssv"
              value={formData.mssv}
              onChange={(e) =>
                setFormData({ ...formData, mssv: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            {user ? "Lưu" : "Thêm"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
