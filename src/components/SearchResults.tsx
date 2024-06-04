import React, { useState, useEffect } from "react";
import ObjectsType from "../types/ObjectsType.tsx";
import ObjectModel from "../models/ObjectModel.tsx";
import SearchResult from "./SearchResult.tsx";
import ObjectType from "../types/ObjectType.tsx";

interface SearchResultsProps {
    searchResults: ObjectsType | undefined;
    objectModel: ObjectModel;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, objectModel }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [objects, setObjects] = useState<ObjectType[]>([]);

    useEffect(() => {
        if (searchResults) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const objectIDs = searchResults.objectIDs.slice(startIndex, endIndex);

            const fetchObjects = async () => {
                const objects = await Promise.all(objectIDs.map(objectID => objectModel.getObject(objectID)));
                setObjects(objects);
            };

            fetchObjects();
        }
    }, [searchResults, currentPage, itemsPerPage, objectModel]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (!searchResults) {
        return (
            <>
                <div className="text-white">
                    Loading...
                </div>
            </>
        )
    }

    if (searchResults.total === 0) {
        return (
            <>
                <div className="text-red-600">
                    No results
                </div>
            </>
        )
    }

    const totalPages = Math.ceil(searchResults.objectIDs.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {objects.map((object) => (
                <SearchResult key={object.objectID} object={object} />
            ))}
            <div className="flex justify-center mt-4">
                <button className={`mx-1 px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className={`mx-1 px-3 py-1 rounded-full ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                ))}
                <button className={`mx-1 px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
};

export default SearchResults;
