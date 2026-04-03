'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinanceStore } from '@/store/finance';
import { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';

export function Insights() {
  const transactions = useFinanceStore((state) => state.transactions);

  const insights = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    const incomeByMonth: Record<string, number> = {};
    const expenseByMonth: Record<string, number> = {};

    transactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });

      if (tx.type === 'expense') {
        expensesByCategory[tx.category] =
          (expensesByCategory[tx.category] || 0) + tx.amount;
        expenseByMonth[month] = (expenseByMonth[month] || 0) + tx.amount;
      } else {
        incomeByMonth[month] = (incomeByMonth[month] || 0) + tx.amount;
      }
    });

    // Find highest spending category
    const highestSpendingCategory = Object.entries(expensesByCategory).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // Calculate monthly comparison
    const months = Array.from(new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])).sort();
    const lastMonth = months[months.length - 1];
    const secondLastMonth = months[months.length - 2];

    const lastMonthExpense = expenseByMonth[lastMonth] || 0;
    const secondLastMonthExpense = expenseByMonth[secondLastMonth] || 0;

    const savingsRate =
      transactions.length > 0
        ? (
            ((Object.values(incomeByMonth).reduce((a, b) => a + b, 0) -
              Object.values(expenseByMonth).reduce((a, b) => a + b, 0)) /
              Object.values(incomeByMonth).reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(1)
        : 0;

    return {
      highestSpendingCategory: highestSpendingCategory
        ? {
            category: highestSpendingCategory[0],
            amount: highestSpendingCategory[1],
          }
        : null,
      monthlyComparison:
        lastMonth && secondLastMonth
          ? {
              lastMonth,
              secondLastMonth,
              lastMonthExpense,
              secondLastMonthExpense,
              change:
                ((lastMonthExpense - secondLastMonthExpense) /
                  secondLastMonthExpense) *
                100,
            }
          : null,
      savingsRate: savingsRate,
    };
  }, [transactions]);

  return (
    <Card className="border-0 shadow-sm col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-lg text-purple-950 dark:text-white">Insights</CardTitle>
            <CardDescription className='text-purple-800 dark:text-white'>Key observations about your finances</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Highest Spending Category */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary">
            <p className="text-sm font-medium text-purple-950 dark:text-white mb-2">
              Highest Spending Category
            </p>
            {insights.highestSpendingCategory ? (
              <>
                <p className="text-xl font-bold text-purple-950 dark:text-white">
                  {insights.highestSpendingCategory.category}
                </p>
                <p className="text-sm text-purple-950 dark:text-white mt-1">
                  ${insights.highestSpendingCategory.amount.toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </>
            ) : (
              <p className="text-sm text-purple-950 dark:text-white">No data available</p>
            )}
          </div>

          {/* Monthly Comparison */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary">
            <p className="text-sm font-medium text-purple-950 dark:text-white mb-2">
              Monthly Trend
            </p>
            {insights.monthlyComparison ? (
              <>
                <p className="text-lg font-bold text-purple-950 dark:text-white">
                  {insights.monthlyComparison.change > 0 ? '↑' : '↓'}
                  {Math.abs(insights.monthlyComparison.change).toFixed(1)}%
                </p>
                <p className="text-xs text-purple-950 dark:text-white mt-1">
                  vs {insights.monthlyComparison.secondLastMonth}
                </p>
              </>
            ) : (
              <p className="text-sm text-purple-950 dark:text-white">No data available</p>
            )}
          </div>

          {/* Savings Rate */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary">
            <p className="text-sm font-medium text-purple-950 dark:text-white mb-2">
              Savings Rate
            </p>
            <p className="text-xl font-bold text-purple-950 dark:text-white">
              {insights.savingsRate}%
            </p>
            <p className="text-xs text-purple-950 dark:text-white mt-1">
              {Number(insights.savingsRate) > 0 ? 'Great!' : 'Work in progress'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
