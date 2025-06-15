
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, Zap } from 'lucide-react';

interface QuickAction {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  action: () => void;
  color: string;
  category: 'primary' | 'secondary';
}

interface FloatingActionMenuProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
  isVisible: boolean;
}

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  actions,
  onActionClick,
  isVisible
}) => {
  const primaryActions = actions.filter(a => a.category === 'primary');
  const secondaryActions = actions.filter(a => a.category === 'secondary');

  if (!isVisible) return null;

  return (
    <div className="mb-4 animate-scale-in">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden max-w-xs">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-600" />
              <span className="font-semibold text-gray-800 text-sm">Quick Actions</span>
            </div>
            <Badge variant="secondary" className="text-xs bg-teal-50 text-teal-700">
              {actions.length} actions
            </Badge>
          </div>
          
          {/* Primary Actions - 2x2 Grid */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Essential</p>
            <div className="grid grid-cols-2 gap-2">
              {primaryActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={() => onActionClick(action)}
                    className={`h-16 w-full rounded-xl text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-br ${action.color}`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium text-center leading-tight">
                        {action.label.split(' ')[0]}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Secondary Actions - Compact List */}
          <div>
            <p className="text-xs text-gray-500 mb-2">More Actions</p>
            <div className="space-y-1">
              {secondaryActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={() => onActionClick(action)}
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 text-left hover:bg-gray-50"
                  >
                    <Icon className="w-3 h-3 mr-2" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingActionMenu;
