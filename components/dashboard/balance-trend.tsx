'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinanceStore } from '@/store/finance';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BalanceTrend() {
  const transactions = useFinanceStore((state) => state.transactions);

  const chartData = useMemo(() => {
    const sortedTx = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = 0;
    return sortedTx.map((tx) => {
      runningBalance += tx.type === 'income' ? tx.amount : -tx.amount;
      return {
        date: new Date(tx.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        balance: runningBalance,
      };
    });
  }, [transactions]);

  return (
    <Card className="border-0 shadow-sm col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg text-purple-950 dark:text-white">Balance Trend</CardTitle>
        <CardDescription className='text-purple-800 dark:text-white'>Your balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground dark:text-white"
                  stroke="currentColor"
                />
                <YAxis
                  className="text-xs text-muted-foreground dark:text-white"
                  stroke="currentColor"
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}`,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--primary)"
                  dot={{
                    fill: 'var(--primary)',
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-purple-950 dark:text-white">No transactions yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
