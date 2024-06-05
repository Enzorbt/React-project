import React from 'react';
import ObjectType from "../types/ObjectType.tsx";
import {Link} from "react-router-dom";

interface SearchResultProps {
    object: ObjectType;
}

const SearchResult: React.FC<SearchResultProps> = ({ object }) => {
    return (
        <>
            <Link to={`/objects/${object.objectID}`}>
                <div className="flex items-center mb-4 bg-gray-800 h-52">
                    <img 
                        src={object.primaryImageSmall} 
                        alt={object.title} 
                        className="w-24 h-24 object-cover mx-4 text-white rounded-full" />
                    <div className="w-full flex flex-col">
                        <h2 className="text-lg font-bold text-white">{object.title}</h2>
                        <p className="text-gray-600">{object.artistDisplayName}</p>
                        <p className="text-gray-600">{object.objectDate}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default SearchResult;
