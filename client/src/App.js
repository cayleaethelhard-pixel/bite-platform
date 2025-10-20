import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle, Star, TrendingUp, Users, Briefcase, GraduationCap, Building, DollarSign, Video, MessageSquare, Search, Settings, Bell, Menu, Globe } from 'lucide-react';
import { api } from './services/api';
import { dashboardApi } from './services/dashboard';
import { useEffect } from 'react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [personalData, setPersonalData] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authToken, setAuthToken] = useState(null);

  // Update handleLogin to store token
  const handleLogin = async (credentials) => {
    try {
      const response = await api.login(credentials);
      if (response.token) {
        setIsLoggedIn(true);
        setUserRole(response.user.role);
        setAuthToken(response.token);
        // Store token in localStorage for persistence
        localStorage.setItem('biteToken', response.token);
        setCurrentView('dashboard');
      } else {
        alert('Login failed: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // Add useEffect to check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('biteToken');
    if (token) {
      // Verify token is still valid
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setAuthToken(token);
          setIsLoggedIn(true);
          setUserRole(payload.role);
        } else {
          localStorage.removeItem('biteToken');
        }
      } catch (e) {
        localStorage.removeItem('biteToken');
      }
    }
  }, []);

  // Add a new registration function
  const handleRegistration = async (personalData, roleSpecificData) => {
    try {
      // Upload profile picture first
      let profilePictureUrl = null;
      if (personalData.profilePicture) {
        profilePictureUrl = await api.uploadProfilePicture(personalData.profilePicture);
      }

      // Prepare registration data
      const registrationData = {
        // Personal info
        fullName: personalData.fullName,
        email: personalData.email,
        password: personalData.password,
        phoneNumber: personalData.phoneNumber,
        city: personalData.city,
        country: personalData.country,
        profilePicture: profilePictureUrl,

        // Role and tier
        role: selectedRole,
        tier: selectedTier.name,

        // Role-specific data
        ...(selectedRole === 'student' && { studentData: roleSpecificData }),
        ...(selectedRole === 'startup' && { startupData: roleSpecificData }),
        ...(selectedRole === 'business' && { businessData: roleSpecificData }),
        ...(selectedRole === 'investor' && { investorData: roleSpecificData })
      };

      const response = await api.register(registrationData);

      if (response.token) {
        setIsLoggedIn(true);
        setUserRole(selectedRole);
        setCurrentView('dashboard');
      } else {
        alert('Registration failed: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentView('home');
  };

  const RoleCard = ({ role, icon: Icon, description, onSelect }) => (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${selectedRole === role ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      onClick={() => onSelect(role)}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">{role}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  const TierCard = ({ tier, price, features, role, onSelect }) => (
    <div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200"
      onClick={() => {
        setSelectedTier({ name: tier, price, features });
        setCurrentView('personal-info'); // Navigate to personal info first
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{tier}</h3>
        <span className="text-2xl font-bold text-blue-600">${price}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Select Plan
      </button>
    </div>
  );

  const DashboardWidget = ({ title, children, icon: Icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const NavigationBar = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BITE</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Dashboard', 'Matches', 'Messages', 'Search', 'Analytics', 'Profile', 'Settings'].map((item) => (
                <a key={item} href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {item}
                </a>
              ))}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Header */}
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
            Bridging Innovators, Talents, and Entrepreneurs
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Connect with students, startups, businesses, and investors in a seamless ecosystem for internships, projects, mentorship, and investment opportunities.
          </p>

          {/* Auth Cards */}
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            {/* Sign In Card */}
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
                    onClick={async () => {
                      // You'll need to get email and password from state
                      // Add state for login form fields
                      await handleLogin({ email: loginEmail, password: loginPassword });
                    }}
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

            {/* Sign Up Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
              <p className="text-gray-600 mb-6">Join our global community of innovators and talents</p>
              <button
                onClick={() => setCurrentView('role-selection')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const RoleSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BITE</h1>
          <p className="text-xl text-gray-600">Choose your role to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <RoleCard
            role="student"
            icon={GraduationCap}
            description="Find internships, projects, and mentorship opportunities with startups and businesses"
            onSelect={(role) => {
              setSelectedRole(role);
              setCurrentView('tier-selection');
            }}
          />
          <RoleCard
            role="startup"
            icon={Building}
            description="Connect with talented students, find co-founders, and attract investors"
            onSelect={(role) => {
              setSelectedRole(role);
              setCurrentView('tier-selection');
            }}
          />
          <RoleCard
            role="business"
            icon={Briefcase}
            description="Discover top talent, manage internships, and mentor the next generation"
            onSelect={(role) => {
              setSelectedRole(role);
              setCurrentView('tier-selection');
            }}
          />
          <RoleCard
            role="investor"
            icon={DollarSign}
            description="Find promising startups, analyze investment opportunities, and build your portfolio"
            onSelect={(role) => {
              setSelectedRole(role);
              setCurrentView('tier-selection');
            }}
          />
        </div>

        {/* Back button */}
        <div className="text-center">
          <button
            onClick={() => setCurrentView('home')}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const TierSelection = () => {
    const tiers = {
      student: [
        {
          name: 'Free',
          price: '0',
          features: ['Basic matching', 'Limited messaging', 'Search functionality']
        },
        {
          name: 'Pro Student',
          price: '4.99',
          features: ['Unlimited chats', 'Video calls', 'Access to multiple startups/businesses', 'Verified badge']
        },
        {
          name: 'Career+',
          price: '9.99',
          features: ['Priority pairing', 'Career analytics', 'Global certificates', 'Project showcase', 'All Pro features']
        }
      ],
      startup: [
        {
          name: 'Free',
          price: '0',
          features: ['Create company profile', 'Browse students', 'Basic search']
        },
        {
          name: 'Scale Faster',
          price: '19.99',
          features: ['Unlimited matches', 'Verified profiles', 'Project posting', 'Applicant tracking']
        },
        {
          name: 'Pro Founder',
          price: '39.99',
          features: ['Investor access', 'Tailored student matching', 'All Scale Faster features', 'Priority support']
        }
      ],
      business: [
        {
          name: 'Free',
          price: '0',
          features: ['Browse students/startups', 'Basic connections', 'Search functionality']
        },
        {
          name: 'Talent+',
          price: '19.99',
          features: ['Global student access', 'Project management tools', 'Internship pipeline', 'Mentor analytics']
        },
        {
          name: 'Investor+',
          price: '39.99',
          features: ['Verified student profiles', 'Global analytics', 'Insight dashboards', 'All Talent+ features']
        }
      ],
      investor: [
        {
          name: 'Free',
          price: '0',
          features: ['Limited browsing', 'Basic messaging', 'Public profiles']
        },
        {
          name: 'Explorer',
          price: '24.99',
          features: ['Full profile access', 'Investment analytics', 'Advanced filtering', 'Performance indicators']
        },
        {
          name: 'Pro Investor',
          price: '49.99',
          features: ['Unlimited matches', 'Verified profiles', 'Priority access', 'Video calls', 'Portfolio tracking', 'Exclusive pitches']
        }
      ]
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 capitalize">Perfect for {selectedRole}s</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {tiers[selectedRole]?.map((tier, index) => (
              <TierCard
                key={index}
                tier={tier.name}
                price={tier.price}
                features={tier.features}
                role={selectedRole}
              />
            ))}
          </div>

          {/* Back button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView('role-selection')}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Personal Information Form with Profile Picture
  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
      profilePicture: null,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      country: '',
      phoneNumber: ''
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          profilePicture: file
        });
        // Create preview URL for the image
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewUrl(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    // In PersonalInfoForm, replace handleSubmit with:
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!formData.profilePicture) {
        alert('Please upload a profile picture!');
        return;
      }

      // Store personal data in state or pass to next step
      setPersonalData(formData);

      // Navigate to role-specific form
      if (selectedRole === 'student') {
        setCurrentView('student-form');
      } else if (selectedRole === 'startup') {
        setCurrentView('startup-form');
      } else if (selectedRole === 'business') {
        setCurrentView('business-form');
      } else if (selectedRole === 'investor') {
        setCurrentView('investor-form');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Personal Information</h1>
            <p className="text-gray-600">Complete your basic profile information</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            {/* Profile Picture Upload */}
            <div className="mb-6 text-center">
              <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
              <div
                className="mx-auto w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => document.getElementById('profilePicture').click()}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <User className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-xs">Click to upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">JPG, PNG, or GIF (max 5MB)</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New York"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="United States"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('tier-selection')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back to Tier Selection
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Continue to Role Details
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Replace your current Dashboard component with this
  const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          // In production, you'd get the token from localStorage or context
          // For now, we'll simulate having a token
          const token = authToken || localStorage.getItem('biteToken');
          const data = await dashboardApi.getDashboardData(token);;
          setDashboardData(data);
          setLoading(false);
        } catch (err) {
          console.error('Failed to fetch dashboard data:', err);
          setError('Failed to load dashboard data');
          setLoading(false);
        }
      };

      fetchDashboardData();
    }, []);

    const renderWidgetContent = (widget) => {
      switch (widget.type) {
        case 'analytics':
          return (
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <p className="text-lg font-semibold">{widget.data.message}</p>
            </div>
          );
        case 'projects':
          return (
            <div className="space-y-3">
              {widget.data.map((project, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{project.title}</h4>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          );
        case 'certificates':
          return (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600">{widget.data.message}</p>
            </div>
          );
        case 'investors':
          return (
            <div className="space-y-3">
              {widget.data.map((investor, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <div className="bg-blue-200 rounded-full p-2 mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{investor.name}</h4>
                    <p className="text-gray-600 text-sm">{investor.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'matching':
          return (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">{widget.data.message}</p>
            </div>
          );
        case 'pipeline':
          return (
            <div className="space-y-3">
              {widget.data.map((candidate, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-600">{candidate.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {candidate.status}
                  </span>
                </div>
              ))}
            </div>
          );
        case 'portfolio':
          return (
            <div className="space-y-3">
              {widget.data.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className={`text-sm font-semibold ${item.value.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          );
        case 'pitches':
          return (
            <div className="space-y-3">
              {widget.data.map((pitch, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{pitch.title}</h4>
                    <p className="text-gray-600 text-sm">{pitch.stage}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'activity':
          return (
            <div className="space-y-3">
              {widget.data.map((activity, index) => (
                <div key={index} className="text-sm text-gray-600">
                  <span className="font-medium">{activity.message}</span>
                </div>
              ))}
            </div>
          );
        case 'actions':
          return (
            <div className="space-y-3">
              {widget.data.map((action, index) => {
                const icons = {
                  'Send Message': MessageSquare,
                  'Find Matches': Search,
                  'Upgrade Plan': Settings
                };
                const Icon = icons[action] || ArrowRight;
                return (
                  <button key={index} className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Icon className="w-5 h-5 inline mr-2" />
                    {action}
                  </button>
                );
              })}
            </div>
          );
        default:
          return <div className="text-gray-600">No data available</div>;
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading dashboard...</div>
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
        <NavigationBar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              Welcome, {dashboardData?.user?.full_name || userRole}!
            </h1>
            <p className="text-gray-600 mt-2">Your personalized dashboard for growth and collaboration</p>
          </div>

          {dashboardData?.dashboardWidgets && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {dashboardData.dashboardWidgets.map((widget) => (
                <DashboardWidget key={widget.id} title={widget.title} icon={getWidgetIcon(widget.type)}>
                  {renderWidgetContent(widget)}
                </DashboardWidget>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  };

  // Helper function to get appropriate icon for widget type
  const getWidgetIcon = (type) => {
    const iconMap = {
      analytics: TrendingUp,
      projects: Briefcase,
      certificates: Star,
      investors: DollarSign,
      matching: Users,
      pipeline: Users,
      portfolio: Briefcase,
      pitches: Video,
      activity: Bell,
      actions: ArrowRight,
      global: Globe
    };
    return iconMap[type] || Briefcase;
  };

  // Student Opportunity Form
  const StudentOpportunityForm = () => {
    const [formData, setFormData] = useState({
      institution: '',
      degree: '',
      graduationYear: '',
      skills: '',
      careerGoals: '',
      availability: '',
      linkedinProfile: '',
      portfolioUrl: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await handleRegistration(personalData, formData);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Student Details</h1>
            <p className="text-gray-600">Tell us about your academic background and career goals</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Harvard University"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree Program</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Year</label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2025"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="JavaScript, React, Python, Machine Learning"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
                <textarea
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="I want to work in AI/ML research..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="immediate">Immediate</option>
                  <option value="summer">Summer Internship</option>
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time after graduation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile (optional)</label>
                <input
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/GitHub URL (optional)</label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('personal-info')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back to Personal Info
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Startup Opportunity Form
  const StartupOpportunityForm = () => {
    const [formData, setFormData] = useState({
      companyName: '',
      industry: '',
      companySize: '',
      fundingStage: '',
      website: '',
      hiringNeeds: '',
      projectDescription: '',
      teamSize: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await handleRegistration(personalData, formData);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Startup Details</h1>
            <p className="text-gray-600">Tell us about your company and what you're building</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tech Innovations Inc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Artificial Intelligence"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select size</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-20">6-20 employees</option>
                  <option value="21-50">21-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <input
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage</label>
                <select
                  value={formData.fundingStage}
                  onChange={(e) => setFormData({ ...formData, fundingStage: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B+</option>
                  <option value="bootstrapped">Bootstrapped</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourstartup.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Needs</label>
                <textarea
                  value={formData.hiringNeeds}
                  onChange={(e) => setFormData({ ...formData, hiringNeeds: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="We're looking for frontend developers, data scientists..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="We're building an AI-powered platform that..."
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('personal-info')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back to Personal Info
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Business Opportunity Form
  const BusinessOpportunityForm = () => {
    const [formData, setFormData] = useState({
      companyName: '',
      industry: '',
      companySize: '',
      website: '',
      mentorshipProgram: '',
      internshipProgram: '',
      globalPresence: '',
      yearsInBusiness: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await handleRegistration(personalData, formData);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Details</h1>
            <p className="text-gray-600">Tell us about your organization and talent programs</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Global Enterprises Ltd."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Financial Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select size</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                <input
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mentorship Program</label>
                <textarea
                  value={formData.mentorshipProgram}
                  onChange={(e) => setFormData({ ...formData, mentorshipProgram: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="We offer 6-month mentorship programs with senior executives..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internship Program</label>
                <textarea
                  value={formData.internshipProgram}
                  onChange={(e) => setFormData({ ...formData, internshipProgram: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Our internship program runs year-round with rotations across departments..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Global Presence</label>
                <input
                  type="text"
                  value={formData.globalPresence}
                  onChange={(e) => setFormData({ ...formData, globalPresence: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="USA, Canada, UK, Germany, Japan"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('personal-info')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back to Personal Info
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Investor Opportunity Form
  const InvestorOpportunityForm = () => {
    const [formData, setFormData] = useState({
      firmName: '',
      investmentFocus: '',
      portfolioSize: '',
      preferredIndustries: '',
      investmentStage: '',
      geographicFocus: '',
      averageInvestment: '',
      website: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await handleRegistration(personalData, formData);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Investor Details</h1>
            <p className="text-gray-600">Tell us about your investment profile and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Firm Name</label>
                <input
                  type="text"
                  value={formData.firmName}
                  onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Venture Capital Partners"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Focus</label>
                <select
                  value={formData.investmentFocus}
                  onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select focus</option>
                  <option value="venture-capital">Venture Capital</option>
                  <option value="angel-investing">Angel Investing</option>
                  <option value="private-equity">Private Equity</option>
                  <option value="corporate-ventures">Corporate Ventures</option>
                  <option value="family-office">Family Office</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
                <select
                  value={formData.portfolioSize}
                  onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select size</option>
                  <option value="under-10">Under 10 companies</option>
                  <option value="10-50">10-50 companies</option>
                  <option value="50-100">50-100 companies</option>
                  <option value="100+">100+ companies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Investment Size</label>
                <select
                  value={formData.averageInvestment}
                  onChange={(e) => setFormData({ ...formData, averageInvestment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select range</option>
                  <option value="under-50k">Under $50K</option>
                  <option value="50k-250k">$50K - $250K</option>
                  <option value="250k-1m">$250K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m+">$5M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Industries</label>
                <input
                  type="text"
                  value={formData.preferredIndustries}
                  onChange={(e) => setFormData({ ...formData, preferredIndustries: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tech, Healthcare, Fintech, Clean Energy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Stage Preference</label>
                <select
                  value={formData.investmentStage}
                  onChange={(e) => setFormData({ ...formData, investmentStage: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="growth">Growth/Expansion</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Focus</label>
                <input
                  type="text"
                  value={formData.geographicFocus}
                  onChange={(e) => setFormData({ ...formData, geographicFocus: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="North America, Europe, Global, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourfirm.com"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('personal-info')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Back to Personal Info
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render the appropriate view
  if (isLoggedIn && currentView === 'dashboard') {
    return <Dashboard />;
  }

  switch (currentView) {
    case 'home':
      return <HomePage />;
    case 'role-selection':
      return <RoleSelection />;
    case 'tier-selection':
      return <TierSelection />;
    case 'personal-info':
      return <PersonalInfoForm />;
    case 'student-form':
      return <StudentOpportunityForm />;
    case 'startup-form':
      return <StartupOpportunityForm />;
    case 'business-form':
      return <BusinessOpportunityForm />;
    case 'investor-form':
      return <InvestorOpportunityForm />;
    default:
      return <HomePage />;
  }
};


export default App;