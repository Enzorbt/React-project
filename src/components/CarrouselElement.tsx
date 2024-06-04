import React from 'react';
import ObjectType from "../types/ObjectType.tsx";
import {Link} from "react-router-dom";

interface HighlightProps {
    object: ObjectType;
}

const CarrouselElement: React.FC<HighlightProps> = ({ object }) => {
    return (
        <>
            <Link to={`/objects/${object.objectID}`}>
                <div
                    className="bg-white p-4 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
                    <img
                        src={object.primaryImage}
                        alt={object.title}
                        className="h-40 w-40 object-cover mb-4 rounded-full"/>
                    <div className="text-container max-h-16 overflow-hidden">
                        <h2 className="text-xl font-bold mb-2 text-center">
                            {object.title}
                        </h2>
                        <p className="text-sm text-gray-700 text-center">
                            {object.artistDisplayName}
                        </p>
                    </div>
                </div>
            </Link>
        </>


    );
};

export default CarrouselElement;
