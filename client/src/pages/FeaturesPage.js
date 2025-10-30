// src/pages/FeaturesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Users, MessageSquare, TrendingUp, Star } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Smart Matching",
    description: "AI-powered compatibility scoring connects you with the best opportunities."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Verified Profiles",
    description: "All users are verified to ensure trust and authenticity."
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Secure Messaging",
    description: "Chat directly with matches in a safe, in-app environment."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track engagement, match quality, and performance metrics."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Global Certificates",
    description: "Earn verifiable credentials for completed projects and internships."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Role-Specific Tools",
    description: "Custom workflows for students, startups, businesses, and investors."
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h1>
          <p className="text-xl text-gray-600">Everything you need to succeed in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;