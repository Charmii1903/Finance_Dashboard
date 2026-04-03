'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { BalanceTrend } from '@/components/dashboard/balance-trend';
import { SpendingBreakdown } from '@/components/dashboard/spending-breakdown';
import { TransactionsList } from '@/components/dashboard/transactions-list';
import { Insights } from '@/components/dashboard/insights';
import { AddTransaction } from '@/components/dashboard/add-transaction';
import { useFinanceStore } from '@/store/finance';
import { useEffect, useState } from 'react';

export default function Page() {
  const isDarkMode = useFinanceStore((state) => state.isDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [isDarkMode]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <DashboardHeader />
      <main className="md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Summary Section */}
            <section id="dashboard">
              <SummaryCards />
            </section>

            {/* Charts Section */}
            <div className="grid gap-8 lg:grid-cols-3">
              <BalanceTrend />
              <SpendingBreakdown />
            </div>

            {/* Insights Section */}
            <section id="insights">
              <Insights />
            </section>

            {/* Add Transaction Section */}
            <AddTransaction />

            {/* Transactions Section */}
            <section id="transactions">
              <TransactionsList />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
