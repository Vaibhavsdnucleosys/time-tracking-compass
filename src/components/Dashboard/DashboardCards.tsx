
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Clock, CheckSquare, Users, TrendingUp } from 'lucide-react';

export const DashboardCards: React.FC = () => {
  const { user } = useAuth();

  const getCards = () => {
    if (user?.role === 'employee') {
      return [
        { title: 'Today\'s Hours', value: '7.5h', icon: Clock, color: 'text-blue-600' },
        { title: 'Active Tasks', value: '3', icon: CheckSquare, color: 'text-green-600' },
        { title: 'Completed Tasks', value: '12', icon: TrendingUp, color: 'text-purple-600' },
        { title: 'Pending Approvals', value: '1', icon: Clock, color: 'text-orange-600' },
      ];
    }

    return [
      { title: 'Active Projects', value: '8', icon: CheckSquare, color: 'text-blue-600' },
      { title: 'Team Members', value: '24', icon: Users, color: 'text-green-600' },
      { title: 'This Week Hours', value: '180h', icon: Clock, color: 'text-purple-600' },
      { title: 'Efficiency Rate', value: '94%', icon: TrendingUp, color: 'text-orange-600' },
    ];
  };

  const cards = getCards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
