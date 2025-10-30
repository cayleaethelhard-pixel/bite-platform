// src/pages/HomePage.js
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, CheckCircle, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import BiteLogo from '../images/BiteLogo.png';
import HomepageBackgroundVideo from '../videos/HomepageBackgroundVideo.mp4';

const HomePage = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.trim()) {
      alert('Please enter your email address.');
      return;
    }

    try {
      await api.forgotPassword(forgotPasswordEmail);
      // Always show generic success message (security best practice)
      alert('If your email is registered, you will receive a password reset link.');
      setIsForgotPassword(false);
      setForgotPasswordEmail(''); // Clear after submission
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={HomepageBackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for readability (optional but recommended) */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content (z-20 to appear above video + overlay) */}
      <div className="relative z-20">
        <header className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src={BiteLogo} alt="BITE Logo" className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
              <Link to="/features" className="text-white hover:text-blue-200">Features</Link>
              <Link to="/contact" className="text-white hover:text-blue-200">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-6">
            <img src={BiteLogo}
              alt="BITE Platform"
              className="mx-auto w-auto max-h-32 h-24 sm:h-28 md:h-32 drop-shadow-lg animate-fade-in" />
          </div>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
              Bridging Innovators, Talents, and Entrepreneurs
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Connect with students, startups, businesses, and investors in a seamless ecosystem for internships, projects, mentorship, and investment opportunities.
            </p>
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-2xl flex-1">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-blue-600" />
                </div>
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
                            type={showPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
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
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleForgotPassword}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Send Reset Link
                    </button>
                    <button
                      onClick={() => {
                        setIsForgotPassword(false);
                        setForgotPasswordEmail('');
                      }}
                      className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Back to Sign In
                    </button>
                  </>
                )}
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl flex-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
                <p className="text-gray-600 mb-6">Join our global community of innovators and talents</p>
                <Link
                  to="/role-selection"
                  className="w-full bg-gradient-to-r from-green-600 to-green-600 text-white py-3 rounded-lg hover:from-orange-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
                <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                  <h3 className="flex items-0 font-semibold text-gray-900 mb-4">Why Join BITE?</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      AI-powered intelligent matching
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Real-time messaging system
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Advanced search & filtering
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Compatibility scoring system
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;