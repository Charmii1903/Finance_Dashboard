'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'User' | 'admin';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

interface FinanceStore {
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Filters
  selectedCategory: string | null;
  selectedType: 'all' | 'income' | 'expense';
  searchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedType: (type: 'all' | 'income' | 'expense') => void;
  setSearchQuery: (query: string) => void;

  // Role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Dark mode
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-12-28'),
    amount: 45000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary'
  },
  {
    id: '2',
    date: new Date('2024-12-27'),
    amount: 12000,
    category: 'Housing',
    type: 'expense',
    description: 'Rent payment'
  },
  {
    id: '3',
    date: new Date('2024-12-26'),
    amount: 850,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly groceries'
  },
  {
    id: '4',
    date: new Date('2024-12-25'),
    amount: 520,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets and dinner'
  },
  {
    id: '5',
    date: new Date('2024-12-24'),
    amount: 2000,
    category: 'Freelance',
    type: 'income',
    description: 'Project payment'
  },
  {
    id: '6',
    date: new Date('2024-12-23'),
    amount: 1500,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity and water'
  },
  {
    id: '7',
    date: new Date('2024-12-22'),
    amount: 700,
    category: 'Transportation',
    type: 'expense',
    description: 'Gas and car maintenance'
  },
  {
    id: '8',
    date: new Date('2024-12-21'),
    amount: 600,
    category: 'Healthcare',
    type: 'expense',
    description: 'Doctor appointment and medications'
  },
  {
    id: '9',
    date: new Date('2024-12-20'),
    amount: 450,
    category: 'Entertainment',
    type: 'expense',
    description: 'Streaming subscriptions'
  },
  {
    id: '10',
    date: new Date('2024-12-19'),
    amount: 500,
    category: 'Dining',
    type: 'expense',
    description: 'Restaurant meals'
  },
];

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      selectedCategory: null,
      selectedType: 'all',
      searchQuery: '',

      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedType: (type) => set({ selectedType: type }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      userRole: 'User',
      setUserRole: (role) => set({ userRole: role }),

      isDarkMode: false,
      setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'finance-store',
      partialize: (state) => ({
        userRole: state.userRole,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
