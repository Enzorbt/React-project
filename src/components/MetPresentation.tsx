import React from 'react';
import PresentationType from "../types/PresentationType.tsx";

interface MetPresentationProps {
    item: PresentationType;
}
const MetPresentation: React.FC<MetPresentationProps> = ({item}) => {
    return(
        <div
            key={item.index}
            className={`flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md mb-4 ${item.index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
        >
            <img src={item.imageUrl} alt={item.title}
                 className="w-full md:w-1/2 rounded-lg object-cover"/>
            <div className="flex flex-col justify-center p-4 md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-700">{item.description}</p>
            </div>
        </div>
    );
};

export default MetPresentation