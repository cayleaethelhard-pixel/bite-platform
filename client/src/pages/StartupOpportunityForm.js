// src/pages/StartupOpportunityForm.js
import React, { useState } from 'react';
import {  } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StartupOpportunityForm = ({ 
  handleRegistration, 
  personalData 
}) => {
  const navigate = useNavigate();
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
    navigate('/dashboard');
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
              <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tech Innovations Inc." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <input type="text" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Artificial Intelligence" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select value={formData.companySize} onChange={(e) => setFormData({ ...formData, companySize: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
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
              <input type="number" value={formData.teamSize} onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="5" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage</label>
              <select value={formData.fundingStage} onChange={(e) => setFormData({ ...formData, fundingStage: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
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
              <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://yourstartup.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Needs</label>
              <textarea value={formData.hiringNeeds} onChange={(e) => setFormData({ ...formData, hiringNeeds: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="We're looking for frontend developers, data scientists..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
              <textarea value={formData.projectDescription} onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="4" placeholder="We're building an AI-powered platform that..." required />
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

export default StartupOpportunityForm;