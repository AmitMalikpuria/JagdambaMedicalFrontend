import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    // Sidebar and mobile menu state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState('dashboard');

    // CRUD Form state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
        status: 'active'
    });
    const [items, setItems] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' }
    ]);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Mobile responsiveness
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Menu items configuration
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', page: 'dashboard' },
        {
            id: 'users',
            label: 'User Management',
            icon: '👥',
            subItems: [
                { id: 'users-list', label: 'All Users', page: 'users-list' },
                { id: 'users-add', label: 'Add User', page: 'users-add' },
                { id: 'users-roles', label: 'User Roles', page: 'users-roles' }
            ]
        },
        {
            id: 'products',
            label: 'Products',
            icon: '📦',
            subItems: [
                { id: 'products-list', label: 'Product List', page: 'products-list' },
                { id: 'products-add', label: 'Add Product', page: 'products-add' },
                { id: 'products-categories', label: 'Categories', page: 'products-categories' }
            ]
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: '🛒',
            subItems: [
                { id: 'orders-all', label: 'All Orders', page: 'orders-all' },
                { id: 'orders-pending', label: 'Pending Orders', page: 'orders-pending' },
                { id: 'orders-completed', label: 'Completed Orders', page: 'orders-completed' }
            ]
        },
        { id: 'analytics', label: 'Analytics', icon: '📈', page: 'analytics' },
        { id: 'settings', label: 'Settings', icon: '⚙️', page: 'settings' },
        { id: 'support', label: 'Support', icon: '💬', page: 'support' }
    ];

    const toggleMenu = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setSidebarOpen(false);
    };

    // CRUD Operations
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', email: '', role: '', status: 'active' });
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) return;

        if (editingId) {
            setItems(items.map(item =>
                item.id === editingId
                    ? { ...formData, id: editingId }
                    : item
            ));
        } else {
            const newItem = {
                ...formData,
                id: Date.now().toString()
            };
            setItems([...items, newItem]);
        }
        resetForm();
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingId(item.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
            if (editingId === id) resetForm();
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>

                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-lg">D</span>
                        </div>
                        <h1 className="text-white font-bold text-lg hidden sm:block">Dashboard</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-white hover:text-gray-200 md:hidden focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            {item.subItems ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className="w-full flex items-center justify-between px-3 py-2.5 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-200 group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.id ? 'rotate-90' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Submenu */}
                                    <div className={`mt-2 ml-6 space-y-1 transition-all duration-300 ${activeMenu === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}>
                                        {item.subItems.map((subItem) => (
                                            <button
                                                key={subItem.id}
                                                onClick={() => handleNavClick(subItem.page)}
                                                className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${currentPage === subItem.page
                                                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                {subItem.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleNavClick(item.page)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${currentPage === item.page
                                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                                            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-gray-500 hover:text-gray-700 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
                                {currentPage.replace('-', ' ')}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {currentPage === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Dashboard Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Users', value: '2,543', change: '+12%', color: 'indigo' },
                                    { label: 'Revenue', value: '$45,210', change: '+8%', color: 'green' },
                                    { label: 'Orders', value: '1,234', change: '+23%', color: 'blue' },
                                    { label: 'Products', value: '456', change: '+5%', color: 'purple' }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                            </div>
                                            <div className={`text-sm font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}>
                                                {stat.change}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[
                                        { user: 'John Doe', action: 'created a new user', time: '2 minutes ago' },
                                        { user: 'Jane Smith', action: 'updated product inventory', time: '1 hour ago' },
                                        { user: 'Mike Johnson', action: 'processed an order', time: '3 hours ago' }
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium text-sm">{activity.user.charAt(0)}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900">
                                                    <span className="font-medium">{activity.user}</span> {activity.action}
                                                </p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {(currentPage === 'users-list' || currentPage === 'users-add') && (
                        <div className="space-y-6">
                            {/* CRUD Form */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    {editingId ? 'Edit User' : 'Add New User'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                                placeholder="Enter full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                                placeholder="Enter email address"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                                Role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                            >
                                                <option value="">Select a role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Manager">Manager</option>
                                                <option value="User">User</option>
                                                <option value="Guest">Guest</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                        >
                                            <span>{editingId ? 'Update User' : 'Add User'}</span>
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                                            >
                                                Cancel Edit
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Users List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Users List ({filteredItems.length})</h3>
                                        <div className="mt-4 sm:mt-0">
                                            <input
                                                type="text"
                                                placeholder="Search users..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredItems.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                        No users found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredItems.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white font-medium text-sm">
                                                                        {item.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                                    <div className="text-sm text-gray-500">{item.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                {item.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'active'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : item.status === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                }`}>
                                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() => handleEdit(item)}
                                                                    className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors duration-200"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors duration-200"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other Pages Placeholder */}
                    {!['dashboard', 'users-list', 'users-add'].includes(currentPage) && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🚧</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Page Under Construction</h3>
                            <p className="text-gray-600">
                                The <span className="font-medium capitalize">{currentPage.replace('-', ' ')}</span> page is coming soon!
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
