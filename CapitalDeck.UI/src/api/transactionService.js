import api from './axiosConfig';

// This mirrors Java Controller
const TransactionService = {
    
    // GET /api/transactions
    getAllTransactions: async () => {
        const response = await api.get('/transactions');
        return response.data;
    },

    // POST /api/transactions
    createTransaction: async (transactionData) => {
        const response = await api.post('/transactions', transactionData);
        return response.data;
    },

    // DELETE /api/transactions/{id}
    deleteTransaction: async (id) => {
        await api.delete(`/transactions/${id}`);
    }
};

export default TransactionService;