"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const Login2 = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Jagdamba Medical Store</h2>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username Field with Animation */}
                        <div className="relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out
                    ${focusedField === 'username' || formData.username
                                            ? 'border-blue-500 ring-4 ring-blue-100 transform scale-105'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }
                    focus:outline-none bg-white text-gray-800 placeholder-gray-400`}
                                    placeholder="Enter your username"
                                    required
                                />

                                {/* Animated Icon */}
                                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300
                  ${focusedField === 'username' || formData.username
                                        ? 'text-blue-500 scale-110'
                                        : 'text-gray-400'
                                    } w-5 h-5`}
                                />

                                {/* Animated Label */}
                                <label className={`absolute left-12 transition-all duration-300 ease-in-out pointer-events-none
                  ${focusedField === 'username' || formData.username
                                        ? '-top-2 left-3 text-xs text-blue-500 bg-white px-2 font-medium'
                                        : 'top-1/2 transform -translate-y-1/2 text-gray-400'
                                    }`}>
                                    {focusedField === 'username' || formData.username ? 'Username' : ''}
                                </label>
                            </div>
                        </div>

                        {/* Password Field with Show/Hide Animation */}
                        <div className="relative">
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out
                    ${focusedField === 'password' || formData.password
                                            ? 'border-blue-500 ring-4 ring-blue-100 transform scale-105'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }
                    focus:outline-none bg-white text-gray-800 placeholder-gray-400`}
                                    placeholder="Enter your password"
                                    required
                                />

                                {/* Animated Lock Icon */}
                                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300
                  ${focusedField === 'password' || formData.password
                                        ? 'text-blue-500 scale-110'
                                        : 'text-gray-400'
                                    } w-5 h-5`}
                                />

                                {/* Animated Password Toggle Button */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 
                           focus:outline-none focus:text-blue-500 transition-all duration-200 hover:scale-110"
                                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                >
                                    {isPasswordVisible ? (
                                        <EyeOff className="w-5 h-5 animate-in fade-in duration-200" />
                                    ) : (
                                        <Eye className="w-5 h-5 animate-in fade-in duration-200" />
                                    )}
                                </button>

                                {/* Animated Label */}
                                <label className={`absolute left-12 transition-all duration-300 ease-in-out pointer-events-none
                  ${focusedField === 'password' || formData.password
                                        ? '-top-2 left-3 text-xs text-blue-500 bg-white px-2 font-medium'
                                        : 'top-1/2 transform -translate-y-1/2 text-gray-400'
                                    }`}>
                                    {focusedField === 'password' || formData.password ? 'Password' : ''}
                                </label>
                            </div>
                        </div>

                        {/* Submit Button with Animation */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg
                       font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200
                       hover:scale-105 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 
                       focus:ring-blue-300 active:scale-95"
                        >
                            Sign In
                        </button>

                        {/* Additional Links */}
                        <div className="text-center space-y-2">
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200">
                                Forgot your password?
                            </a>
                            <p className="text-gray-600 text-sm">
                                Don't have an account?
                                <a href="#" className="text-blue-500 hover:text-blue-700 ml-1 transition-colors duration-200">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login2;
