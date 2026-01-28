import api from './axiosConfig';

const DataService = {
    getAllTransactions: async () => { const res = await api.get('/transactions'); return res.data; },
    createTransaction: async (data) => { const res = await api.post('/transactions', data); return res.data; },
    deleteTransaction: async (id) => { await api.delete(`/transactions/${id}`); },

    // FULL DASHBOARD LOAD
    getDashboardSummary: async () => {
        const response = await api.get('/dashboard/summary');
        return response.data;
    },

    createInvestment: async (data) => { return api.post('/dashboard/investments', data); },
    createDebt: async (data) => { return api.post('/dashboard/debts', data); },
    createGoal: async (data) => { return api.post('/dashboard/goals', data); },
    deleteGoal: async (id) => { await api.delete(`/dashboard/goals/${id}`); }
};

export default DataService;