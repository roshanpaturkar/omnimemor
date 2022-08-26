import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { customLogger, httpErrorLogger } from '../utils/logsManager';

const quoteApi = process.env.REACT_APP_QUOTE_API;

let useQuoteStore = (set) => ({
    quote: '',
    author: '',
    getQuote: async () => {
        customLogger('Getting quote');
        await axios.get(`${quoteApi}`).then((res) => {
            set({ quote: res.data.content });
            set({ author: res.data.author });
        }).catch((err) => {
            httpErrorLogger(err);
        });
    }
});

useQuoteStore = persist(useQuoteStore, { name: 'quote' });
useQuoteStore = devtools(useQuoteStore);

useQuoteStore = create(useQuoteStore);

export default useQuoteStore;
