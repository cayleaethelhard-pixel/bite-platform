// src/pages/StudentOpportunityForm.js
import React, { useState } from 'react';
import { } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentOpportunityForm = ({ 
  handleRegistration, 
  personalData 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    institution: '', 
    degree: '', 
    graduationYear: '', 
    skills: '', 
    careerGoals: '', 
    availability: '', 
    linkedinProfile: '', 
    portfolioUrl: ''
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Student Details</h1>
          <p className="text-gray-600">Tell us about your academic background and career goals</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
              <input required type="text" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Harvard University" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree Program</label>
              <input required type="text" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Computer Science" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Year</label>
              <input required type="number" value={formData.graduationYear} onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="2025" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
              <input required type="text" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="JavaScript, React, Python, Machine Learning" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
              <textarea required value={formData.careerGoals} onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="I want to work in AI/ML research..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select required value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select availability</option>
                <option value="immediate">Immediate</option>
                <option value="summer">Summer Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time after graduation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile (optional)</label>
              <input type="url" value={formData.linkedinProfile} onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/GitHub URL (optional)</label>
              <input type="url" value={formData.portfolioUrl} onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://github.com/yourusername" />
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

export default StudentOpportunityForm;