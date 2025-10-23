// src/pages/HomePage.js
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const HomePage = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await api.login(credentials);
      if (response.token) {
        // Pass login data to App.js via navigation state
        navigate('/login-success', { 
          state: { 
            token: response.token, 
            user: response.user 
          },
          replace: true
        });
      } else {
        alert('Login failed: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">BITE</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button className="text-white hover:text-blue-200 bg-transparent border-0 cursor-pointer">About</button>
            <button className="text-white hover:text-blue-200 bg-transparent border-0 cursor-pointer">Features</button>
            <button className="text-white hover:text-blue-200 bg-transparent border-0 cursor-pointer">Contact</button>
          </nav>
        </div>
      </header>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
            Bridging Innovators, Talents, and Entrepreneurs
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Connect with students, startups, businesses, and investors in a seamless ecosystem for internships, projects, mentorship, and investment opportunities.
          </p>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
              {!isForgotPassword ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLogin({ email: loginEmail, password: loginPassword })}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsForgotPassword(true)}
                    className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot Password?
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert('Password reset link sent to your email!');
                      setIsForgotPassword(false);
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Send Reset Link
                  </button>
                  <button
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Back to Sign In
                  </button>
                </>
              )}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
              <p className="text-gray-600 mb-6">Join our global community of innovators and talents</p>
              <Link
                to="/role-selection"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <p className="text-xs text-gray-500 mt-4 text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;