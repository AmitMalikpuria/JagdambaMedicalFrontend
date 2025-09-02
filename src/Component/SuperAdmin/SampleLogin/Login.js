import React, { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                       Jagdamba Medical Store
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Please sign in to your account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white py-8 px-4 sm:px-8 shadow-xl rounded-2xl border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Username Field */}
                        <div className="relative">
                            <label
                                htmlFor="username"
                                className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none ${focusedField === 'username' || formData.username
                                    ? 'top-2 text-xs text-indigo-600 bg-white px-1 -translate-y-1/2'
                                    : 'top-1/2 text-gray-500 -translate-y-1/2'
                                    }`}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('username')}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-3 sm:py-4 border rounded-lg text-gray-900 placeholder-transparent focus:outline-none transition-all duration-300 ease-in-out ${focusedField === 'username'
                                    ? 'border-indigo-500 shadow-lg ring-4 ring-indigo-100 bg-indigo-50/30'
                                    : formData.username
                                        ? 'border-gray-300 bg-gray-50/50'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                placeholder="Username"
                            />
                            <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform transition-all duration-300 ease-in-out ${focusedField === 'username' ? 'scale-x-100' : 'scale-x-0'
                                }`}></div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none ${focusedField === 'password' || formData.password
                                    ? 'top-2 text-xs text-indigo-600 bg-white px-1 -translate-y-1/2'
                                    : 'top-1/2 text-gray-500 -translate-y-1/2'
                                    }`}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-3 sm:py-4 border rounded-lg text-gray-900 placeholder-transparent focus:outline-none transition-all duration-300 ease-in-out pr-12 ${focusedField === 'password'
                                    ? 'border-indigo-500 shadow-lg ring-4 ring-indigo-100 bg-indigo-50/30'
                                    : formData.password
                                        ? 'border-gray-300 bg-gray-50/50'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                placeholder="Password"
                            />

                            {/* Password Toggle Button */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9.05 9.05m.828.828A3 3 0 0112 9a3 3 0 013 3m-3-3a3 3 0 00-3 3m3-3a3 3 0 013 3M9 12a3 3 0 003 3m-3-3a3 3 0 003-3" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>

                            <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform transition-all duration-300 ease-in-out ${focusedField === 'password' ? 'scale-x-100' : 'scale-x-0'
                                }`}></div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {/* <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200 font-medium">
                                Forgot password?
                            </a>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 sm:py-4 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in to your account
                        </button>

                       

                       
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;