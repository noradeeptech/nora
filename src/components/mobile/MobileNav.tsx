import { Home, Bookmark, User, MessageSquare } from 'lucide-react';

interface MobileNavProps {
  active: 'home' | 'saved' | 'messages' | 'profile';
  onNavigate: (tab: string) => void;
  userType?: 'student' | 'professor';
}

export function MobileNav({ active, onNavigate, userType = 'student' }: MobileNavProps) {
  const studentTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const professorTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const tabs = userType === 'student' ? studentTabs : professorTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-colors ${
                isActive ? 'text-[#7C3AED]' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
