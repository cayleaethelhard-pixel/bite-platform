// src/pages/InvestorOpportunityForm.js
import React, { useState } from 'react';
import {  } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const InvestorOpportunityForm = ({ 
  handleRegistration, 
  personalData 
}) => {
  const navigate = useNavigate();
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
    navigate('/dashboard');
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
              <input type="text" value={formData.firmName} onChange={(e) => setFormData({ ...formData, firmName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Venture Capital Partners" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Focus</label>
              <select value={formData.investmentFocus} onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
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
              <select value={formData.portfolioSize} onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
                <option value="">Select size</option>
                <option value="under-10">Under 10 companies</option>
                <option value="10-50">10-50 companies</option>
                <option value="50-100">50-100 companies</option>
                <option value="100+">100+ companies</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Investment Size</label>
              <select value={formData.averageInvestment} onChange={(e) => setFormData({ ...formData, averageInvestment: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
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
              <input type="text" value={formData.preferredIndustries} onChange={(e) => setFormData({ ...formData, preferredIndustries: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tech, Healthcare, Fintech, Clean Energy" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Stage Preference</label>
              <select value={formData.investmentStage} onChange={(e) => setFormData({ ...formData, investmentStage: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
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
              <input type="text" value={formData.geographicFocus} onChange={(e) => setFormData({ ...formData, geographicFocus: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="North America, Europe, Global, etc." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
              <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://yourfirm.com" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/personal-info"
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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

export default InvestorOpportunityForm;