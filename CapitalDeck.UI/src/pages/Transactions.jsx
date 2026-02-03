import React, { useEffect, useState } from 'react';
import DataService from '../api/transactionService';
import { Search, Filter, Trash2, ArrowDownCircle, ArrowUpCircle, Download } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTx, setFilteredTx] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const data = await DataService.getAllTransactions();
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(sorted);
    setFilteredTx(sorted);
  };

  useEffect(() => {
    let result = transactions;

    if (filterType !== 'ALL') {
      result = result.filter(t => t.type === filterType);
    }

    if (searchTerm) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTx(result);
  }, [searchTerm, filterType, transactions]);

  const handleDelete = async (id) => {
    if(window.confirm("Delete this record permanently?")) {
        await DataService.deleteTransaction(id);
        loadData();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        
        {/* TOOLBAR */}
        <div className="flex gap-2 w-full md:w-auto">
           {/* SEARCH */}
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           
           {/* FILTER */}
           <select 
             className="border rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-green-500"
             value={filterType}
             onChange={(e) => setFilterType(e.target.value)}
           >
             <option value="ALL">All Types</option>
             <option value="INCOME">Income Only</option>
             <option value="EXPENSE">Expenses Only</option>
           </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Title / Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTx.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${tx.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {tx.type === 'INCOME' ? <ArrowUpCircle size={18}/> : <ArrowDownCircle size={18}/>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.title}</p>
                      <p className="text-xs text-gray-400">{tx.category || 'General'}</p>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 font-bold ${tx.type === 'INCOME' ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(tx.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTx.length === 0 && (
          <div className="p-10 text-center text-gray-400">No transactions found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default Transactions;