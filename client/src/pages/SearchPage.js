// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, GraduationCap, Building, Briefcase, DollarSign, Star, Users } from 'lucide-react';

const SearchPage = ({ userRole, authToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get search filters based on user role
  const getSearchFilters = (role) => {
    switch (role) {
      case 'student':
        return {
          type: ['startup', 'business'],
          location: '',
          industry: '',
          roleType: ''
        };
      case 'startup':
        return {
          type: ['student', 'investor'],
          location: '',
          skills: '',
          investmentStage: '',
          industry: ''
        };
      case 'business':
        return {
          type: ['student', 'startup'],
          location: '',
          skills: '',
          industry: '',
          companySize: ''
        };
      case 'investor':
        return {
          type: ['startup'],
          location: '',
          industry: '',
          fundingStage: '',
          teamSize: ''
        };
      default:
        return {};
    }
  };

  // Mock search results based on user role
  const getMockResults = (role) => {
    switch (role) {
      case 'student':
        return [
          {
            id: 1,
            name: 'Tech Innovations Inc.',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/4F46E5/white?text=TI',
            description: 'AI-powered healthcare platform seeking frontend developers',
            matchScore: 92,
            location: 'San Francisco, CA',
            industry: 'Healthcare',
            tags: ['React', 'TypeScript', 'Healthcare']
          },
          {
            id: 2,
            name: 'Global Enterprises',
            type: 'business',
            avatar: 'https://placehold.co/100x100/059669/white?text=GE',
            description: 'Summer internship program for CS students',
            matchScore: 87,
            location: 'New York, NY',
            industry: 'Finance',
            tags: ['Java', 'Cloud', 'Finance']
          },
          {
            id: 3,
            name: 'FinTech Solutions',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/0891B2/white?text=FTS',
            description: 'Blockchain payment platform looking for interns',
            matchScore: 85,
            location: 'Miami, FL',
            industry: 'Fintech',
            tags: ['Blockchain', 'JavaScript', 'Payments']
          }
        ];
      case 'startup':
        return [
          {
            id: 1,
            name: 'Alex Johnson',
            type: 'student',
            avatar: 'https://placehold.co/100x100/DC2626/white?text=AJ',
            description: 'CS student at Stanford, React & Node.js expert',
            matchScore: 89,
            location: 'Stanford, CA',
            skills: ['React', 'Node.js', 'MongoDB'],
            degree: 'Computer Science'
          },
          {
            id: 2,
            name: 'Venture Capital Partners',
            type: 'investor',
            avatar: 'https://placehold.co/100x100/7C3AED/white?text=VCP',
            description: 'Early-stage tech investor focused on AI/ML',
            matchScore: 78,
            location: 'Boston, MA',
            focus: 'AI/ML',
            stage: 'Series A'
          },
          {
            id: 3,
            name: 'Maria Rodriguez',
            type: 'student',
            avatar: 'https://placehold.co/100x100/EA580C/white?text=MR',
            description: 'Data Science student with Python & ML experience',
            matchScore: 83,
            location: 'Austin, TX',
            skills: ['Python', 'Machine Learning', 'SQL'],
            degree: 'Data Science'
          }
        ];
      case 'business':
        return [
          {
            id: 1,
            name: 'Sarah Miller',
            type: 'student',
            avatar: 'https://placehold.co/100x100/EA580C/white?text=SM',
            description: 'MBA student with marketing background',
            matchScore: 85,
            location: 'Chicago, IL',
            skills: ['Marketing', 'Analytics', 'MBA'],
            degree: 'Business Administration'
          },
          {
            id: 2,
            name: 'GreenTech Solutions',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/0D9488/white?text=GTS',
            description: 'Sustainable energy startup seeking corporate partners',
            matchScore: 82,
            location: 'Austin, TX',
            industry: 'CleanTech',
            size: '10-50 employees'
          },
          {
            id: 3,
            name: 'David Chen',
            type: 'student',
            avatar: 'https://placehold.co/100x100/BE123C/white?text=DC',
            description: 'Software Engineering student with full-stack experience',
            matchScore: 88,
            location: 'Seattle, WA',
            skills: ['JavaScript', 'Python', 'AWS'],
            degree: 'Software Engineering'
          }
        ];
      case 'investor':
        return [
          {
            id: 1,
            name: 'AI Healthcare Platform',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/BE123C/white?text=AHP',
            description: 'Series A startup using AI for medical diagnostics',
            matchScore: 94,
            location: 'Boston, MA',
            industry: 'Healthcare',
            stage: 'Series A',
            teamSize: '15'
          },
          {
            id: 2,
            name: 'FinTech Innovators',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/0891B2/white?text=FTI',
            description: 'Blockchain-based payment solution',
            matchScore: 88,
            location: 'Miami, FL',
            industry: 'Fintech',
            stage: 'Seed',
            teamSize: '8'
          },
          {
            id: 3,
            name: 'EdTech Revolution',
            type: 'startup',
            avatar: 'https://placehold.co/100x100/7C3AED/white?text=ETR',
            description: 'Online learning platform with 50K+ users',
            matchScore: 86,
            location: 'Denver, CO',
            industry: 'Education',
            stage: 'Series A',
            teamSize: '12'
          }
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    // Initialize filters
    setFilters(getSearchFilters(userRole));
    
    // Simulate API call
    const fetchSearchResults = async () => {
      try {
        // In real implementation:
        // const response = await fetch('/api/search', {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${authToken}`
        //   },
        //   body: JSON.stringify({ searchTerm, filters })
        // });
        // const data = await response.json();
        
        const mockData = getMockResults(userRole);
        setResults(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [userRole, authToken]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // In real implementation, call API with new filters
    setTimeout(() => setLoading(false), 500);
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'startup': return <Building className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'investor': return <DollarSign className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Searching for opportunities...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search</h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'student' && 'Find startups and businesses that match your skills and career goals'}
            {userRole === 'startup' && 'Discover talented students and potential investors'}
            {userRole === 'business' && 'Search for students and innovative startups'}
            {userRole === 'investor' && 'Find promising startups seeking investment'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              <Search className="w-4 h-4 mr-1" />
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="space-y-2">
                    {filters.type?.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={() => {}} // In real implementation, handle type filtering
                        />
                        <span className="ml-2 text-sm capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, State, or Country"
                      value={filters.location || ''}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Role-specific filters */}
                {userRole === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select
                        value={filters.industry || ''}
                        onChange={(e) => handleFilterChange('industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Industries</option>
                        <option value="tech">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role Type</label>
                      <select
                        value={filters.roleType || ''}
                        onChange={(e) => handleFilterChange('roleType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Types</option>
                        <option value="internship">Internship</option>
                        <option value="project">Project</option>
                        <option value="mentorship">Mentorship</option>
                      </select>
                    </div>
                  </>
                )}

                {userRole === 'startup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                      <input
                        type="text"
                        placeholder="e.g., React, Python, Design"
                        value={filters.skills || ''}
                        onChange={(e) => handleFilterChange('skills', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Stage</label>
                      <select
                        value={filters.investmentStage || ''}
                        onChange={(e) => handleFilterChange('investmentStage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Stages</option>
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="series-a">Series A</option>
                      </select>
                    </div>
                  </>
                )}

                {userRole === 'business' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                      <input
                        type="text"
                        placeholder="e.g., Marketing, Engineering, Design"
                        value={filters.skills || ''}
                        onChange={(e) => handleFilterChange('skills', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                      <select
                        value={filters.companySize || ''}
                        onChange={(e) => handleFilterChange('companySize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Sizes</option>
                        <option value="1-50">1-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="200+">200+ employees</option>
                      </select>
                    </div>
                  </>
                )}

                {userRole === 'investor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage</label>
                      <select
                        value={filters.fundingStage || ''}
                        onChange={(e) => handleFilterChange('fundingStage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Stages</option>
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="series-a">Series A</option>
                        <option value="series-b">Series B+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                      <select
                        value={filters.teamSize || ''}
                        onChange={(e) => handleFilterChange('teamSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Sizes</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleSearch}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Relevance</option>
                  <option>Match Score</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms or filters' 
                    : 'We couldn\'t find any matches with your current filters'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div key={result.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start">
                      <img 
                        src={result.avatar} 
                        alt={result.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-900">{result.name}</h3>
                          <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {getTypeIcon(result.type)}
                            <span className="ml-1 capitalize">{result.type}</span>
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{result.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(result.tags || result.skills)?.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {result.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="font-semibold text-gray-900">{result.matchScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Profile
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;