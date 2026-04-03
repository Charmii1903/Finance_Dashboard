'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFinanceStore } from '@/store/finance';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Housing',
  'Groceries',
  'Entertainment',
  'Utilities',
  'Transportation',
  'Healthcare',
  'Dining',
  'Other',
];

export function AddTransaction() {
  const { addTransaction, userRole } = useFinanceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: CATEGORIES[0],
    type: 'expense' as 'income' | 'expense',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    try {
      addTransaction({
        date: new Date(formData.date),
        amount: parseFloat(formData.amount),
        category: formData.category,
        type: formData.type,
        description: formData.description,
      });

      toast.success(`Transaction added successfully!`);

      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: CATEGORIES[0],
        type: 'expense',
        description: '',
      });
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm col-span-full">
      <CardHeader>
        <CardTitle className="text-lg text-purple-950 dark:text-white">Add Transaction</CardTitle>
        <CardDescription className='text-purple-800 dark:text-white'>Create a new transaction </CardDescription>
      </CardHeader>
      <CardContent>
        {!isOpen ? (
          <Button onClick={() => setIsOpen(true)} className="gap-2 dark:text-white ">
            <Plus className="w-4 h-4 dark:text-white" />
            Add New Transaction
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 text-purple-950 dark:text-white">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="mt-2 text-purple-950 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-950 dark:text-white">Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="mt-2 text-purple-950 dark:text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-950 dark:text-white">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'income' | 'expense',
                    })
                  }
                  className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-purple-950 dark:text-white text-sm"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-950 dark:text-white">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-purple-950 dark:text-white text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-purple-950 dark:text-white">Description</label>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-2text-purple-950 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end text-purple-950 dark:text-white">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
