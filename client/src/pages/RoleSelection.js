// src/pages/RoleSelection.js
import React from 'react';
import { GraduationCap, Building, Briefcase, DollarSign, } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RoleCard = ({ role, icon: Icon, description, selectedRole, onClick }) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${selectedRole === role ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
    onClick={onClick}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BITE</h1>
          <p className="text-xl text-gray-600">Choose your role to get started</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <RoleCard
            role="student"
            icon={GraduationCap}
            description="Find internships, projects, and mentorship opportunities with startups and businesses"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('student')}
          />
          <RoleCard
            role="startup"
            icon={Building}
            description="Connect with talented students, find co-founders, and attract investors"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('startup')}
          />
          <RoleCard
            role="business"
            icon={Briefcase}
            description="Discover top talent, manage internships, and mentor the next generation"
            selectedRole={selectedRole}
            onClick={() => handleRoleSelect('business')}
          />
          <RoleCard
            role="investor"
            icon={DollarSign}
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