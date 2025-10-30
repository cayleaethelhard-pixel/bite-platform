// src/pages/AdminUsersPage.js
import React, { useState, useEffect } from 'react';
import { Users, Search, Edit3, Trash2, Shield, GraduationCap, Building, Briefcase, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const AdminUsersPage = ({ authToken }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [error, setError] = useState(null);

  // Mock user data (replace with real API call later)
  const mockUsers = [
    {
      id: 1,
      fullName: 'Alex Johnson',
      email: 'alex.johnson@stanford.edu',
      role: 'student',
      tier: 'Pro Student',
      status: 'active',
      createdAt: '2023-05-15'
    },
    {
      id: 2,
      fullName: 'Sarah Miller',
      email: 'sarah@techinnovations.com',
      role: 'startup',
      tier: 'Pro Founder',
      status: 'active',
      createdAt: '2023-06-01'
    },
    {
      id: 3,
      fullName: 'David Chen',
      email: 'david.chen@globalenterprises.com',
      role: 'business',
      tier: 'Talent+',
      status: 'active',
      createdAt: '2023-04-22'
    },
    {
      id: 4,
      fullName: 'Michael Rodriguez',
      email: 'michael@venturecapital.com',
      role: 'investor',
      tier: 'Pro Investor',
      status: 'active',
      createdAt: '2023-03-10'
    },
    {
      id: 5,
      fullName: 'Admin User',
      email: 'admin@biteplatform.com',
      role: 'admin',
      tier: 'Admin',
      status: 'active',
      createdAt: '2023-01-01'
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchUsers = async () => {
      try {
        // In real implementation:
        // const response = await fetch('/api/admin/users', {
        //   headers: { Authorization: `Bearer ${authToken}` }
        // });
        // const data = await response.json();
        // setUsers(data);
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authToken]);

  useEffect(() => {
    let result = users;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Apply tier filter
    if (tierFilter !== 'all') {
      result = result.filter(user => user.tier === tierFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, tierFilter, users]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'startup': return <Building className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'investor': return <DollarSign className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleEdit = (user) => {
    alert(`Edit user: ${user.fullName}`);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      // TODO: Call delete API
      setUsers(users.filter(u => u.id !== user.id));
      setFilteredUsers(filteredUsers.filter(u => u.id !== user.id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all platform users and their access</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="startup">Startups</option>
              <option value="business">Businesses</option>
              <option value="investor">Investors</option>
              <option value="admin">Admins</option>
            </select>
            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="Free">Free</option>
              <option value="Pro Student">Pro Student</option>
              <option value="Career+">Career+</option>
              <option value="Scale Faster">Scale Faster</option>
              <option value="Pro Founder">Pro Founder</option>
              <option value="Talent+">Talent+</option>
              <option value="Investor+">Investor+</option>
              <option value="Explorer">Explorer</option>
              <option value="Pro Investor">Pro Investor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.tier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;