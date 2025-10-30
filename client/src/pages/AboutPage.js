// src/pages/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BITE</h1>
          <p className="text-xl text-gray-600">Bridging Innovators, Talents, and Entrepreneurs</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            BITE is a dynamic ecosystem designed to connect students, startups, businesses, and investors in a seamless platform for collaboration, growth, and innovation.
          </p>
          <p className="text-gray-700">
            We believe that the future of work and innovation lies in meaningful connections between talent and opportunity—whether it's internships, mentorship, funding, or co-founding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">For Students</h3>
            <p className="text-gray-600">
              Find internships, projects, mentorship, and career opportunities with real companies and startups.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">For Startups</h3>
            <p className="text-gray-600">
              Access top talent, find co-founders, and connect with investors to scale your vision.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">For Businesses & Investors</h3>
            <p className="text-gray-600">
              Discover emerging talent, support innovation, and build your portfolio with vetted opportunities.
            </p>
          </div>
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

export default AboutPage;