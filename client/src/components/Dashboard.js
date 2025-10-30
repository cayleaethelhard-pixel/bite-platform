// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, DollarSign, TrendingUp, Users, Globe, Bell, 
  ArrowRight, MessageSquare, Search, Settings, Star, Video, User, Lock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../services/dashboard';

// Reusable Dashboard Widget Container
const DashboardWidget = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-2 rounded-lg mr-3">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

// Locked Widget Component (inside Dashboard so it can use navigate)
const LockedWidget = ({ title, icon: Icon, tierRequired, widgetTitle }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-center py-8">
        <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 mb-3">
          Unlock this feature with <span className="font-semibold">{tierRequired}</span>
        </p>
        <button
          onClick={() => {
            navigate('/settings', {
              state: { upgradeFrom: widgetTitle }
            });
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

const getWidgetIcon = (type) => {
  const iconMap = {
    analytics: TrendingUp,
    projects: Briefcase,
    certificates: Star,
    investors: DollarSign,
    matching: Users,
    pipeline: Users,
    portfolio: Briefcase,
    pitches: Video,
    activity: Bell,
    actions: ArrowRight,
    global: Globe
  };
  return iconMap[type] || Briefcase;
};

// Helper: Check if user has at least Pro access
const isPro = (tier) => tier !== 'Free';
const isCareerPlus = (tier) => tier === 'Career+';
const isProFounder = (tier) => tier === 'Pro Founder';
const isTalentPlus = (tier) => tier === 'Talent+';
const isProInvestor = (tier) => tier === 'Pro Investor';

const Dashboard = ({ userRole, authToken }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchDashboardData = async () => {
    if (!authToken) {
      setError('No authentication token provided');
      setLoading(false);
      return;
    }
    try {
      // ✅ Use your service instead of raw fetch
      const data = await dashboardApi.getDashboardData(authToken);
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };
  fetchDashboardData();
}, [authToken, userRole]);

  // Render widget based on tier
  const renderWidget = (widget, userTier) => {
    const Icon = getWidgetIcon(widget.type);

    // Student widgets
    if (widget.id === 'career-analytics') {
      return isPro(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
            <p className="text-lg font-semibold">{widget.data.message}</p>
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Pro Student"
          widgetTitle={widget.title}
        />
      );
    }

    if (widget.id === 'global-certificates') {
      return isCareerPlus(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">{widget.data.message}</p>
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Career+"
          widgetTitle={widget.title}
        />
      );
    }

    // Startup widgets
    if (widget.id === 'investor-discovery') {
      return isProFounder(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="space-y-3">
            {widget.data.map((investor, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-100 rounded-lg">
                <div className="bg-blue-200 rounded-full p-2 mr-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{investor.name}</h4>
                  <p className="text-gray-600 text-sm">{investor.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Pro Founder"
          widgetTitle={widget.title}
        />
      );
    }

    if (widget.id === 'tailored-matching' || widget.id === 'project-management') {
      return isPro(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">{widget.data.message}</p>
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Scale Faster"
          widgetTitle={widget.title}
        />
      );
    }

    // Business widgets
    if (widget.id === 'global-access') {
      return isTalentPlus(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">{widget.data.message}</p>
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Talent+"
          widgetTitle={widget.title}
        />
      );
    }

    if (widget.id === 'internship-pipeline' || widget.id === 'mentor-analytics') {
      return isPro(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="space-y-3">
            {widget.data.map((candidate, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">{candidate.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {candidate.status}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Talent+"
          widgetTitle={widget.title}
        />
      );
    }

    // Investor widgets
    if (widget.id === 'exclusive-pitches') {
      return isProInvestor(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="space-y-3">
            {widget.data.map((pitch, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-100 rounded-lg">
                <Video className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800">{pitch.title}</h4>
                  <p className="text-gray-600 text-sm">{pitch.stage}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Pro Investor"
          widgetTitle={widget.title}
        />
      );
    }

    if (widget.id === 'portfolio-tracking' || widget.id === 'investment-analytics') {
      return isPro(userTier) ? (
        <DashboardWidget title={widget.title} icon={Icon}>
          <div className="space-y-3">
            {widget.data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className={`text-sm font-semibold ${item.value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>
      ) : (
        <LockedWidget 
          title={widget.title} 
          icon={Icon} 
          tierRequired="Explorer"
          widgetTitle={widget.title}
        />
      );
    }

    // Base widgets (always shown)
    return (
      <DashboardWidget title={widget.title} icon={Icon}>
        {widget.type === 'projects' && (
          <div className="space-y-3">
            {widget.data.map((project, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">{project.title}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {widget.type === 'activity' && (
          <div className="space-y-3">
            {widget.data.map((activity, index) => (
              <div key={index} className="text-sm text-gray-600">
                <span className="font-medium">{activity.message}</span>
              </div>
            ))}
          </div>
        )}
        {widget.type === 'actions' && (
          <div className="space-y-3">
            {widget.data.map((action, index) => {
              const icons = {
                'Send Message': MessageSquare,
                'Find Matches': Search,
                'Upgrade Plan': Settings
              };
              const ActionIcon = icons[action] || ArrowRight;
              return (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <ActionIcon className="w-5 h-5 inline mr-2" />
                  {action}
                </button>
              );
            })}
          </div>
        )}
      </DashboardWidget>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const userTier = dashboardData?.user?.tier || 'Free';

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            Welcome, {dashboardData?.user?.full_name || userRole}!
          </h1>
          <p className="text-gray-600 mt-2">Your personalized dashboard for growth and collaboration</p>
        </div>
        {dashboardData?.dashboardWidgets && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dashboardData.dashboardWidgets.map((widget) => (
              <div key={widget.id}>
                {renderWidget(widget, userTier)}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;