import React from 'react';
import { 
  ArrowUpCircle, ArrowDownCircle, Trash2, ArrowRight, 
  Utensils, ShoppingBag, Briefcase, Home, Zap, Car 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TransactionList = ({ transactions, loading, onDelete }) => {
  
  // Get Icon & Color based on Category Name
  const getCategoryStyle = (category, type) => {
    const cat = category?.toLowerCase() || '';

    if (cat.includes('food') || cat.includes('dining') || cat.includes('lunch')) 
      return { icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' };
    
    if (cat.includes('shop') || cat.includes('store') || cat.includes('buy')) 
      return { icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' };
    
    if (cat.includes('salary') || cat.includes('freelance') || cat.includes('job')) 
      return { icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' };
    
    if (cat.includes('rent') || cat.includes('house')) 
      return { icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' };
    
    if (cat.includes('bill') || cat.includes('electric') || cat.includes('light')) 
      return { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' };
    
    if (cat.includes('car') || cat.includes('fuel') || cat.includes('transport')) 
      return { icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' };

    // Fallback if no category match
    return type === 'INCOME' 
      ? { icon: ArrowUpCircle, color: 'text-green-600', bg: 'bg-green-50' }
      : { icon: ArrowDownCircle, color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        
        {/* WORKING LINK with restored style */}
        <Link 
          to="/transactions" 
          className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center transition-colors border border-green-100 px-3 py-1 rounded-lg hover:bg-green-50"
        >
          See All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      {/* CHANGED: Removed space-y-4 to reduce gaps */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-1">
        {recentTransactions.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-10">
            No transactions yet. Add one!
          </div>
        ) : (
          recentTransactions.map((tx) => {
            const style = getCategoryStyle(tx.category, tx.type);
            const IconComponent = style.icon;

            return (
              <div key={tx.id} className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  {/* ICON */}
                  <div className={`p-3 rounded-xl ${style.bg} ${style.color}`}>
                    <IconComponent size={20} />
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{tx.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="text-right flex items-center gap-4">
                  <span className={`font-bold text-sm ${tx.type === 'INCOME' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                  </span>
                  
                  <button 
                    onClick={() => onDelete(tx.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity p-1"
                    title="Delete Transaction"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionList;