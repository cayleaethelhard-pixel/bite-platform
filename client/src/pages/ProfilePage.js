// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Save, Edit3, Upload } from 'lucide-react';

const ProfilePage = ({ userRole, authToken }) => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock profile data based on user role
  const getMockProfileData = (role) => {
    switch (role) {
      case 'student':
        return {
          personal: {
            fullName: 'Alex Johnson',
            email: 'alex.johnson@stanford.edu',
            phoneNumber: '+1 (555) 123-4567',
            city: 'Stanford',
            country: 'United States',
            profilePicture: 'https://placehold.co/150x150/DC2626/white?text=AJ'
          },
          student: {
            institution: 'Stanford University',
            degree: 'Computer Science',
            graduationYear: '2025',
            skills: 'React, Node.js, MongoDB, Python, Machine Learning',
            careerGoals: 'I want to work in AI/ML research and development at a leading tech company.',
            availability: 'summer',
            linkedinProfile: 'https://linkedin.com/in/alexjohnson',
            portfolioUrl: 'https://github.com/alexjohnson'
          }
        };
      case 'startup':
        return {
          personal: {
            fullName: 'Sarah Miller',
            email: 'sarah@techinnovations.com',
            phoneNumber: '+1 (555) 987-6543',
            city: 'San Francisco',
            country: 'United States',
            profilePicture: 'https://placehold.co/150x150/4F46E5/white?text=TI'
          },
          startup: {
            companyName: 'Tech Innovations Inc.',
            industry: 'Healthcare Technology',
            companySize: '6-20',
            teamSize: '12',
            fundingStage: 'seed',
            website: 'https://techinnovations.com',
            hiringNeeds: 'We are looking for frontend developers with React experience and data scientists with ML expertise.',
            projectDescription: 'We are building an AI-powered platform that helps doctors diagnose diseases more accurately using medical imaging.'
          }
        };
      case 'business':
        return {
          personal: {
            fullName: 'David Chen',
            email: 'david.chen@globalenterprises.com',
            phoneNumber: '+1 (555) 456-7890',
            city: 'New York',
            country: 'United States',
            profilePicture: 'https://placehold.co/150x150/059669/white?text=GE'
          },
          business: {
            companyName: 'Global Enterprises Ltd.',
            industry: 'Financial Services',
            companySize: '51-200',
            yearsInBusiness: '15',
            website: 'https://globalenterprises.com',
            mentorshipProgram: 'We offer 6-month mentorship programs with senior executives focusing on leadership and technical skills.',
            internshipProgram: 'Our internship program runs year-round with rotations across departments including engineering, product, and finance.',
            globalPresence: 'USA, Canada, UK, Germany, Japan'
          }
        };
      case 'investor':
        return {
          personal: {
            fullName: 'Michael Rodriguez',
            email: 'michael@venturecapital.com',
            phoneNumber: '+1 (555) 234-5678',
            city: 'Boston',
            country: 'United States',
            profilePicture: 'https://placehold.co/150x150/7C3AED/white?text=VCP'
          },
          investor: {
            firmName: 'Venture Capital Partners',
            investmentFocus: 'venture-capital',
            portfolioSize: '10-50',
            averageInvestment: '250k-1m',
            preferredIndustries: 'AI, Healthcare, Fintech, Clean Energy',
            investmentStage: 'series-a',
            geographicFocus: 'North America, Europe',
            website: 'https://venturecapitalpartners.com'
          }
        };
      default:
        return null;
    }
  };

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfileData = async () => {
      try {
        // In real implementation:
        // const response = await fetch('/api/user/profile', {
        //   headers: { Authorization: `Bearer ${authToken}` }
        // });
        // const data = await response.json();
        
        const mockData = getMockProfileData(userRole);
        setProfileData(mockData);
        setEditedData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userRole, authToken]);

  const handleEditChange = (section, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    // In real implementation, send editedData to backend
    setProfileData(editedData);
    setIsEditing(false);
    // Mock success
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedData(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            profilePicture: event.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal and {userRole} information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img 
                  src={editedData.personal.profilePicture} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{editedData.personal.fullName}</h2>
                <p className="text-blue-100 capitalize">{userRole}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center text-blue-100">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{editedData.personal.email}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{editedData.personal.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{editedData.personal.city}, {editedData.personal.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.personal.fullName}
                      onChange={(e) => handleEditChange('personal', 'fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.personal.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.personal.email}
                      onChange={(e) => handleEditChange('personal', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.personal.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.personal.phoneNumber}
                      onChange={(e) => handleEditChange('personal', 'phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.personal.phoneNumber}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={editedData.personal.city}
                        onChange={(e) => handleEditChange('personal', 'city', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={editedData.personal.country}
                        onChange={(e) => handleEditChange('personal', 'country', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">{profileData.personal.city}, {profileData.personal.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-Specific Information */}
            {userRole === 'student' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.student.institution}
                        onChange={(e) => handleEditChange('student', 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.student.institution}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Program</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.student.degree}
                        onChange={(e) => handleEditChange('student', 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.student.degree}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation Year</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.student.graduationYear}
                        onChange={(e) => handleEditChange('student', 'graduationYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.student.graduationYear}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    {isEditing ? (
                      <select
                        value={editedData.student.availability}
                        onChange={(e) => handleEditChange('student', 'availability', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="summer">Summer Internship</option>
                        <option value="part-time">Part-time</option>
                        <option value="full-time">Full-time after graduation</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">
                        {profileData.student.availability === 'immediate' && 'Immediate'}
                        {profileData.student.availability === 'summer' && 'Summer Internship'}
                        {profileData.student.availability === 'part-time' && 'Part-time'}
                        {profileData.student.availability === 'full-time' && 'Full-time after graduation'}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.student.skills}
                        onChange={(e) => handleEditChange('student', 'skills', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Comma separated skills"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.student.skills}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career Goals</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.student.careerGoals}
                        onChange={(e) => handleEditChange('student', 'careerGoals', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.student.careerGoals}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                    {isEditing ? (
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          value={editedData.student.linkedinProfile}
                          onChange={(e) => handleEditChange('student', 'linkedinProfile', e.target.value)}
                          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    ) : (
                      <p className="text-blue-600 hover:underline">
                        <a href={profileData.student.linkedinProfile} target="_blank" rel="noopener noreferrer">
                          {profileData.student.linkedinProfile}
                        </a>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/GitHub URL</label>
                    {isEditing ? (
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          value={editedData.student.portfolioUrl}
                          onChange={(e) => handleEditChange('student', 'portfolioUrl', e.target.value)}
                          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                    ) : (
                      <p className="text-blue-600 hover:underline">
                        <a href={profileData.student.portfolioUrl} target="_blank" rel="noopener noreferrer">
                          {profileData.student.portfolioUrl}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userRole === 'startup' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Startup Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.startup.companyName}
                        onChange={(e) => handleEditChange('startup', 'companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.startup.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.startup.industry}
                        onChange={(e) => handleEditChange('startup', 'industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.startup.industry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    {isEditing ? (
                      <select
                        value={editedData.startup.companySize}
                        onChange={(e) => handleEditChange('startup', 'companySize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="200+">200+ employees</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.startup.companySize} employees</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.startup.teamSize}
                        onChange={(e) => handleEditChange('startup', 'teamSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.startup.teamSize}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Funding Stage</label>
                    {isEditing ? (
                      <select
                        value={editedData.startup.fundingStage}
                        onChange={(e) => handleEditChange('startup', 'fundingStage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="series-a">Series A</option>
                        <option value="series-b">Series B+</option>
                        <option value="bootstrapped">Bootstrapped</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{profileData.startup.fundingStage}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {isEditing ? (
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          value={editedData.startup.website}
                          onChange={(e) => handleEditChange('startup', 'website', e.target.value)}
                          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourstartup.com"
                        />
                      </div>
                    ) : (
                      <p className="text-blue-600 hover:underline">
                        <a href={profileData.startup.website} target="_blank" rel="noopener noreferrer">
                          {profileData.startup.website}
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Needs</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.startup.hiringNeeds}
                        onChange={(e) => handleEditChange('startup', 'hiringNeeds', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.startup.hiringNeeds}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.startup.projectDescription}
                        onChange={(e) => handleEditChange('startup', 'projectDescription', e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.startup.projectDescription}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userRole === 'business' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.business.companyName}
                        onChange={(e) => handleEditChange('business', 'companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.business.industry}
                        onChange={(e) => handleEditChange('business', 'industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.industry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    {isEditing ? (
                      <select
                        value={editedData.business.companySize}
                        onChange={(e) => handleEditChange('business', 'companySize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1-50">1-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.business.companySize} employees</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.business.yearsInBusiness}
                        onChange={(e) => handleEditChange('business', 'yearsInBusiness', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.yearsInBusiness}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {isEditing ? (
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          value={editedData.business.website}
                          onChange={(e) => handleEditChange('business', 'website', e.target.value)}
                          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    ) : (
                      <p className="text-blue-600 hover:underline">
                        <a href={profileData.business.website} target="_blank" rel="noopener noreferrer">
                          {profileData.business.website}
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mentorship Program</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.business.mentorshipProgram}
                        onChange={(e) => handleEditChange('business', 'mentorshipProgram', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.mentorshipProgram}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Internship Program</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.business.internshipProgram}
                        onChange={(e) => handleEditChange('business', 'internshipProgram', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.internshipProgram}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Global Presence</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.business.globalPresence}
                        onChange={(e) => handleEditChange('business', 'globalPresence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Countries separated by commas"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.business.globalPresence}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userRole === 'investor' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Investor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.investor.firmName}
                        onChange={(e) => handleEditChange('investor', 'firmName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.investor.firmName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Focus</label>
                    {isEditing ? (
                      <select
                        value={editedData.investor.investmentFocus}
                        onChange={(e) => handleEditChange('investor', 'investmentFocus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="venture-capital">Venture Capital</option>
                        <option value="angel-investing">Angel Investing</option>
                        <option value="private-equity">Private Equity</option>
                        <option value="corporate-ventures">Corporate Ventures</option>
                        <option value="family-office">Family Office</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">
                        {profileData.investor.investmentFocus.replace('-', ' ')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Size</label>
                    {isEditing ? (
                      <select
                        value={editedData.investor.portfolioSize}
                        onChange={(e) => handleEditChange('investor', 'portfolioSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="under-10">Under 10 companies</option>
                        <option value="10-50">10-50 companies</option>
                        <option value="50-100">50-100 companies</option>
                        <option value="100+">100+ companies</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.investor.portfolioSize}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Average Investment Size</label>
                    {isEditing ? (
                      <select
                        value={editedData.investor.averageInvestment}
                        onChange={(e) => handleEditChange('investor', 'averageInvestment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="under-50k">Under $50K</option>
                        <option value="50k-250k">$50K - $250K</option>
                        <option value="250k-1m">$250K - $1M</option>
                        <option value="1m-5m">$1M - $5M</option>
                        <option value="5m+">$5M+</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.investor.averageInvestment}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Industries</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.investor.preferredIndustries}
                        onChange={(e) => handleEditChange('investor', 'preferredIndustries', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Industries separated by commas"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.investor.preferredIndustries}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Stage Preference</label>
                    {isEditing ? (
                      <select
                        value={editedData.investor.investmentStage}
                        onChange={(e) => handleEditChange('investor', 'investmentStage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="series-a">Series A</option>
                        <option value="series-b">Series B</option>
                        <option value="growth">Growth/Expansion</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{profileData.investor.investmentStage}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Geographic Focus</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.investor.geographicFocus}
                        onChange={(e) => handleEditChange('investor', 'geographicFocus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Regions separated by commas"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.investor.geographicFocus}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {isEditing ? (
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          value={editedData.investor.website}
                          onChange={(e) => handleEditChange('investor', 'website', e.target.value)}
                          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourfirm.com"
                        />
                      </div>
                    ) : (
                      <p className="text-blue-600 hover:underline">
                        <a href={profileData.investor.website} target="_blank" rel="noopener noreferrer">
                          {profileData.investor.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;