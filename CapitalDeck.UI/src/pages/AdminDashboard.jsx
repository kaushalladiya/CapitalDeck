import React, { useEffect, useState } from 'react';
import { Users, Database, Activity, Trash2, Search, ShieldAlert } from 'lucide-react';
import AdminService from '../api/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalTransactions: 0, systemStatus: 'Checking...' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // LOAD REAL DATA
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const statsData = await AdminService.getStats();
      const usersData = await AdminService.getAllUsers();
      setStats(statsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Admin Access Denied", error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER ACTION
  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete User ID: ${userId}? This cannot be undone.`)) {
      try {
        await AdminService.deleteUser(userId);
        fetchAdminData(); // Refresh list
        alert("User deleted successfully.");
      } catch (error) {
        alert("Failed to delete user.");
      }
    }
  };

  // FILTER USERS
  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl text-white shadow-lg flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold flex items-center">
             <ShieldAlert className="mr-3 text-red-500" /> CapitalDeck Admin Portal
           </h1>
           <p className="text-gray-400 text-sm mt-1">System Management & User Moderation</p>
        </div>
        <div className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-xs font-bold border border-green-500/50">
           STATUS: {stats.systemStatus}
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Total Users</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={24}/></div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Total Transactions</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTransactions}</h3>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Database size={24}/></div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Server Uptime</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">99.9%</h3>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Activity size={24}/></div>
           </div>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <h3 className="text-lg font-bold text-gray-900">User Database</h3>
           
           {/* SEARCH BAR */}
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                 type="text" placeholder="Search users..." 
                 className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <table className="w-full text-left">
           <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                 <th className="px-6 py-4">ID</th>
                 <th className="px-6 py-4">User Details</th>
                 <th className="px-6 py-4">Role</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                 <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">#{user.id}</td>
                    <td className="px-6 py-4">
                       <div className="font-bold text-gray-900">{user.fullName}</div>
                       <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                          {user.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       {user.role !== 'ROLE_ADMIN' && (
                          <button 
                             onClick={() => handleDeleteUser(user.id)}
                             className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                             title="Delete User"
                          >
                             <Trash2 size={18} />
                          </button>
                       )}
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
        {filteredUsers.length === 0 && <div className="p-8 text-center text-gray-400">No users found.</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;