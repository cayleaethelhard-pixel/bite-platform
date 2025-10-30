// src/pages/AdminSettingsPage.js
import React, { useState, useEffect } from 'react';
import { CreditCard, Save, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSettingsPage = ({ authToken }) => {
  const navigate = useNavigate();

  // Define your current tier structure (matches your TierSelection.js)
  const initialTiers = {
    student: [
      { id: 'free-student', name: 'Free', price: '0', features: ['Basic matching', 'Limited messaging', 'Search functionality'] },
      { id: 'pro-student', name: 'Pro Student', price: '4.99', features: ['Unlimited chats', 'Video calls', 'Access to multiple startups/businesses', 'Verified badge'] },
      { id: 'career-plus', name: 'Career+', price: '9.99', features: ['Priority pairing', 'Career analytics', 'Global certificates', 'Project showcase', 'All Pro features'] }
    ],
    startup: [
      { id: 'free-startup', name: 'Free', price: '0', features: ['Create company profile', 'Browse students', 'Basic search'] },
      { id: 'scale-faster', name: 'Scale Faster', price: '19.99', features: ['Unlimited matches', 'Verified profiles', 'Project posting', 'Applicant tracking'] },
      { id: 'pro-founder', name: 'Pro Founder', price: '39.99', features: ['Investor access', 'Tailored student matching', 'All Scale Faster features', 'Priority support'] }
    ],
    business: [
      { id: 'free-business', name: 'Free', price: '0', features: ['Browse students/startups', 'Basic connections', 'Search functionality'] },
      { id: 'talent-plus', name: 'Talent+', price: '19.99', features: ['Global student access', 'Project management tools', 'Internship pipeline', 'Mentor analytics'] },
      { id: 'investor-plus', name: 'Investor+', price: '39.99', features: ['Verified student profiles', 'Global analytics', 'Insight dashboards', 'All Talent+ features'] }
    ],
    investor: [
      { id: 'free-investor', name: 'Free', price: '0', features: ['Limited browsing', 'Basic messaging', 'Public profiles'] },
      { id: 'explorer', name: 'Explorer', price: '24.99', features: ['Full profile access', 'Investment analytics', 'Advanced filtering', 'Performance indicators'] },
      { id: 'pro-investor', name: 'Pro Investor', price: '49.99', features: ['Unlimited matches', 'Verified profiles', 'Priority access', 'Video calls', 'Portfolio tracking', 'Exclusive pitches'] }
    ]
  };

  const [tiers, setTiers] = useState(initialTiers);
  const [originalTiers, setOriginalTiers] = useState(initialTiers);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // In a real app, you'd fetch from /api/admin/settings
  useEffect(() => {
    // Simulate loading from backend
    const loadSettings = async () => {
      // TODO: Replace with real API call
      // const response = await fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${authToken}` } });
      // const data = await response.json();
      // setTiers(data.tiers);
      // setOriginalTiers(data.tiers);
    };
    loadSettings();
  }, [authToken]);

  const handleTierChange = (role, index, field, value) => {
    setTiers(prev => ({
      ...prev,
      [role]: prev[role].map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }));
  };

  const handleFeatureChange = (role, tierIndex, featureIndex, value) => {
    setTiers(prev => ({
      ...prev,
      [role]: prev[role].map((tier, i) =>
        i === tierIndex 
          ? { 
              ...tier, 
              features: tier.features.map((f, j) => j === featureIndex ? value : f) 
            }
          : tier
      )
    }));
  };

  const addFeature = (role, tierIndex) => {
    setTiers(prev => ({
      ...prev,
      [role]: prev[role].map((tier, i) =>
        i === tierIndex 
          ? { ...tier, features: [...tier.features, 'New feature'] }
          : tier
      )
    }));
  };

  const removeFeature = (role, tierIndex, featureIndex) => {
    setTiers(prev => ({
      ...prev,
      [role]: prev[role].map((tier, i) =>
        i === tierIndex 
          ? { ...tier, features: tier.features.filter((_, j) => j !== featureIndex) }
          : tier
      )
    }));
  };

  const isDirty = JSON.stringify(tiers) !== JSON.stringify(originalTiers);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      // TODO: Real API call
      // await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${authToken}`
      //   },
      //   body: JSON.stringify({ tiers })
      // });
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
      setOriginalTiers(tiers);
      setMessage({ type: 'success', text: 'Platform settings saved successfully!' });
    } catch (error) {
      console.error('Save settings error:', error);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      setTiers(originalTiers);
      setMessage({ type: 'info', text: 'Changes reverted.' });
    }
  };

  const roleLabels = {
    student: 'Students',
    startup: 'Startups',
    business: 'Businesses',
    investor: 'Investors'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-2">Configure tiers, features, and policies</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-12">
          {Object.entries(tiers).map(([role, roleTiers]) => (
            <div key={role} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                {roleLabels[role]} Tiers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roleTiers.map((tier, tierIndex) => (
                  <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tier Name</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => handleTierChange(role, tierIndex, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/month)</label>
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => handleTierChange(role, tierIndex, 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Features</label>
                        <button
                          type="button"
                          onClick={() => addFeature(role, tierIndex)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          + Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(role, tierIndex, featureIndex, e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => removeFeature(role, tierIndex, featureIndex)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={handleReset}
            disabled={!isDirty || saving}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {saving ? (
              <>
                <RotateCcw className="w-4 h-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;