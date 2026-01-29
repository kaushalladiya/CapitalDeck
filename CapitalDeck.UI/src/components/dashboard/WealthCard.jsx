import React, { useState } from 'react';
import { Briefcase, CreditCard, Plus } from 'lucide-react';
import DataService from '../../api/transactionService';

const WealthCard = ({ investments = [], debts = [], onUpdate }) => {
  const [showForm, setShowForm] = useState(null); 
  const [formData, setFormData] = useState({ name: '', amount: '' });

  const totalInvested = (investments || []).reduce((acc, curr) => acc + (curr.investedAmount || 0), 0);
  const totalDebt = (debts || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (showForm === 'investment') {
           await DataService.createInvestment({ 
               name: formData.name, 
               investedAmount: parseFloat(formData.amount), 
               type: 'STOCK',
               investmentDate: new Date().toISOString().split('T')[0]
           });
        } else {
           await DataService.createDebt({ 
               lenderName: formData.name, 
               amount: parseFloat(formData.amount),
               dueDate: new Date().toISOString().split('T')[0]
           });
        }
        setShowForm(null);
        setFormData({ name: '', amount: '' });
        onUpdate();
    } catch (error) {
        console.error("Failed to save:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* INVESTMENTS */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Investments</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹{totalInvested.toLocaleString()}</h3>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400"><Briefcase size={20} /></div>
        </div>
        <button onClick={() => setShowForm('investment')} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
          <Plus size={16} className="mr-1"/> Add Investment
        </button>
      </div>

      {/* DEBTS */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Liabilities</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹{totalDebt.toLocaleString()}</h3>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-600 dark:text-red-400"><CreditCard size={20} /></div>
        </div>
        <button onClick={() => setShowForm('debt')} className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline flex items-center">
          <Plus size={16} className="mr-1"/> Add Debt Record
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-2xl border dark:border-gray-700">
              <h3 className="font-bold mb-4 dark:text-white">Add {showForm === 'investment' ? 'Investment' : 'Debt'}</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                 <input placeholder="Name" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                 <input placeholder="Amount" type="number" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
                 <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-gray-900 dark:bg-green-600 text-white py-2 rounded">Save</button>
                    <button type="button" onClick={() => setShowForm(null)} className="flex-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 py-2 rounded">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default WealthCard;