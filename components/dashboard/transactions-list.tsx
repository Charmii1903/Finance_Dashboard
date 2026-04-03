'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFinanceStore } from '@/store/finance';
import { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function TransactionsList() {
  const {
    transactions,
    deleteTransaction,
    userRole,
    selectedCategory,
    selectedType,
    searchQuery,
    setSelectedCategory,
    setSelectedType,
    setSearchQuery,
  } = useFinanceStore();

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const handleDelete = (transactionId: string) => {
    try {
      deleteTransaction(transactionId);
      toast.success('Transaction deleted successfully');
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (selectedCategory) {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((t) => t.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

    return filtered;
  }, [transactions, selectedCategory, selectedType, searchQuery, sortBy]);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))];
  }, [transactions]);

  return (
    <Card className="border-0 shadow-sm col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-purple-950 dark:text-white">Transactions</CardTitle>
            <CardDescription className='text-purple-800 dark:text-white'>Manage your financial transactions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-purple-950 dark:text-white">Search</label>
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2 text-purple-800 dark:text-white"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-purple-950 dark:text-white">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-purple-800 dark:text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-purple-950 dark:text-white">Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) =>
                  setSelectedCategory(e.target.value || null)
                }
                className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-purple-800 dark:text-white text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-purple-950 dark:text-white">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background  text-purple-800 dark:text-white text-sm"
              >
                <option value="date">Date (Newest)</option>
                <option value="amount">Amount (Highest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="w-full text-sm text-purple-950 dark:text-white">
              <thead className="border-b">
                <tr className=" text-xs font-medium text-purple-950 dark:text-white">
                  <th className="text-left py-3 px-0">Date</th>
                  <th className="text-left py-3 px-0">Description</th>
                  <th className="text-left py-3 px-0">Category</th>
                  <th className="text-left py-3 px-0">Type</th>
                  <th className="text-right py-3 px-0">Amount</th>
                  {userRole === 'admin' && (
                    <th className="text-right py-3 px-0">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-0 whitespace-nowrap">
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-0">
                      <p className="font-medium">{tx.description}</p>
                    </td>
                    <td className="py-3 px-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-purple-800 dark:text-white bg-secondary ">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3 px-0">
                      <div className="flex items-center gap-1">
                        {tx.type === 'income' ? (
                          <>
                            <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-600 dark:text-green-400">
                              Income
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownLeft className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span className="text-red-600 dark:text-red-400">
                              Expense
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-right font-medium">
                      {tx.type === 'income' ? '+' : '-'}
                      {tx.amount.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    {userRole === 'admin' && (
                      <td className="py-3 px-0 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(tx.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <p className=" text-purple-950 dark:text-white">No transactions found</p>
            </div>
          )}
        </div>

        <p className="text-xs text-purple-950 dark:text-white text-center">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
      </CardContent>
    </Card>
  );
}
