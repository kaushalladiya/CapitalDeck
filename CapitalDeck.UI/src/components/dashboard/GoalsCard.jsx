import React, { useState } from 'react';
import { Trophy, Plus, Trash2 } from 'lucide-react';
import DataService from '../../api/transactionService';

const GoalsCard = ({ goals = [], onGoalAdded }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', savedAmount: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount) return;
    try {
      await DataService.createGoal({
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
        savedAmount: parseFloat(newGoal.savedAmount)
      });
      setIsAdding(false);
      setNewGoal({ name: '', targetAmount: '', savedAmount: 0 });
      onGoalAdded();
    } catch (error) {
      alert("Failed to add goal");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this goal?")) {
      await DataService.deleteGoal(id);
      onGoalAdded();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={20} />
          Financial Goals
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors flex items-center"
        >
          <Plus size={16} className="mr-1" /> New
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-xl space-y-3">
          <input 
            type="text" placeholder="Goal Name (e.g. New Car)" 
            className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            value={newGoal.name} onChange={e => setNewGoal({...newGoal, name: e.target.value})}
          />
          <div className="flex gap-2">
            <input 
              type="number" placeholder="Target ₹" 
              className="w-1/2 p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={newGoal.targetAmount} onChange={e => setNewGoal({...newGoal, targetAmount: e.target.value})}
            />
            <input 
              type="number" placeholder="Saved ₹" 
              className="w-1/2 p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={newGoal.savedAmount} onChange={e => setNewGoal({...newGoal, savedAmount: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Save Goal
          </button>
        </form>
      )}

      <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
        {goals.length === 0 && !isAdding && (
           <div className="text-center text-gray-400 text-sm py-4">No goals set yet.</div>
        )}
        
        {goals.map((goal) => {
          const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
          return (
            <div key={goal.id} className="space-y-2 group">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{goal.name}</span>
                <div className="flex items-center gap-3">
                    <span className="text-gray-500">₹{goal.savedAmount} / ₹{goal.targetAmount}</span>
                    <button 
                        onClick={() => handleDelete(goal.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Goal"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsCard;