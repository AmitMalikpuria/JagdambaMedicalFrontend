import React, { useState, useEffect } from 'react';

const Dashboard3 = () => {
    // Theme and UI State
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [submenuOpen, setSubmenuOpen] = useState({});

    // Notifications and Modals
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showModal, setShowModal] = useState(null);
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'success', message: 'User successfully created', timestamp: new Date() },
        { id: 2, type: 'warning', message: 'System maintenance scheduled', timestamp: new Date() }
    ]);

    // CRUD State
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', avatar: 'JS' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'editor', status: 'inactive', avatar: 'MJ' }
    ]);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', role: 'user' });
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Activities Feed
    const [activities, setActivities] = useState([
        { id: 1, user: 'John Doe', action: 'logged in', timestamp: '2 minutes ago', type: 'login' },
        { id: 2, user: 'Jane Smith', action: 'updated profile', timestamp: '1 hour ago', type: 'update' },
        { id: 3, user: 'Mike Johnson', action: 'created new post', timestamp: '3 hours ago', type: 'create' }
    ]);

    // Dashboard Stats
    const [stats, setStats] = useState({
        totalUsers: 1247,
        activeUsers: 892,
        revenue: 45670,
        orders: 156
    });

    // Responsive handler
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Theme toggle
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Navigation handlers
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleSubmenu = (menu) => {
        setSubmenuOpen(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    // CRUD handlers
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
            setEditingUser(null);
        } else {
            const newUser = { ...formData, id: Date.now(), status: 'active', avatar: formData.name.slice(0, 2).toUpperCase() };
            setUsers([...users, newUser]);
        }
        setFormData({ id: '', name: '', email: '', role: 'user' });
        setShowModal(null);
        addAlert('success', `User ${editingUser ? 'updated' : 'created'} successfully`);
    };

    const handleEdit = (user) => {
        setFormData(user);
        setEditingUser(user);
        setShowModal('userForm');
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
        setShowModal(null);
        addAlert('success', 'User deleted successfully');
    };

    const addAlert = (type, message) => {
        const newAlert = { id: Date.now(), type, message, timestamp: new Date() };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, 5000);
    };

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const themeClass = darkMode ? 'dark' : '';

    return (
        <div className={`${themeClass} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
            {/* Mobile Sidebar Overlay */}
            {isMobile && sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
            )}

            {/* Sidebar */}
            <div className={`${isMobile ? 'fixed left-0 top-0 h-full z-50' : 'relative'
                } ${sidebarOpen ? 'w-64' : 'w-16'} ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
                } bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 flex flex-col`}>

                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className={`font-bold text-xl text-gray-800 dark:text-white transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        {sidebarOpen && 'AdminPro'}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {/* Dashboard */}
                        <li>
                            <button
                                onClick={() => setActiveMenu('dashboard')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group ${activeMenu === 'dashboard'
                                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        Dashboard
                                    </div>
                                )}
                            </button>
                        </li>

                        {/* Analytics */}
                        <li>
                            <button
                                onClick={() => setActiveMenu('analytics')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group ${activeMenu === 'analytics'
                                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Analytics</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        Analytics
                                    </div>
                                )}
                            </button>
                        </li>

                        {/* Users Management */}
                        <li>
                            <button
                                onClick={() => {
                                    setActiveMenu('users');
                                    toggleSubmenu('users');
                                }}
                                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group ${activeMenu === 'users'
                                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                {sidebarOpen && (
                                    <>
                                        <span className="ml-3 font-medium">Users</span>
                                        <svg className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${submenuOpen.users ? 'rotate-90' : ''
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        Users
                                    </div>
                                )}
                            </button>

                            {/* Users Submenu */}
                            {submenuOpen.users && sidebarOpen && (
                                <ul className="ml-8 mt-2 space-y-1">
                                    <li>
                                        <button
                                            onClick={() => setActiveMenu('users-list')}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${activeMenu === 'users-list'
                                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            All Users
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveMenu('users-roles')}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${activeMenu === 'users-roles'
                                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            Roles & Permissions
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Settings */}
                        <li>
                            <button
                                onClick={() => setActiveMenu('settings')}
                                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group ${activeMenu === 'settings'
                                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {sidebarOpen && <span className="ml-3 font-medium">Settings</span>}
                                {!sidebarOpen && (
                                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        Settings
                                    </div>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setShowModal('logout')}
                        className="flex items-center w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-screen ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-16'} ${isMobile ? 'ml-0' : ''} transition-all duration-300`}>

                {/* Top Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center max-w-md">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a3.5 3.5 0 01-1.5-2.8V10a6 6 0 10-12 0v.7c0 1-.4 2-1.1 2.7L2 17h13z" />
                                </svg>
                                {alerts.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {alerts.length}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {alerts.length === 0 ? (
                                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                                No notifications
                                            </div>
                                        ) : (
                                            alerts.map((alert) => (
                                                <div key={alert.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                                    <div className={`flex items-start space-x-3 ${alert.type === 'success' ? 'text-green-600' :
                                                        alert.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                                        }`}>
                                                        <div className={`w-2 h-2 rounded-full mt-2 ${alert.type === 'success' ? 'bg-green-500' :
                                                            alert.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}></div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {alert.timestamp.toLocaleTimeString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    AD
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* User Menu Dropdown */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="p-2">
                                        <button
                                            onClick={() => setActiveMenu('profile')}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => setActiveMenu('settings')}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </button>
                                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                        <button
                                            onClick={() => setShowModal('logout')}
                                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-150"
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {/* Dashboard Content */}
                    {activeMenu === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Page Header */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
                                </div>
                                <div className="mt-4 lg:mt-0 flex space-x-3">
                                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        Export Data
                                    </button>
                                    <button
                                        onClick={() => setShowModal('userForm')}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        Add User
                                    </button>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Total Users */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                +12% from last month
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Users */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers.toLocaleString()}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                +8% from last week
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Revenue */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                                            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.revenue.toLocaleString()}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                +23% from last month
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Orders */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Orders</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.orders}</p>
                                            <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                                </svg>
                                                -3% from yesterday
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts and Activities */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Chart Area */}
                                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Overview</h3>
                                        <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                                            <option>Last 7 days</option>
                                            <option>Last 30 days</option>
                                            <option>Last 90 days</option>
                                        </select>
                                    </div>

                                    {/* Placeholder Chart */}
                                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            <p className="text-gray-500 dark:text-gray-400">Interactive Chart</p>
                                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Integrate with Chart.js or similar</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activities */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h3>
                                    <div className="space-y-4">
                                        {activities.map((activity) => (
                                            <div key={activity.id} className="flex items-start space-x-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'login' ? 'bg-green-500' :
                                                    activity.type === 'update' ? 'bg-blue-500' : 'bg-purple-500'
                                                    }`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-900 dark:text-white">
                                                        <span className="font-medium">{activity.user}</span> {activity.action}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-4 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors duration-200">
                                        View All Activities
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users List Content */}
                    {(activeMenu === 'users' || activeMenu === 'users-list') && (
                        <div className="space-y-6">
                            {/* Page Header */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your users and their permissions.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setFormData({ id: '', name: '', email: '', role: 'user' });
                                        setEditingUser(null);
                                        setShowModal('userForm');
                                    }}
                                    className="mt-4 lg:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add User
                                </button>
                            </div>

                            {/* Users Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Users ({filteredUsers.length})</h3>
                                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                                            <div className="relative">
                                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    placeholder="Search users..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                        </svg>
                                                        <p className="mt-2">No users found</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                                    {user.avatar}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden sm:table-cell">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${user.role === 'admin' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' :
                                                                user.role === 'editor' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                                                                    'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                                                                }`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 hidden md:table-cell">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${user.status === 'active' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                                                                'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400'
                                                                }`}>
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() => handleEdit(user)}
                                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => setShowModal(`delete-${user.id}`)}
                                                                    className="inline-flex items-center px-3 py-1 border border-red-300 dark:border-red-600 rounded-md text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
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

                    {/* Analytics Content */}
                    {activeMenu === 'analytics' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Detailed insights and performance metrics.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
                                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400">Line Chart Placeholder</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Distribution</h3>
                                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400">Pie Chart Placeholder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Content */}
                    {activeMenu === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your application settings and preferences.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">General Settings</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Site Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="AdminPro"
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Admin Email
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue="admin@example.com"
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                                            Save Settings
                                        </button>
                                    </form>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <button className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
                                            Change Password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Content */}
                    {activeMenu === 'profile' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information and preferences.</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                                        AD
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Admin User</h3>
                                        <p className="text-gray-600 dark:text-gray-400">admin@example.com</p>
                                        <button className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">
                                            Change Avatar
                                        </button>
                                    </div>
                                </div>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Admin"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="User"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="admin@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            rows="4"
                                            defaultValue="System administrator with 5+ years of experience managing enterprise applications."
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Modals */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    {/* User Form Modal */}
                    {showModal === 'userForm' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {editingUser ? 'Edit User' : 'Add New User'}
                                </h3>
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="user">User</option>
                                        <option value="editor">Editor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(null)}
                                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                                    >
                                        {editingUser ? 'Update' : 'Create'} User
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showModal && showModal.startsWith('delete-') && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete User</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">This action cannot be undone.</p>
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Are you sure you want to delete this user? All data associated with this user will be permanently removed.
                            </p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(parseInt(showModal.split('-')[1]))}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Logout Confirmation Modal */}
                    {showModal === 'logout' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Logout</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">You will be signed out of your account.</p>
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Are you sure you want to logout? You will need to sign in again to access your dashboard.
                            </p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(null);
                                        alert('Logged out successfully!');
                                    }}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Alert Notifications */}
            <div className="fixed top-4 right-4 space-y-2 z-40">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ${alert.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                            alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                                'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                            }`}
                    >
                        <div className={`flex-shrink-0 ${alert.type === 'success' ? 'text-green-600 dark:text-green-400' :
                            alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                            }`}>
                            {alert.type === 'success' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : alert.type === 'warning' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className={`text-sm font-medium ${alert.type === 'success' ? 'text-green-800 dark:text-green-200' :
                                alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                                    'text-red-800 dark:text-red-200'
                                }`}>
                                {alert.message}
                            </p>
                        </div>
                        <button
                            onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                            className={`ml-3 flex-shrink-0 ${alert.type === 'success' ? 'text-green-600 dark:text-green-400 hover:text-green-500' :
                                alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-500' :
                                    'text-red-600 dark:text-red-400 hover:text-red-500'
                                } transition-colors duration-200`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard3;
