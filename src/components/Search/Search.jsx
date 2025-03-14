import React, { useState } from 'react';
import axios from 'axios';
import { IoSearchSharp } from 'react-icons/io5';
import { useSearch } from '../../SearchContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [query, setQuery] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guestCount, setGuestCount] = useState(1);
    const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
    const { setResults, loading, setLoading, error, setError } = useSearch();
    const navigate = useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://capstone-airbnb-backend-h39o.onrender.com/api/accommodations');
            const accommodations = response.data;
            const filteredResults = accommodations.filter(accommodation =>
                accommodation.location.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredResults);
            navigate('/listings');
        } catch (error) {
            console.error('Error fetching accommodations:', error);
            setError('Failed to fetch accommodations');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="search-container">
            <form className="search-box" onSubmit={handleSearch}>
                <div className="search-field">
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="search-field">
                    <DatePicker
                        className="datePicker"
                        placeholderText="Check in"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="search-field">
                    <DatePicker
                        className="datePicker"
                        placeholderText="Check out"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="guests" onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)}>
                    <div className="dropdown">Guests: {guestCount}</div>
                    {isGuestPopupOpen && (
                        <div className="guestPopup" onClick={e => e.stopPropagation()}>
                            <label>Guests</label>
                            <input
                                type="number"
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                                min="1"
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="search-button" disabled={loading}>
                    <IoSearchSharp aria-label="Search" />
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
export default Search;