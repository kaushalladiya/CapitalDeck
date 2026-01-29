import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import IncomeChart from '../components/dashboard/IncomeChart';
import TransactionList from '../components/dashboard/TransactionList'; 
import GoalsCard from '../components/dashboard/GoalsCard';
import WealthCard from '../components/dashboard/WealthCard';
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import DataService from '../api/transactionService';
import { Wallet, TrendingUp, TrendingDown, Layers } from 'lucide-react';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ investments: [], debts: [], goals: [] });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stats State
  const [stats, setStats] = useState({ balance: 0, income: 0, expense: 0 });
  // Chart Data State
  const [chartData, setChartData] = useState([]);

  // Fetch Data Function
  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Transactions
      const txData = await DataService.getAllTransactions();
      // Sort: Newest first
      const sortedTx = txData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTx);
      processChartData(sortedTx); // Calculate stats and chart data

      // 2. Fetch Extended Data for Wealth & Goals
      const summaryData = await DataService.getDashboardSummary();
      setSummary(summaryData);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete transaction?")) {
      await DataService.deleteTransaction(id);
      fetchData();
    }
  };

  // Process Data for Charts and Stats
  const processChartData = (data) => {
    let income = 0, expense = 0;
    // Prepare last 6 months buckets
    const last6Months = Array.from({length: 6}, (_, i) => {
        const d = new Date(); d.setMonth(d.getMonth() - (5-i));
        return { name: d.toLocaleString('default', { month: 'short' }), income: 0, expense: 0, month: d.getMonth() };
    });

    // Aggregate Data
    data.forEach(tx => {
       const txMonth = new Date(tx.date).getMonth();
       if (tx.type === 'INCOME') income += tx.amount; else expense += tx.amount;
       const monthEntry = last6Months.find(m => m.month === txMonth);
       if (monthEntry) tx.type === 'INCOME' ? monthEntry.income += tx.amount : monthEntry.expense += tx.amount;
    });

    setStats({ income, expense, balance: income - expense });
    setChartData(last6Months);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
             <Layers className="mr-2 text-green-600"/> CapitalDeck Overview
          </h1>
          <p className="text-gray-500">Wealth Intelligence Platform</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg">
          + Transaction
        </button>
      </div>

      {/* SECTION 1: CASH FLOW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Net Balance" amount={stats.balance} icon={Wallet} trend="up" isPrimary={true} />
        <StatCard title="Total Income" amount={stats.income} icon={TrendingUp} trend="up" />
        <StatCard title="Total Expenses" amount={stats.expense} icon={TrendingDown} trend="down" />
      </div>

      {/* SECTION 2: WEALTH MANAGEMENT (NEW 10 TABLES DATA) */}
      <div>
         <h2 className="text-lg font-bold text-gray-800 mb-4">Wealth & Liabilities</h2>
         <WealthCard investments={summary.investments} debts={summary.debts} onUpdate={fetchData} />
      </div>

      {/* SECTION 3: ANALYTICS & GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 h-full"><IncomeChart data={chartData} /></div>
        <div className="h-full"><GoalsCard goals={summary.goals} onGoalAdded={fetchData} /></div>
      </div>

      {/* SECTION 4: RECENT TRANSACTIONS */}
      <div>
         <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h2>
         <TransactionList transactions={transactions} loading={loading} onDelete={handleDelete} />
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
    </div>
  );
};

export default Dashboard;