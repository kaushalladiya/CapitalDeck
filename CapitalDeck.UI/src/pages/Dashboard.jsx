import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import IncomeChart from '../components/dashboard/IncomeChart';
import TransactionList from '../components/dashboard/TransactionList';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const stats = {
    balance: 124500,
    income: 82000,
    expense: 34500,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your money today.</p>
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-gray-900/20">
          <TrendingUp size={18} className="mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount={stats.balance} icon={Wallet} trend="up" trendValue="+12.5%" isPrimary={true} />
        <StatCard title="Monthly Income" amount={stats.income} icon={TrendingUp} trend="up" trendValue="+8.2%" />
        <StatCard title="Monthly Expenses" amount={stats.expense} icon={TrendingDown} trend="down" trendValue="-2.4%" />
      </div>

      {/* Main Content Grid: Charts + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section (Takes 2 columns on large screens) */}
        <div className="lg:col-span-2">
          <IncomeChart />
        </div>

        {/* Recent Transactions (Takes 1 column) */}
        <div className="h-full">
           <TransactionList />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;