import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { api } from './services/api';
import Dashboard from './components/Dashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import MatchesPage from './pages/MatchesPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import TierSelection from './pages/TierSelection';
import RoleSelection from './pages/RoleSelection';
import PersonalInfoForm from './pages/PersonalInfoForm';
import StudentOpportunityForm from './pages/StudentOpportunityForm';
import StartupOpportunityForm from './pages/StartupOpportunityForm';
import BusinessOpportunityForm from './pages/BusinessOpportunityForm';
import InvestorOpportunityForm from './pages/InvestorOpportunityForm';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import BiteLogo from './images/BiteLogo.png';
import AdminSettingsPage from './pages/AdminSettingsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // No localStorage check on load — auth is session-only
  useEffect(() => {
    // If you implement cookie-based or server-side sessions later, add logic here
    // For now, user must log in each time
  }, []);

  const handleRegistration = async (personalData, roleSpecificData) => {
    try {
      let profilePictureUrl = null;
      if (personalData.profilePicture) {
        const reader = new FileReader();
        profilePictureUrl = await new Promise((resolve) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(personalData.profilePicture);
        });
      }

      const registrationData = {
        fullName: personalData.fullName,
        email: personalData.email,
        password: personalData.password,
        phoneNumber: personalData.phoneNumber,
        city: personalData.city,
        country: personalData.country,
        profilePicture: profilePictureUrl,
        role: selectedRole,
        tier: selectedTier?.name || 'Free', // fallback if tier not selected
        ...(selectedRole === 'student' && { studentData: roleSpecificData }),
        ...(selectedRole === 'startup' && { startupData: roleSpecificData }),
        ...(selectedRole === 'business' && { businessData: roleSpecificData }),
        ...(selectedRole === 'investor' && { investorData: roleSpecificData })
      };

      const response = await api.register(registrationData);
      if (response.token) {
        setIsLoggedIn(true);
        setUserRole(selectedRole);
        setAuthToken(response.token);
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
    setAuthToken(null);
    navigate('/'); // ✅ Redirect to home
  };


  // NavigationBar as a standalone component
  const NavigationBar = () => {
    return (
      <>
        {/* Desktop Navigation */}
        <nav className="bg-blue-600 shadow-sm border-b border-blue-700 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <img src={BiteLogo} alt="BITE Logo" className="h-8 w-auto" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/dashboard" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link to="/matches" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Matches</Link>
                  <Link to="/messages" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Messages</Link>
                  <Link to="/search" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Search</Link>
                  <Link to="/analytics" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Analytics</Link>
                  <Link to="/profile" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                  <Link to="/settings" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
                  {userRole === 'admin' && (
                    <Link to="/admin" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="bg-blue-600 shadow-sm border-b border-blue-700 md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <img src={BiteLogo} alt="BITE Logo" className="h-8 w-auto" />
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-blue-100 hover:text-white focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/dashboard"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/matches"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Matches
                </Link>
                <Link
                  to="/messages"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/search"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Search
                </Link>
                <Link
                  to="/analytics"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  to="/profile"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                {userRole === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-blue-100 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  };

  // Wrap protected routes with auth + nav
  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    if (!isLoggedIn) {
      navigate('/');
      return null;
    }
    return (
      <>
        <NavigationBar />
        {children}
      </>
    );
  };


  // In App.js
  const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    // Check if user is admin
    if (!isLoggedIn || userRole !== 'admin') {
      navigate('/dashboard'); // or show 403
      return null;
    }
    return (
      <>
        <NavigationBar />
        {children}
      </>
    );
  };

  // Public route wrapper (redirect if logged in)

  const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoggedIn) {
        navigate('/dashboard');
      }
    }, [navigate]);

    if (isLoggedIn) return null;
    return children;
  };

  // Handle login success via route state
  const LoginSuccessHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const { token, user } = location.state || {};
      if (token && user) {
        setIsLoggedIn(true);
        setUserRole(user.role);
        setAuthToken(token);
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }, [location, navigate]);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Logging you in...</div>
      </div>
    );
  };

  return (
    <Routes>
      {/* Add this route at the top of your Routes*/}
      <Route
        path="/login-success"
        element={
          <PublicRoute>
            <LoginSuccessHandler />
          </PublicRoute>
        }
      />

      <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />

      <Route path="/features" element={<PublicRoute><FeaturesPage /></PublicRoute>} />

      <Route path="/contact" element={<PublicRoute><ContactPage /></PublicRoute>} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard authToken={authToken} />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsersPage authToken={authToken} />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <div className="p-8">Platform Settings (Coming Soon)</div>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsersPage authToken={authToken} />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AdminSettingsPage authToken={authToken} />
          </AdminRoute>
        }
      />

      <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />

      <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage />
      </PublicRoute>} />

      <Route path="/role-selection" element={<PublicRoute><RoleSelection selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      /></PublicRoute>} />

      <Route path="/tier-selection" element={<PublicRoute><TierSelection selectedRole={selectedRole}
        setSelectedTier={setSelectedTier}
      /></PublicRoute>} />

      <Route path="/personal-info" element={<PublicRoute><PersonalInfoForm setPersonalData={setPersonalData}
        selectedRole={selectedRole}
      /></PublicRoute>} />

      <Route path="/student-form" element={<PublicRoute><StudentOpportunityForm handleRegistration={handleRegistration}
        personalData={personalData}
      /></PublicRoute>} />

      <Route path="/startup-form" element={<PublicRoute><StartupOpportunityForm handleRegistration={handleRegistration}
        personalData={personalData}
      /></PublicRoute>} />

      <Route path="/business-form" element={<PublicRoute><BusinessOpportunityForm handleRegistration={handleRegistration}
        personalData={personalData}
      /></PublicRoute>} />

      <Route path="/investor-form" element={<PublicRoute><InvestorOpportunityForm handleRegistration={handleRegistration}
        personalData={personalData}
      /></PublicRoute>} />

      <Route path="/dashboard" element={
        isLoggedIn ? (
          <>
            <NavigationBar />
            <Dashboard
              userRole={userRole}
              userTier={userRole === 'admin' ? 'Admin' : 'Free'} //* get from JWT or API */
              authToken={authToken} />
          </>
        ) : <Navigate to="/" replace />
      }
      />
      <Route path="/matches" element={<ProtectedRoute><MatchesPage userRole={userRole} authToken={authToken} /></ProtectedRoute>} />

      <Route path="/messages" element={<ProtectedRoute><MessagesPage userRole={userRole} authToken={authToken} /></ProtectedRoute>} />

      <Route path="/search" element={<ProtectedRoute><SearchPage userRole={userRole} authToken={authToken} /></ProtectedRoute>} />

      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage userRole={userRole} authToken={authToken} /></ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute><ProfilePage userRole={userRole} authToken={authToken} /></ProtectedRoute>} />

      <Route path="/settings" element={<ProtectedRoute><SettingsPage authToken={authToken} userRole={userRole} /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;