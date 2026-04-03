'use client';

import { useFinanceStore } from '@/store/finance';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Shield, Eye } from 'lucide-react';

export function DashboardHeader() {
  const { isDarkMode, setIsDarkMode, userRole, setUserRole } =
    useFinanceStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">

      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />

          {/* Title */}
          <h1 className="text-2xl font-bold text-purple-950 dark:text-white ">
            Finance Dashboard
          </h1>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Role Switch */}
          <div className="flex items-center border rounded-lg p-1 text-purple-950 dark:text-white">
            <Button
              variant={userRole === 'User' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setUserRole('User')}
            >
              <Eye className="w-4 h-4 mr-1" />
              User
            </Button>

            <Button
              variant={userRole === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setUserRole('admin')}
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            color='purple-950'
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </Button>

        </div>
      </div>
    </header>
  );
}