// src/pages/RoleSelection.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Import your role videos
import StudentRoleVideo from '../videos/StudentRoleVideo.mp4';
import StartupRoleVideo from '../videos/StartupRoleVideo.mp4';
import BusinessRoleVideo from '../videos/BusinessRoleVideo.mp4';
import InvestorRoleVideo from '../videos/InvestorRoleVideo.mp4';

const RoleCard = ({ role, description, selectedRole, onClick }) => {
  const videoMap = {
    student: StudentRoleVideo,
    startup: StartupRoleVideo,
    business: BusinessRoleVideo,
    investor: InvestorRoleVideo
  };

  const videoSrc = videoMap[role];

  return (
    <div
      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 relative overflow-hidden ${selectedRole === role ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
      onClick={onClick}
      style={{ height: '360px' }}
    >
      {/* ✅ Video fills top 3/4 with no padding/margin */}
      {videoSrc && (
        <div style={{ height: '240px', position: 'relative' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* ✅ Text in bottom 1/4 — no extra padding */}
      <div className="p-6" style={{ height: '80px' }}>
        <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">{role}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const RoleSelection = ({ selectedRole, setSelectedRole }) => {
  const navigate = useNavigate();
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    navigate('/tier-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-1000 mb-4">Welcome to BITE</h1>
          <p className="text-xl text-gray-600">Choose your role to get started</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <RoleCard
            role="student"
            description="Find internships, projects, and mentorship opportunities with startups and businesses"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('student')}
          />
          <RoleCard
            role="startup"
            description="Connect with talented students, find co-founders, and attract investors"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('startup')}
          />
          <RoleCard
            role="business"
            description="Discover top talent, manage internships, and mentor the next generation"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('business')}
          />
          <RoleCard
            role="investor"
            description="Find promising startups, analyze investment opportunities, and build your portfolio"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('investor')}
          />
        </div>
        <div className="text-center">
          <Link to="/" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;