import React, { useState } from 'react';

const Dashboard2 = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [submenuOpen, setSubmenuOpen] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // CRUD State
    const [formData, setFormData] = useState({ id: '', name: '', email: '', role: 'user' });
    const [records, setRecords] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
    ]);
    const [editId, setEditId] = useState(null);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sidebar controls
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (isMobile) setSidebarOpen(false);

        if (submenuOpen === menu) {
            setSubmenuOpen('');
        } else {
            setSubmenuOpen(menu);
        }
    };

    // CRUD Operations
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResetForm = () => {
        setFormData({ id: '', name: '', email: '', role: 'user' });
        setEditId(null);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editId !== null) {
            const updatedRecords = records.map(record =>
                record.id === editId ? { ...record, ...formData } : record
            );
            setRecords(updatedRecords);
        } else {
            const newRecord = { ...formData, id: Date.now().toString() };
            setRecords([...records, newRecord]);
        }
        handleResetForm();
    };

    const handleEditRecord = (id) => {
        const record = records.find(r => r.id === id);
        if (record) {
            setFormData(record);
            setEditId(id);
        }
    };

    const handleDeleteRecord = (id) => {
        const updatedRecords = records.filter(r => r.id !== id);
        setRecords(updatedRecords);
        if (editId === id) handleResetForm();
    };

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`${isMobile
                    ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`
                    : 'relative'
                } ${sidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-br from-indigo-800 to-purple-800 text-white flex flex-col transition-all duration-300 shadow-2xl`}>

                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-indigo-600">
                    <div className={`font-bold text-xl transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        {sidebarOpen && 'Dashboard'}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-3">

                        {/* Dashboard */}
                        <li>
                            <button
                                onClick={() => handleMenuClick('dashboard')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200 group ${activeMenu === 'dashboard' ? 'bg-indigo-900 shadow-lg' : ''
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4M16 5v4" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        Dashboard
                                    </div>
                                )}
                            </button>
                        </li>

                        {/* Users Management */}
                        <li>
                            <button
                                onClick={() => handleMenuClick('management')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200 group ${activeMenu === 'management' ? 'bg-indigo-900 shadow-lg' : ''
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                {sidebarOpen && (
                                    <>
                                        <span className="ml-3 font-medium">Management</span>
                                        <svg className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${submenuOpen === 'management' ? 'rotate-90' : ''
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        Management
                                    </div>
                                )}
                            </button>

                            {/* Submenu */}
                            {submenuOpen === 'management' && sidebarOpen && (
                                <ul className="ml-4 mt-2 space-y-1">
                                    <li>
                                        <button
                                            onClick={() => setActiveMenu('users')}
                                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors duration-200 ${activeMenu === 'users' ? 'bg-indigo-600' : ''
                                                }`}
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Users CRUD
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveMenu('settings')}
                                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors duration-200 ${activeMenu === 'settings' ? 'bg-indigo-600' : ''
                                                }`}
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Analytics */}
                        <li>
                            <button
                                onClick={() => handleMenuClick('analytics')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200 group ${activeMenu === 'analytics' ? 'bg-indigo-900 shadow-lg' : ''
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Analytics</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        Analytics
                                    </div>
                                )}
                            </button>
                        </li>

                        {/* Reset Password */}
                        <li>
                            <button
                                onClick={() => handleMenuClick('resetPassword')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200 group ${activeMenu === 'resetPassword' ? 'bg-indigo-900 shadow-lg' : ''
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m2-2h-7m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-1" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Reset Password</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                        Reset Password
                                    </div>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-3 border-t border-indigo-600">
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to logout?')) {
                                alert('Logged out successfully');
                            }
                        }}
                        className="flex items-center w-full px-3 py-3 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none transition-all duration-200 group"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                        {!sidebarOpen && (
                            <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                Logout
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-0">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            {isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            )}
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">
                                {activeMenu === 'users' ? 'User Management' : activeMenu}
                            </h1>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-700">John Doe</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {/* Dashboard Content */}
                    {activeMenu === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600">Total Users</p>
                                            <p className="text-2xl font-bold text-gray-900">{records.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600">Active</p>
                                            <p className="text-2xl font-bold text-gray-900">2</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600">Pending</p>
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600">Blocked</p>
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <p className="text-gray-600">New user registered: jane@example.com</p>
                                        <span className="text-sm text-gray-400 ml-auto">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <p className="text-gray-600">User profile updated: john@example.com</p>
                                        <span className="text-sm text-gray-400 ml-auto">4 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users CRUD Content */}
                    {activeMenu === 'users' && (
                        <div className="space-y-6">
                            {/* CRUD Form */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    {editId ? 'Edit User' : 'Add New User'}
                                </h2>

                                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter email address"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                                Role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="moderator">Moderator</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            type="submit"
                                            className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                                        >
                                            {editId ? 'Update User' : 'Add User'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleResetForm}
                                            className="flex-1 sm:flex-none px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                        >
                                            Reset Form
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Users List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Users List ({records.length})</h3>
                                </div>

                                {records.length === 0 ? (
                                    <div className="p-6 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                        <p className="mt-2 text-gray-500">No users found. Add some users to get started.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {records.map((record) => (
                                                    <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{record.name}</div>
                                                                <div className="text-sm text-gray-500">{record.email}</div>
                                                                <div className="text-xs text-gray-400 sm:hidden mt-1">
                                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${record.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                                            record.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                                                                                'bg-green-100 text-green-800'
                                                                        }`}>
                                                                        {record.role}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden sm:table-cell">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${record.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                                    record.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'
                                                                }`}>
                                                                {record.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() => handleEditRecord(record.id)}
                                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                                                >
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        if (window.confirm(`Are you sure you want to delete ${record.name}?`)) {
                                                                            handleDeleteRecord(record.id);
                                                                        }
                                                                    }}
                                                                    className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                                                                >
                                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Settings Content */}
                    {activeMenu === 'settings' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Dashboard App"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="admin@dashboard.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Analytics Content */}
                    {activeMenu === 'analytics' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                                    <div className="h-64 flex items-center justify-center text-gray-500">
                                        <p>Chart placeholder - integrate with your preferred chart library</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
                                    <div className="h-64 flex items-center justify-center text-gray-500">
                                        <p>Chart placeholder - integrate with your preferred chart library</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reset Password Content */}
                    {activeMenu === 'resetPassword' && (
                        <div className="max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard2;
