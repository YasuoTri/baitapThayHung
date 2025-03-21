import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UserForm = ({ show, onHide, user, fetchUsers, apiUrl }) => {
  const [formData, setFormData] = useState({
    id: user?.id || "", // ID được lưu lại để khi sửa không thay đổi
    mssv: user?.mssv || "",
    hoten: user?.hoten || "",
    hinhanh: user?.hinhanh || "",
    lop: user?.lop || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // Cập nhật thông tin người dùng
        await axios.put(`${apiUrl}/${user.id}`, formData);
      } else {
        // Thêm người dùng mới
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
          {/* Nếu là sửa, hiển thị ID */}
          {user && (
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={formData.id}
                readOnly // ID không được chỉnh sửa trong khi sửa
              />
            </Form.Group>
          )}

          {/* Trường MSSV */}
          <Form.Group className="mb-3">
            <Form.Label>MSSV</Form.Label>
            <Form.Control
              type="text"
              value={formData.mssv}
              onChange={(e) =>
                setFormData({ ...formData, mssv: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* Trường Tên */}
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              value={formData.hoten}
              onChange={(e) =>
                setFormData({ ...formData, hoten: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* Trường Hình ảnh */}
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="text"
              value={formData.hinhanh}
              onChange={(e) =>
                setFormData({ ...formData, hinhanh: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* Trường Lớp */}
          <Form.Group className="mb-3">
            <Form.Label>Lớp</Form.Label>
            <Form.Control
              type="text"
              value={formData.lop}
              onChange={(e) =>
                setFormData({ ...formData, lop: e.target.value })
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
