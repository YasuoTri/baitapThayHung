import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container, Alert } from 'react-bootstrap';
import UserForm from './components/UserForm';
import DeleteModal from './components/DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://67da316335c87309f52b5619.mockapi.io/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');

  // Fetch users từ API
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      setError('Không thể tải dữ liệu người dùng');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý CRUD
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
      setShowDeleteModal(false);
    } catch (err) {
      setError('Xóa thất bại');
    }
  };

  return (
    <Container className="mt-4">
      <h1>Quản lý Người dùng</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button onClick={() => setShowForm(true)} className="mb-3">
        Thêm Người dùng
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>MSSV</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.mssv}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowForm(true);
                  }}
                  className="me-2"
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UserForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        fetchUsers={fetchUsers}
        apiUrl={API_URL}
      />

      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={() => handleDelete(selectedUser?.id)}
        user={selectedUser}
      />
    </Container>
  );
}

export default App;