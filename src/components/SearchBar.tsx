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
        <form onSubmit={handleSubmit} className="flex items-center mt-5">
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 w-full text-black"
                placeholder="Search..."
            />
            <button
                type="submit"
                className="bg-transparent text-gray-500 opacity-70 rounded-full p-2 flex items-center justify-center"
            >Search
            </button>
        </form>
    );
};

export default SearchBar;
