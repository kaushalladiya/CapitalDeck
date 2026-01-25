import React from 'react';
import { ShoppingBag, Utensils, Zap, Briefcase, ArrowRight, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions = [], loading = false, onDelete }) => {
  
  // Helper to choose the right icon
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center transition-colors">
          See All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="space-y-6">
        {/* LOADING STATE */}
        {loading && <div className="text-center text-gray-400 py-4">Loading data...</div>}
        
        {/* EMPTY STATE */}
        {!loading && transactions.length === 0 && (
            <div className="text-center text-gray-400 py-4">
                No transactions yet. Add one!
            </div>
        )}

        {/* DATA MAPPING */}
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
            
            {/* Left Side: Icon + Text */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors">
                {getCategoryIcon(tx.category)}
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {tx.title}
                </p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {/* Format Java Date (e.g., 2026-01-24T10:00:00) */}
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right Side: Amount + Delete Button */}
            <div className="flex items-center space-x-4">
              <div className={`font-mono font-bold ${
                tx.type === 'INCOME' ? 'text-green-600' : 'text-gray-900'
              }`}>
                {tx.type === 'INCOME' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </div>

              {/* DELETE BUTTON: Opacity 0 by default, 100 on Hover */}
              <button 
                onClick={(e) => {
                    e.stopPropagation(); // Stop click from bubbling up
                    onDelete(tx.id);
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Delete Transaction"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;