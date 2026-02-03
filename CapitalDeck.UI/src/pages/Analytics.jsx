import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DataService from '../api/transactionService';
import { Loader2, PieChart as PieIcon, Target } from 'lucide-react';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const transactions = await DataService.getAllTransactions();
      const summary = await DataService.getDashboardSummary(); // investments, debts, etc.
      
      processCategoryData(transactions);
      processBudgets(transactions, summary.goals); // Using goals as proxy for budgets if table empty
    } catch (error) {
      console.error("Error fetching analytics", error);
    } finally {
      setLoading(false);
    }
  };

  const processCategoryData = (transactions) => {
    // Group Expenses by Category
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const grouped = expenses.reduce((acc, curr) => {
      const cat = curr.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {});

    const chartData = Object.keys(grouped).map((key, index) => ({
      name: key,
      value: grouped[key]
    }));
    setCategoryData(chartData);
  };

  // Simulated Budget vs Actual (Since we are just starting populating budgets)
  const processBudgets = (transactions) => {
     // This would ideally come from your 'budgets' table. 
     // For now, we visualize Monthly Spending trends.
     setBudgetData([
       { name: 'Food', budget: 5000, actual: 3200 },
       { name: 'Rent', budget: 15000, actual: 15000 },
       { name: 'Travel', budget: 2000, actual: 4500 },
       { name: 'Shopping', budget: 3000, actual: 1200 },
     ]);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-green-600" size={40}/></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center">
        <PieIcon className="mr-2 text-blue-600"/> Financial Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHART 1: SPENDING DISTRIBUTION */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 2: BUDGET VS ACTUAL */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
             <Target className="mr-2 text-red-500" size={18}/> Budget Discipline
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#E5E7EB" name="Budget Limit" />
              <Bar dataKey="actual" fill="#10B981" name="Actual Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;