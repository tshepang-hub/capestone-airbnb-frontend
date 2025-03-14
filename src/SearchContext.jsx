// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <SearchContext.Provider value={{ results, setResults, loading, setLoading, error, setError }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
