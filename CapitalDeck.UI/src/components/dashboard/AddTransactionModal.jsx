import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import TransactionService from '../../api/transactionService';

const AddTransactionModal = ({ isOpen, onClose, onSuccess }) => {
  // 1. Form State
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    category: 'Food'
  });

  // 2. Smart Categories (Changes based on Type)
  const categories = {
    INCOME: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
    EXPENSE: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Education', 'Other']
  };

  // 3. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      category: name === 'type' ? categories[value][0] : (name === 'category' ? value : prev.category)
    }));
  };

  // 4. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to Java Backend
      await TransactionService.createTransaction({
        ...formData,
        amount: parseFloat(formData.amount) // Ensure it's a number
      });
      
      // Success!
      onSuccess(); // Refresh the Dashboard
      onClose();   // Close the Modal
      setFormData({ title: '', amount: '', type: 'EXPENSE', category: 'Food' }); // Reset form
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to save transaction.");
    } finally {
      setLoading(false);
    }
  };

  // If modal is closed, don't render anything
  if (!isOpen) return null;

  return (
    // BACKDROP (Dark background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* MODAL CONTENT */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">New Transaction</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* 1. Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required 
            />
          </div>

          {/* 2. Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input 
              type="number" 
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-mono"
              required 
              min="0"
            />
          </div>

          {/* 3. Type Selection (Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option value="INCOME">Income (+)</option>
                <option value="EXPENSE">Expense (-)</option>
              </select>
            </div>

            {/* 4. Category Selection (Dynamic) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                {categories[formData.type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer / Buttons */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-lg font-medium transition-colors flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save Transaction'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;