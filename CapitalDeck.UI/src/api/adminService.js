import api from './axiosConfig';

const AdminService = {
  getStats: async () => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  }
};

export default AdminService;