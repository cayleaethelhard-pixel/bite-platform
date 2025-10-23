// src/pages/MatchesPage.js
import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Heart, Star, GraduationCap, Building, Briefcase, DollarSign, Search } from 'lucide-react';

const MatchesPage = ({ userRole, authToken }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock match data based on user role
  const getMockMatches = (role) => {
    switch (role) {
      case 'student':
        return [
          {
            id: 1,
            name: 'Tech Innovations Inc.',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/4F46E5/white?text=TI',
            description: 'AI-powered healthcare platform seeking frontend developers',
            matchScore: 92,
            tier: 'Pro Founder',
            location: 'San Francisco, CA',
            tags: ['React', 'TypeScript', 'Healthcare']
          },
          {
            id: 2,
            name: 'Global Enterprises',
            role: 'business',
            avatar: 'https://placehold.co/100x100/059669/white?text=GE',
            description: 'Summer internship program for CS students',
            matchScore: 87,
            tier: 'Talent+',
            location: 'New York, NY',
            tags: ['Java', 'Cloud', 'Finance']
          }
        ];
      case 'startup':
        return [
          {
            id: 1,
            name: 'Alex Johnson',
            role: 'student',
            avatar: 'https://placehold.co/100x100/DC2626/white?text=AJ',
            description: 'CS student at Stanford, React & Node.js expert',
            matchScore: 89,
            tier: 'Pro Student',
            location: 'Stanford, CA',
            tags: ['React', 'Node.js', 'MongoDB']
          },
          {
            id: 2,
            name: 'Venture Capital Partners',
            role: 'investor',
            avatar: 'https://placehold.co/100x100/7C3AED/white?text=VCP',
            description: 'Early-stage tech investor focused on AI/ML',
            matchScore: 78,
            tier: 'Pro Investor',
            location: 'Boston, MA',
            tags: ['Series A', 'AI', 'SaaS']
          }
        ];
      case 'business':
        return [
          {
            id: 1,
            name: 'Sarah Miller',
            role: 'student',
            avatar: 'https://placehold.co/100x100/EA580C/white?text=SM',
            description: 'MBA student with marketing background',
            matchScore: 85,
            tier: 'Career+',
            location: 'Chicago, IL',
            tags: ['Marketing', 'Analytics', 'MBA']
          },
          {
            id: 2,
            name: 'GreenTech Solutions',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/0D9488/white?text=GTS',
            description: 'Sustainable energy startup seeking corporate partners',
            matchScore: 82,
            tier: 'Scale Faster',
            location: 'Austin, TX',
            tags: ['CleanTech', 'Partnerships', 'ESG']
          }
        ];
      case 'investor':
        return [
          {
            id: 1,
            name: 'AI Healthcare Platform',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/BE123C/white?text=AHP',
            description: 'Series A startup using AI for medical diagnostics',
            matchScore: 94,
            tier: 'Pro Founder',
            location: 'Boston, MA',
            tags: ['AI', 'Healthcare', 'Series A']
          },
          {
            id: 2,
            name: 'FinTech Innovators',
            role: 'startup',
            avatar: 'https://placehold.co/100x100/0891B2/white?text=FTI',
            description: 'Blockchain-based payment solution',
            matchScore: 88,
            tier: 'Scale Faster',
            location: 'Miami, FL',
            tags: ['Blockchain', 'Payments', 'Seed']
          }
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    // Simulate API call
    const fetchMatches = async () => {
      try {
        // In real implementation:
        // const response = await fetch('/api/matches', {
        //   headers: { Authorization: `Bearer ${authToken}` }
        // });
        // const data = await response.json();
        
        const mockData = getMockMatches(userRole);
        setMatches(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userRole, authToken]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'startup': return <Building className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'investor': return <DollarSign className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'high' && match.matchScore >= 90) ||
                         (activeFilter === 'saved' && match.isSaved);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Finding your perfect matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'student' && 'Discover startups and businesses looking for talent like you'}
            {userRole === 'startup' && 'Find talented students and potential investors'}
            {userRole === 'business' && 'Connect with students and innovative startups'}
            {userRole === 'investor' && 'Discover promising startups seeking investment'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search matches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Matches
              </button>
              <button
                onClick={() => setActiveFilter('high')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'high' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                High Compatibility
              </button>
            </div>
          </div>
        </div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'We\'re still finding the perfect matches for you. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <img 
                    src={match.avatar} 
                    alt={match.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{match.name}</h3>
                      <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {getRoleIcon(match.role)}
                        <span className="ml-1 capitalize">{match.role}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{match.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{match.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {match.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-900">{match.matchScore}%</span>
                    <span className="text-xs text-gray-500 ml-1">compatibility</span>
                  </div>
                  {match.tier !== 'Free' && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {match.tier}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;