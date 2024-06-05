import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const queryString = (query !== '') ? "q=" + query : '';
        navigate('/search?' + queryString);
    };

    return (
        <>
            <div className="flex items-center justify-center py-8 bg-black">
                <form onSubmit={handleSubmit}
                      className="flex items-center w-full max-w-4xl border border-gray-500 bg-gray-800 rounded-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="bg-transparent rounded-full px-4 py-2 w-full text-white placeholder-gray-400 focus:outline-none"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-full px-4 py-2 ml-2 hover:bg-blue-700 transition duration-300"
                    >Search
                    </button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
