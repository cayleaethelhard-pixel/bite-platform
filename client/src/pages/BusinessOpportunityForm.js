// src/pages/BusinessOpportunityForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BusinessOpportunityForm = ({ 
  handleRegistration, 
  personalData 
}) => {
  const navigate = useNavigate();
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
    navigate('/dashboard');
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
              <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Global Enterprises Ltd." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <input type="text" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Financial Services" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select value={formData.companySize} onChange={(e) => setFormData({ ...formData, companySize: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
                <option value="">Select size</option>
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
              <input type="number" value={formData.yearsInBusiness} onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="15" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
              <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://yourcompany.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mentorship Program</label>
              <textarea value={formData.mentorshipProgram} onChange={(e) => setFormData({ ...formData, mentorshipProgram: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="We offer 6-month mentorship programs with senior executives..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Internship Program</label>
              <textarea value={formData.internshipProgram} onChange={(e) => setFormData({ ...formData, internshipProgram: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Our internship program runs year-round with rotations across departments..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Global Presence</label>
              <input type="text" value={formData.globalPresence} onChange={(e) => setFormData({ ...formData, globalPresence: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="USA, Canada, UK, Germany, Japan" required />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to="/personal-info"
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-center"
            >
              Back to Personal Info
            </Link>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessOpportunityForm;