// src/pages/SettingsPage.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Lock, Bell, CreditCard, 
  ArrowRight, Upload, Save, Eye, EyeOff, ArrowLeft, Star 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const SettingsPage = ({ authToken, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionRef = useRef(null);

  // Get context from dashboard (e.g., "Global Certificates")
  const upgradeFrom = location.state?.upgradeFrom || null;

  // Map locked features to recommended tiers
  const getRecommendedTier = (feature, role) => {
    const recommendations = {
      student: {
        'Career Analytics': 'Pro Student',
        'Global Certificates': 'Career+'
      },
      startup: {
        'Tailored Matching': 'Scale Faster',
        'Project Management': 'Scale Faster',
        'Investor Discovery': 'Pro Founder'
      },
      business: {
        'Internship Pipeline': 'Talent+',
        'Mentor Analytics': 'Talent+',
        'Global Access': 'Talent+'
      },
      investor: {
        'Portfolio Tracking': 'Explorer',
        'Investment Analytics': 'Explorer',
        'Exclusive Pitches': 'Pro Investor'
      }
    };
    return recommendations[role]?.[feature] || null;
  };

  const recommendedTier = upgradeFrom ? getRecommendedTier(upgradeFrom, userRole) : null;

  // Auto-scroll to subscription if coming from upgrade
  useEffect(() => {
    if (upgradeFrom && subscriptionRef.current) {
      subscriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [upgradeFrom]);

  // === State Management ===
  const [accountSettings, setAccountSettings] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    profilePicture: null,
    profilePicturePreview: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState({
    emailMatches: true,
    emailMessages: true,
    emailProjectUpdates: true,
    emailInvestment: userRole === 'investor',
    smsMatches: false,
    smsMessages: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // === Mock Data Fetch (Replace with real API later) ===
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // TODO: Replace with real API call
        const mockUserData = {
          fullName: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '+1 (555) 123-4567',
          city: 'New York',
          country: 'United States',
          profilePicture: null,
          tier: 'Free'
        };
        setAccountSettings({
          fullName: mockUserData.fullName,
          email: mockUserData.email,
          phoneNumber: mockUserData.phoneNumber,
          city: mockUserData.city,
          country: mockUserData.country,
          profilePicture: null,
          profilePicturePreview: mockUserData.profilePicture
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setMessage({ type: 'error', text: 'Failed to load settings' });
        setLoading(false);
      }
    };
    fetchUserData();
  }, [authToken]);

  // === Handlers ===
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAccountSettings(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setAccountSettings(prev => ({ ...prev, profilePicturePreview: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountChange = (field, value) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      // TODO: Real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Account settings saved successfully!' });
    } catch (error) {
      console.error('Save account error:', error);
      setMessage({ type: 'error', text: 'Failed to save account settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setSaving(false);
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      setSaving(false);
      return;
    }
    try {
      // TODO: Real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Change password error:', error);
      setMessage({ type: 'error', text: 'Failed to change password' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      // TODO: Real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Notification preferences saved!' });
    } catch (error) {
      console.error('Save notifications error:', error);
      setMessage({ type: 'error', text: 'Failed to save notification preferences' });
    } finally {
      setSaving(false);
    }
  };

  // === Loading State ===
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
          
          {/* Upgrade Context Banner */}
          {upgradeFrom && (
            <div className="mt-3 p-3 bg-blue-100 text-blue-800 rounded-lg text-sm">
              🔑 You're here to unlock <strong>{upgradeFrom}</strong>. We recommend the plan below.
            </div>
          )}
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings (Account + Password) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Settings
              </h2>
              <form onSubmit={handleSaveAccount} className="space-y-4">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {accountSettings.profilePicturePreview ? (
                        <img 
                          src={accountSettings.profilePicturePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile Picture</p>
                    <p className="text-xs text-gray-500">JPG, PNG, or GIF (max 5MB)</p>
                  </div>
                </div>
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={accountSettings.fullName}
                        onChange={(e) => handleAccountChange('fullName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={accountSettings.email}
                        onChange={(e) => handleAccountChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={accountSettings.phoneNumber}
                        onChange={(e) => handleAccountChange('phoneNumber', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={accountSettings.city}
                        onChange={(e) => handleAccountChange('city', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={accountSettings.country}
                        onChange={(e) => handleAccountChange('country', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                  <Save className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Change Password
              </h2>
              <form onSubmit={handleSavePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      minLength="8"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center disabled:opacity-50"
                >
                  {saving ? 'Changing...' : 'Change Password'}
                  <Lock className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Notifications & Subscription */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email - New Matches</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailMatches}
                      onChange={() => handleNotificationChange('emailMatches')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email - Messages</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailMessages}
                      onChange={() => handleNotificationChange('emailMessages')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email - Project Updates</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailProjectUpdates}
                      onChange={() => handleNotificationChange('emailProjectUpdates')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {userRole === 'investor' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email - Investment Opportunities</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailInvestment}
                        onChange={() => handleNotificationChange('emailInvestment')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">SMS Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.smsMatches}
                      onChange={() => handleNotificationChange('smsMatches')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <button
                onClick={handleSaveNotifications}
                disabled={saving}
                className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

            {/* Subscription Section */}
            <div 
              ref={subscriptionRef} 
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-transparent"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Subscription
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800">Current Plan</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">
                    {accountSettings.tier || 'Free'}
                  </p>
                </div>

                {/* Recommended Tier Highlight */}
                {recommendedTier && (
                  <div className="border-2 border-yellow-400 rounded-lg p-4 bg-yellow-50">
                    <p className="text-sm font-bold text-yellow-800 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Recommended for "{upgradeFrom}"
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{recommendedTier}</p>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center">
                  Upgrade Plan <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="w-full text-red-600 hover:text-red-800 font-medium text-sm">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;