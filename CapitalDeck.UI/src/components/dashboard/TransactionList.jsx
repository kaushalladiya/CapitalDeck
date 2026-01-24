import React from 'react';
import { ShoppingBag, Utensils, Zap, Briefcase, ArrowRight } from 'lucide-react';

const TransactionList = () => {
  // MOCK DATA (Ideally this comes from Java Backend)
  // We use specific "type" (income/expense) to determine color
  const transactions = [
    { id: 1, title: 'Freelance Project', date: 'Today, 10:42 AM', amount: 12000, type: 'income', category: 'Work' },
    { id: 2, title: 'Grocery Shopping', date: 'Yesterday, 4:30 PM', amount: 2450, type: 'expense', category: 'Shopping' },
    { id: 3, title: 'Electric Bill', date: 'Jan 23, 2026', amount: 950, type: 'expense', category: 'Bills' },
    { id: 4, title: 'Swiggy Order', date: 'Jan 22, 2026', amount: 450, type: 'expense', category: 'Food' },
    { id: 5, title: 'Monthly Salary', date: 'Jan 01, 2026', amount: 65000, type: 'income', category: 'Salary' },
  ];

  // Helper to choose the right icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Work': case 'Salary': return <Briefcase size={20} className="text-green-600" />;
      case 'Shopping': return <ShoppingBag size={20} className="text-blue-600" />;
      case 'Food': return <Utensils size={20} className="text-orange-600" />;
      case 'Bills': return <Zap size={20} className="text-yellow-600" />;
      default: return <ShoppingBag size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full">
      
      {/* Header with "See All" link */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center transition-colors">
          See All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      {/* The List */}
      <div className="space-y-6">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
            
            {/* Left Side: Icon + Text */}
            <div className="flex items-center space-x-4">
              {/* Icon Circle */}
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors">
                {getCategoryIcon(tx.category)}
              </div>
              
              <div>
                <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {tx.title}
                </p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {tx.date}
                </p>
              </div>
            </div>

            {/* Right Side: Amount */}
            <div className={`font-mono font-bold ${
              tx.type === 'income' ? 'text-green-600' : 'text-gray-900'
            }`}>
              {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;