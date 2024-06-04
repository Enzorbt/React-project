import React from 'react';
import ObjectType from "../types/ObjectType.tsx";

interface SearchResultProps {
    object: ObjectType;
}

const SearchResult: React.FC<SearchResultProps> = ({ object }) => {
    return (
        <div className="flex items-center mb-4">
            <img src={object.primaryImageSmall} alt={object.title} className="w-24 h-24 object-cover mr-4 text-white" />
            <div>
                <h2 className="text-lg font-bold text-white">{object.title}</h2>
                <p className="text-gray-600">{object.artistDisplayName}</p>
                <p className="text-gray-600">{object.objectDate}</p>
            </div>
        </div>
    );
};

export default SearchResult;
