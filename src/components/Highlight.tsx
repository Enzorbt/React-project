import React from 'react';
import ObjectType from "../types/ObjectType.tsx";

interface HighlightProps {
    highlight: ObjectType;
}

const Highlight: React.FC<HighlightProps> = ({ highlight }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
            <img 
                src={highlight.primaryImage} 
                alt={highlight.title}
                className="h-40 w-40 object-cover mb-4 rounded-full" />
            <div className="text-container max-h-16 overflow-hidden">
                <h2 className="text-xl font-bold mb-2 text-center">
                    {highlight.title}
                </h2>
                <p className="text-sm text-gray-700 text-center">
                    {highlight.artistDisplayName}
                </p>
            </div>
        </div>
    );
};

export default Highlight;
