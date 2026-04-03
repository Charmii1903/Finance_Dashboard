'use client';

import { useState } from 'react';
import { BarChart3, Wallet, TrendingUp, Settings, Menu, X, Moon, Sun, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFinanceStore } from '@/store/finance';
import Link from 'next/link';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: BarChart3,
    href: '#dashboard',
    id: 'dashboard',
  },
  {
    label: 'Transactions',
    icon: Wallet,
    href: '#transactions',
    id: 'transactions',
  },
  {
    label: 'Insights',
    icon: TrendingUp,
    href: '#insights',
    id: 'insights',
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, setUserRole, isDarkMode, setIsDarkMode } = useFinanceStore();

  const handleRoleChange = (role: 'User' | 'admin') => {
    setUserRole(role);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-primary text-primary-foreground "
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-border z-40 transform transition-transform duration-300 md:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-purple-950 dark:text-white font-bold text-sm">💰</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-purple-950 dark:text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
