import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onHide, onDelete, user }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa Người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn chắc chắn muốn xóa người dùng <strong>{user?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;