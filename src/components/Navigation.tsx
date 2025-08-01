import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, History, User, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: Search, label: 'Discover' },
    { path: '/emotion-input', icon: Heart, label: 'Mood' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/player', icon: Headphones, label: 'Player' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// Desktop Sidebar
export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: Search, label: 'Discover' },
    { path: '/emotion-input', icon: Heart, label: 'Analyze Mood' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/player', icon: Headphones, label: 'Player' },
    { path: '/about', icon: User, label: 'About' }
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-sidebar-bg border-r border-border flex-col z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Headphones size={20} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MoodTune</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Navigation;