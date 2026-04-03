# Finance Dashboard

A comprehensive finance management dashboard built with Next.js and Zustand. Track your income, expenses, and financial insights with an elegant purple and white theme.

::: Features

 1. Dashboard Overview
- Summary Cards: Display total balance, income, and expenses at a glance
- Balance Trend Chart: Interactive line chart showing balance changes over time
- **Spending Breakdown**: Pie chart visualization of expenses by category

 2. Transactions Management
- Complete Transaction List: View all transactions with date, amount, category, and type
- Advanced Filtering: 
  - Search by description or category
  - Filter by transaction type (income/expense)
  - Filter by category
  - Sort by date or amount
- **Admin Actions**: Delete transactions (admin role only)

 3. Role-Based Access Control
- Viewer Role: Read-only access to all financial data
- Admin Role: Full access including ability to add and delete transactions
- Role Switcher: Easy switching between roles via header toggle

 4. Financial Insights
- Highest Spending Category: Identifies your top expense category
- Monthly Trend: Compare spending between months
- Savings Rate: Calculate your overall savings percentage

 5. Additional Features
- Dark Mode: Toggle between light and dark themes
- Responsive Design: Works seamlessly on desktop, tablet, and mobile
- Data Persistence: Transactions and preferences saved to localStorage
- Empty States: Graceful handling of empty data

:: Architecture

:: State Management
Uses Zustand with localStorage persistence for managing:
- Transactions CRUD operations
- Filter and search state
- User role selection
- Dark mode preference

:: Components

components/dashboard/
├── header.tsx              # Header with role switcher and dark mode
├── summary-cards.tsx       # Summary cards component
├── balance-trend.tsx       # Balance trend line chart
├── spending-breakdown.tsx  # Spending breakdown pie chart
├── transactions-list.tsx   # Filterable transactions table
├── insights.tsx           # Financial insights cards
└── add-transaction.tsx    # Add transaction form (admin only)


:: Store Structure
Located in `store/finance.ts`



:: Installation
```bash
npm install
# or
pnpm install
```

 Running the Dashboard
```bash
npm run dev
```

Visit `http://localhost:3000` to view the dashboard.

:: Mock Data

The dashboard comes with 10 pre-loaded transactions covering:
- Salary and freelance income
- Housing, groceries, entertainment expenses
- Utilities, transportation, and healthcare
- Dining and other categories

Switch to Admin role to see the "Add Transaction" form and start adding your own data.

::: Usage Guide

:: Viewing Transactions
1. The transactions table displays all your transactions
2. Use the Search field to find transactions by description
3. Filter by Type (Income/Expense) or Category
4. Sort by Date (newest first) or Amount (highest first)

:: Adding Transactions (Admin Only)
1. Switch to Admin role
2. Click "Add New Transaction"
3. Fill in the form:
   - Date: Transaction date
   - Amount: Transaction amount
   - Type: Income or Expense
   - Category: Pre-defined categories
   - Description: Transaction details
4. Click "Add Transaction"

:: Understanding Insights
- Highest Spending Category: Shows which category you spend the most on
- Monthly Trend: Compares your spending month-over-month (positive % = more spending)
- Savings Rate: Percentage of income you're saving

:: Dark Mode
Click the moon/sun icon in the header to toggle dark mode. Your preference is saved automatically.

:: Switching Roles
Click the "Viewer" or "Admin" button in the header to switch roles. Admin users have additional capabilities like adding and deleting transactions.


:: Technology Stack

- Framework: Next.js 
- UI Components: shadcn/ui
- State Management: Zustand with localStorage persistence
- Charting: Recharts
- Icons: Lucide React
- Styling: Tailwind CSS
- Type Safety: TypeScript



