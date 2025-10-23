import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle, GraduationCap, Building, Briefcase, DollarSign, Menu } from 'lucide-react';
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


const App = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  // We'll manage auth in memory only (no localStorage)
  const handleLogin = async (credentials) => {
    try {
      const response = await api.login(credentials);
      if (response.token) {
        setIsLoggedIn(true);
        setUserRole(response.user.role);
        setAuthToken(response.token);
        // NOTE: localStorage removed per environment constraint
      } else {
        alert('Login failed: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

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
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link to="/matches" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Matches</Link>
                <Link to="/messages" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Messages</Link>
                <Link to="/search" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Search</Link>
                <Link to="/analytics" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Analytics</Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                <Link to="/settings" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
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

  // Public route wrapper (redirect if logged in)

  const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoggedIn) {
        navigate('/dashboard');
      }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null;
    return children;
  };

  // === Pages (moved outside App for clarity) ===

  // Role-specific form wrappers (moved outside App for clarity)

  // Add this inside App.js (not as a separate file)
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
      // Add this route at the top of your Routes
      <Route
        path="/login-success"
        element={
          <PublicRoute>
            <LoginSuccessHandler />
          </PublicRoute>
        }
      />
      <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />

      <Route
        path="/reset-password"
        element={<PublicRoute><ResetPasswordPage />
        </PublicRoute>}
      />

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
            <Dashboard userRole={userRole} authToken={authToken} />
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