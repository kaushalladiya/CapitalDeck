import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import IncomeChart from '../components/dashboard/IncomeChart';
import TransactionList from '../components/dashboard/TransactionList'; 
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import TransactionService from '../api/transactionService';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Stats State
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0
  });

  // Chart Data State
  const [chartData, setChartData] = useState([]);

  // Fetch Data Function
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await TransactionService.getAllTransactions();
      
      // Sort: Newest first
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTransactions(sortedData);
      processData(sortedData); // Calculate stats and chart
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    // Confirmation Dialog
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await TransactionService.deleteTransaction(id);
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete transaction");
      }
    }
  };

  // Process Data for Charts and Stats
  const processData = (data) => {
    let totalIncome = 0;
    let totalExpense = 0;

    // 1. Prepare last 6 months buckets
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      last6Months.push({ name: monthName, income: 0, expense: 0, monthIndex: d.getMonth() });
    }

    // 2. Aggregate Data
    data.forEach(tx => {
      // Stats
      if (tx.type === 'INCOME') totalIncome += tx.amount;
      else totalExpense += tx.amount;

      // Chart
      const txDate = new Date(tx.date);
      const monthIndex = txDate.getMonth();
      
      const monthData = last6Months.find(m => m.monthIndex === monthIndex);
      if (monthData) {
        if (tx.type === 'INCOME') monthData.income += tx.amount;
        else monthData.expense += tx.amount;
      }
    });

    setStats({
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense
    });
    
    setChartData(last6Months);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time Financial Overview</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-gray-900/20"
        >
          <TrendingUp size={18} className="mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount={stats.balance} icon={Wallet} trend="up" trendValue="+0%" isPrimary={true} />
        <StatCard title="Total Income" amount={stats.income} icon={TrendingUp} trend="up" trendValue="+0%" />
        <StatCard title="Total Expenses" amount={stats.expense} icon={TrendingDown} trend="down" trendValue="-0%" />
      </div>

      {/* Main Grid: Chart + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeChart data={chartData} />
        </div>
        <div className="h-full">
           <TransactionList 
             transactions={transactions} 
             loading={loading} 
             onDelete={handleDelete} // Passing the delete function
           />
        </div>
      </div>

      {/* Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />

    </div>
  );
};

export default Dashboard;