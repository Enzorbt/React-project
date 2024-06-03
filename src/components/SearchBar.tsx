import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search?q=${query}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
                placeholder="Search..."
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-md px-4 py-2"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
