// src/pages/AnalyticsPage.js
import React, { useState } from 'react';
import { TrendingUp, Download, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsPage = ({ userRole, authToken }) => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data based on user role
  const getAnalyticsData = (role) => {
    switch (role) {
      case 'student':
        return {
          kpis: [
            { label: 'Applications Sent', value: 12, change: '+20%' },
            { label: 'Interviews Scheduled', value: 5, change: '+25%' },
            { label: 'Match Quality Score', value: '87%', change: '+5%' },
            { label: 'Profile Views', value: 45, change: '+30%' }
          ],
          engagementData: [
            { date: 'Jan', views: 24, applications: 3 },
            { date: 'Feb', views: 30, applications: 4 },
            { date: 'Mar', views: 28, applications: 3 },
            { date: 'Apr', views: 45, applications: 5 },
            { date: 'May', views: 38, applications: 4 },
            { date: 'Jun', views: 42, applications: 6 }
          ],
          skillDemand: [
            { skill: 'React', demand: 85 },
            { skill: 'Python', demand: 78 },
            { skill: 'Machine Learning', demand: 72 },
            { skill: 'JavaScript', demand: 68 },
            { skill: 'TypeScript', demand: 65 }
          ]
        };
      case 'startup':
        return {
          kpis: [
            { label: 'Talent Matches', value: 28, change: '+15%' },
            { label: 'Investor Views', value: 12, change: '+40%' },
            { label: 'Project Progress', value: '75%', change: '+10%' },
            { label: 'Team Size', value: 8, change: '+2' }
          ],
          pipelineData: [
            { stage: 'Applied', count: 45 },
            { stage: 'Screened', count: 28 },
            { stage: 'Interviewed', count: 15 },
            { stage: 'Offered', count: 8 },
            { stage: 'Hired', count: 5 }
          ],
          investorInterest: [
            { month: 'Jan', views: 3, meetings: 1 },
            { month: 'Feb', views: 5, meetings: 2 },
            { month: 'Mar', views: 4, meetings: 1 },
            { month: 'Apr', views: 8, meetings: 3 },
            { month: 'May', views: 6, meetings: 2 },
            { month: 'Jun', views: 12, meetings: 4 }
          ]
        };
      case 'business':
        return {
          kpis: [
            { label: 'Active Interns', value: 15, change: '+3' },
            { label: 'Mentorship Sessions', value: 42, change: '+25%' },
            { label: 'Talent Acquisition', value: '85%', change: '+8%' },
            { label: 'Program Satisfaction', value: '4.7/5', change: '+0.2' }
          ],
          internPerformance: [
            { intern: 'John D.', projects: 3, rating: 4.8 },
            { intern: 'Sarah M.', projects: 4, rating: 4.9 },
            { intern: 'Alex J.', projects: 2, rating: 4.6 },
            { intern: 'Maria R.', projects: 5, rating: 4.7 }
          ],
          programMetrics: [
            { month: 'Jan', interns: 10, satisfaction: 4.5 },
            { month: 'Feb', interns: 12, satisfaction: 4.6 },
            { month: 'Mar', interns: 14, satisfaction: 4.7 },
            { month: 'Apr', interns: 15, satisfaction: 4.7 },
            { month: 'May', interns: 15, satisfaction: 4.7 },
            { month: 'Jun', interns: 15, satisfaction: 4.7 }
          ]
        };
      case 'investor':
        return {
          kpis: [
            { label: 'Portfolio Value', value: '$2.8M', change: '+12%' },
            { label: 'Active Deals', value: 8, change: '+2' },
            { label: 'ROI', value: '24%', change: '+3%' },
            { label: 'Startup Meetings', value: 15, change: '+5' }
          ],
          portfolioPerformance: [
            { startup: 'AI Health', value: 1200000, change: '+15%' },
            { startup: 'FinTech Pro', value: 800000, change: '+8%' },
            { startup: 'GreenTech', value: 500000, change: '-2%' },
            { startup: 'EdTech Now', value: 300000, change: '+25%' }
          ],
          dealFlow: [
            { month: 'Jan', pitches: 12, meetings: 5 },
            { month: 'Feb', pitches: 15, meetings: 6 },
            { month: 'Mar', pitches: 18, meetings: 8 },
            { month: 'Apr', pitches: 22, meetings: 10 },
            { month: 'May', pitches: 25, meetings: 12 },
            { month: 'Jun', pitches: 28, meetings: 15 }
          ]
        };
      default:
        return {
          kpis: [],
          engagementData: []
        };
    }
  };

  const analytics = getAnalyticsData(userRole);

  const renderStudentAnalytics = () => (
    <div className="space-y-6">
      {/* Engagement Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Profile Engagement & Applications
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Demand */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top In-Demand Skills</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.skillDemand} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="skill" />
              <Tooltip />
              <Bar dataKey="demand" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderStartupAnalytics = () => (
    <div className="space-y-6">
      {/* Talent Pipeline */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Talent Pipeline</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investor Interest */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Investor Interest Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.investorInterest}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={2} name="Profile Views" />
              <Line type="monotone" dataKey="meetings" stroke="#EF4444" strokeWidth={2} name="Meetings Scheduled" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderBusinessAnalytics = () => (
    <div className="space-y-6">
      {/* Program Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Program Metrics Over Time</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.programMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="interns" stroke="#4F46E5" strokeWidth={2} name="Active Interns" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} name="Satisfaction Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Interns */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Interns</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.internPerformance.map((intern, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{intern.intern}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.projects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {intern.rating}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvestorAnalytics = () => (
    <div className="space-y-6">
      {/* Portfolio Performance */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Portfolio Performance</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.portfolioPerformance.map((startup, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{startup.startup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${startup.value.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${startup.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {startup.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Flow */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Deal Flow Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.dealFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pitches" fill="#4F46E5" name="Pitches Received" />
              <Bar dataKey="meetings" fill="#10B981" name="Meetings Held" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'student' && 'Track your application success and skill demand'}
            {userRole === 'startup' && 'Monitor your talent pipeline and investor interest'}
            {userRole === 'business' && 'Analyze your internship program performance'}
            {userRole === 'investor' && 'Track your portfolio performance and deal flow'}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.kpis.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${kpi.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {kpi.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Range Filter */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Role-specific analytics */}
        {userRole === 'student' && renderStudentAnalytics()}
        {userRole === 'startup' && renderStartupAnalytics()}
        {userRole === 'business' && renderBusinessAnalytics()}
        {userRole === 'investor' && renderInvestorAnalytics()}
      </div>
    </div>
  );
};

export default AnalyticsPage;