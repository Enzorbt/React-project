import React, { useEffect, useState } from 'react';
import ObjectType from "../types/ObjectType.tsx";
import ObjectModel from "../models/ObjectModel.tsx";

interface SearchResultProps {
    objectId: number;
    objectModel: ObjectModel;
}

const SearchResult: React.FC<SearchResultProps> = ({ objectId, objectModel }) => {
    const [object, setObject] = useState<ObjectType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchObject = () => {
            objectModel.getObject(objectId)
                .then((object) => {
                    setObject(object);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Error fetching object:", error);
                    setError("Error fetching object");
                });
        };

        fetchObject();
    }, [objectId, objectModel]);

    // Error display
    if (error) {
        return <div>{error}</div>;
    }

    // Loading display
    if (!object) {
        return <div>Loading...</div>;
    }

    // object display
    return (
        <div className="flex items-center mb-4">
            <img src={object.primaryImageSmall} alt={object.title} className="w-24 h-24 object-cover mr-4" />
            <div>
                <h2 className="text-lg font-bold">{object.title}</h2>
                <p className="text-gray-600">{object.artistDisplayName}</p>
                <p className="text-gray-600">{object.objectDate}</p>
            </div>
        </div>
    );
};

export default SearchResult;
