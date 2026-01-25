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
  
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await TransactionService.getAllTransactions();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTransactions(sortedData);
      calculateStats(sortedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateStats = (data) => {
    let income = 0;
    let expense = 0;

    data.forEach(tx => {
      if (tx.type === 'INCOME') income += tx.amount;
      else expense += tx.amount;
    });

    setStats({
      income,
      expense,
      balance: income - expense
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time Financial Overview</p>
        </div>
        
        {/* CLICK ACTION: Opens the Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-gray-900/20"
        >
          <TrendingUp size={18} className="mr-2" />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount={stats.balance} icon={Wallet} trend="up" trendValue="+0%" isPrimary={true} />
        <StatCard title="Total Income" amount={stats.income} icon={TrendingUp} trend="up" trendValue="+0%" />
        <StatCard title="Total Expenses" amount={stats.expense} icon={TrendingDown} trend="down" trendValue="-0%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeChart />
        </div>
        <div className="h-full">
           <TransactionList transactions={transactions} loading={loading} />
        </div>
      </div>

      {/* MODAL COMPONENT */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData}
      />

    </div>
  );
};

export default Dashboard;