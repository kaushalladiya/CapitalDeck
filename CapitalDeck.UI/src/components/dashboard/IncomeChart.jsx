import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const IncomeChart = ({ data }) => {
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-lg rounded-xl">
          <p className="font-bold text-gray-700 mb-2">{label}</p>
          <p className="text-green-600 text-sm">
            Income: <span className="font-mono">₹{payload[0].value}</span>
          </p>
          <p className="text-red-600 text-sm">
            Expense: <span className="font-mono">₹{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-[400px]">
      
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Financial Overview</h3>
        <p className="text-sm text-gray-500">Income vs Expense analysis for the last 6 months</p>
      </div>

      {/* CHART AREA */}
      {/* ResponsiveContainer makes the chart adapt to mobile/desktop screens automatically */}
      <ResponsiveContainer width="100%" height="85%">
        {/* Use the 'data' prop here */}
        <BarChart data={data} barGap={8}>
          
          {/* Grid Lines: dashed and light gray for subtle guidance */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          
          {/* X Axis: The months at the bottom */}
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10} 
          />
          
          {/* Y Axis: The numbers on the left */}
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            tickFormatter={(value) => `₹${value}`} 
          />
          
          {/* The Tooltip we defined above */}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />

          {/* The Bars */}
          {/* Radius: [4, 4, 0, 0] makes the top corners rounded (Modern UI trend) */}
          <Bar dataKey="income" name="Income" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="expense" name="Expense" fill="#DC2626" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;