import React, { useState, useEffect } from 'react';

const Dashboard4 = () => {
  // State Management
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // CRUD State
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' }
  ]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', role: 'User', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Navigation
  const toggleSubmenu = (menu) => {
    setSubmenuOpen(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  // CRUD Operations
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...formData, id: editingUser.id } : user));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', email: '', role: 'User', status: 'Active' });
    setShowModal(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Mobile Sidebar Overlay */}
        {isMobile && !sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 z-50 h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg`}>
          
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">AdminPro</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              
              {/* Dashboard */}
              <li>
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === 'dashboard' 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
                </button>
              </li>

              {/* Analytics */}
              <li>
                <button
                  onClick={() => setActiveMenu('analytics')}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === 'analytics' 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span className="ml-3">Analytics</span>}
                </button>
              </li>

              {/* User Management */}
              <li>
                <button
                  onClick={() => {
                    if (!sidebarCollapsed) toggleSubmenu('users');
                    setActiveMenu('users');
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === 'users' 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {!sidebarCollapsed && <span className="ml-3">Users</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${
                      submenuOpen.users ? 'rotate-90' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                
                {/* Submenu */}
                {submenuOpen.users && !sidebarCollapsed && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveMenu('users')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        All Users
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveMenu('roles')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
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
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === 'settings' 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {!sidebarCollapsed && <span className="ml-3">Settings</span>}
                </button>
              </li>

              {/* Activity Feed */}
              <li>
                <button
                  onClick={() => setActiveMenu('activity')}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeMenu === 'activity' 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {!sidebarCollapsed && <span className="ml-3">Activity</span>}
                </button>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => alert('Logging out...')}
              className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
              </svg>
              {!sidebarCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} ${isMobile ? 'ml-0' : ''}`}>
          
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              
              {/* Left Side */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 17h5l-5 5v-5zM10.97 4.757l-.022.006-.006.022-.617.187a.75.75 0 01-.22-1.483l.617-.187c.6-.181 1.21.314 1.21.937 0 .423-.275.79-.657.937l-.305.092z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 17h5l-5 5v-5z" />
                    </svg>
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com just signed up</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Server maintenance scheduled</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance window: 2:00 AM - 4:00 AM</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</p>
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-500">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">AD</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-2">
                        <button
                          onClick={() => setActiveMenu('profile')}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </button>
                        <button
                          onClick={() => setActiveMenu('settings')}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </button>
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={() => alert('Logging out...')}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            
            {/* Dashboard Content */}
            {activeMenu === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
                  <p className="text-indigo-100">Here's what's happening with your dashboard today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">+12% from last month</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">$12,345</p>
                        <p className="text-sm text-green-600 dark:text-green-400">+8% from last month</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
                        <p className="text-sm text-red-600 dark:text-red-400">-5% from last month</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">23%</p>
                        <p className="text-sm text-green-600 dark:text-green-400">+2% from last month</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Chart placeholder - Integrate with Chart.js or Recharts</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Activity</h3>
                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Chart placeholder - Integrate with Chart.js or Recharts</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com joined the platform</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">2m ago</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Order completed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Order #12345 has been processed successfully</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">1h ago</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">System maintenance</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Scheduled maintenance completed successfully</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">3h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeMenu === 'users' && (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your application users</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setFormData({ id: '', name: '', email: '', role: 'User', status: 'Active' });
                      setShowModal(true);
                    }}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add User
                  </button>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      All Users ({filteredUsers.length})
                    </h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                  <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'Admin' 
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : user.role === 'Moderator'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.status === 'Active' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors duration-200"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-200"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeMenu === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400">Track your application performance</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                    <div className="h-80 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Advanced Analytics Chart</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Peak Hours</p>
                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">2:00 PM - 4:00 PM</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Conversion Rate</p>
                        <p className="text-lg font-semibold text-green-900 dark:text-green-100">24.5%</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Avg. Session</p>
                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">4m 32s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeMenu === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage your application settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Application Name
                        </label>
                        <input
                          type="text"
                          defaultValue="AdminPro Dashboard"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          defaultValue="admin@adminpro.com"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Timezone
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option>UTC</option>
                          <option>EST</option>
                          <option>PST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Push Notifications</span>
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">SMS Notifications</span>
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* Activity Feed */}
            {activeMenu === 'activity' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Feed</h1>
                  <p className="text-gray-600 dark:text-gray-400">Recent system activities and user actions</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">User Registration</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">New user john.doe@example.com has registered</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Data Export</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">User data exported successfully</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">System Alert</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">High CPU usage detected on server</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile */}
            {activeMenu === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AD</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Admin User</h3>
                      <p className="text-gray-600 dark:text-gray-400">admin@example.com</p>
                      <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-500 mt-1">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Admin"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="User"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="System administrator with 5+ years of experience in managing enterprise applications."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Modal for User CRUD */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter user name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {editingUser ? 'Update' : 'Create'} User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Alert Messages */}
        <div className="fixed top-4 right-4 z-50">
          {/* Success Alert */}
          <div className="hidden bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                Operation completed successfully!
              </p>
            </div>
          </div>

          {/* Error Alert */}
          <div className="hidden bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                Something went wrong. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard4;
