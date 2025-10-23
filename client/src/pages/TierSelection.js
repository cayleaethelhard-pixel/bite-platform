// src/pages/TierSelection.js
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TierSelection = ({ selectedRole, setSelectedTier }) => {
  const navigate = useNavigate();
  
  const tiers = {
    student: [
      { name: 'Free', price: '0', features: ['Basic matching', 'Limited messaging', 'Search functionality'] },
      { name: 'Pro Student', price: '4.99', features: ['Unlimited chats', 'Video calls', 'Access to multiple startups/businesses', 'Verified badge'] },
      { name: 'Career+', price: '9.99', features: ['Priority pairing', 'Career analytics', 'Global certificates', 'Project showcase', 'All Pro features'] }
    ],
    startup: [
      { name: 'Free', price: '0', features: ['Create company profile', 'Browse students', 'Basic search'] },
      { name: 'Scale Faster', price: '19.99', features: ['Unlimited matches', 'Verified profiles', 'Project posting', 'Applicant tracking'] },
      { name: 'Pro Founder', price: '39.99', features: ['Investor access', 'Tailored student matching', 'All Scale Faster features', 'Priority support'] }
    ],
    business: [
      { name: 'Free', price: '0', features: ['Browse students/startups', 'Basic connections', 'Search functionality'] },
      { name: 'Talent+', price: '19.99', features: ['Global student access', 'Project management tools', 'Internship pipeline', 'Mentor analytics'] },
      { name: 'Investor+', price: '39.99', features: ['Verified student profiles', 'Global analytics', 'Insight dashboards', 'All Talent+ features'] }
    ],
    investor: [
      { name: 'Free', price: '0', features: ['Limited browsing', 'Basic messaging', 'Public profiles'] },
      { name: 'Explorer', price: '24.99', features: ['Full profile access', 'Investment analytics', 'Advanced filtering', 'Performance indicators'] },
      { name: 'Pro Investor', price: '49.99', features: ['Unlimited matches', 'Verified profiles', 'Priority access', 'Video calls', 'Portfolio tracking', 'Exclusive pitches'] }
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
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl cursor-pointer border-2 border-gray-200"
              onClick={() => {
                setSelectedTier(tier);
                navigate('/personal-info'); // ✅ Go to personal info for ALL roles
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
                <span className="text-2xl font-bold text-blue-600">${tier.price}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Select Plan
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/role-selection" className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium">
            Back to Role Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TierSelection;