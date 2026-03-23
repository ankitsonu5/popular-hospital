'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Users, HeartPulse, Activity } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Payment', href: '/online-payment', icon: CreditCard },
    { label: 'Opinion', href: '/second-opinion', icon: Users },
    { label: 'Wellness', href: '/services/wellness-packages', icon: HeartPulse },
    { label: 'Health', href: '/services/health-packages', icon: Activity },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-between items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#3b82f6] text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              {isActive && (
                <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
