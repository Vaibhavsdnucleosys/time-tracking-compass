
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Clock, CheckSquare, Users, TrendingUp, Target, Award } from 'lucide-react';

export const DashboardCards: React.FC = () => {
  const { user } = useAuth();

  const getCards = () => {
    if (user?.role === 'employee') {
      return [
        { 
          title: 'Today\'s Hours', 
          value: '7.5h', 
          icon: Clock, 
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'from-blue-50 to-cyan-50',
          change: '+0.5h',
          changeType: 'positive'
        },
        { 
          title: 'Active Tasks', 
          value: '3', 
          icon: CheckSquare, 
          gradient: 'from-green-500 to-emerald-500',
          bgGradient: 'from-green-50 to-emerald-50',
          change: '+1',
          changeType: 'positive'
        },
        { 
          title: 'Completed Tasks', 
          value: '12', 
          icon: Award, 
          gradient: 'from-purple-500 to-pink-500',
          bgGradient: 'from-purple-50 to-pink-50',
          change: '+3',
          changeType: 'positive'
        },
        { 
          title: 'Pending Approvals', 
          value: '1', 
          icon: Clock, 
          gradient: 'from-orange-500 to-red-500',
          bgGradient: 'from-orange-50 to-red-50',
          change: '0',
          changeType: 'neutral'
        },
      ];
    }

    return [
      { 
        title: 'Active Projects', 
        value: '8', 
        icon: Target, 
        gradient: 'from-blue-500 to-cyan-500',
        bgGradient: 'from-blue-50 to-cyan-50',
        change: '+2',
        changeType: 'positive'
      },
      { 
        title: 'Team Members', 
        value: '24', 
        icon: Users, 
        gradient: 'from-green-500 to-emerald-500',
        bgGradient: 'from-green-50 to-emerald-50',
        change: '+3',
        changeType: 'positive'
      },
      { 
        title: 'This Week Hours', 
        value: '180h', 
        icon: Clock, 
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'from-purple-50 to-pink-50',
        change: '+15h',
        changeType: 'positive'
      },
      { 
        title: 'Efficiency Rate', 
        value: '94%', 
        icon: TrendingUp, 
        gradient: 'from-orange-500 to-red-500',
        bgGradient: 'from-orange-50 to-red-50',
        change: '+2%',
        changeType: 'positive'
      },
    ];
  };

  const cards = getCards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <span className={`text-sm font-medium ${
                      card.changeType === 'positive' ? 'text-green-600' : 
                      card.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.bgGradient} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
