import React, { useState, useEffect } from "react";
import ObjectsType from "../types/ObjectsType.tsx";
import ObjectModel from "../models/ObjectModel.tsx";
import SearchResult from "./SearchResult.tsx";
import ObjectType from "../types/ObjectType.tsx";
import { useFlashes } from "../providers/FlashesProvider.tsx";
import LoadingComponent from "./LoadingComponent.tsx";

interface SearchResultsProps {
    searchResults: ObjectsType | undefined;
    objectModel: ObjectModel;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, objectModel, currentPage, setCurrentPage, loading, setLoading }) => {
    const [itemsPerPage] = useState(10);
    const [objects, setObjects] = useState<ObjectType[]>([]);
    const { setFlashMessage } = useFlashes();

    useEffect(() => {
        if (searchResults && searchResults.objectIDs) {
            setLoading(true);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const objectIDs = searchResults.objectIDs.slice(startIndex, endIndex);

            const fetchObjects = () => {
                Promise.all(objectIDs.map(objectID =>
                    objectModel.getObject(objectID)
                        .then(object => object)
                        .catch(err => {
                            setFlashMessage({
                                message: "Failed to fetch objects, " + err,
                                type: "error",
                            });
                            return null;
                        })
                )).then(fetchedObjects => {
                    setObjects(fetchedObjects.filter((obj): obj is ObjectType => obj !== null && obj !== undefined));
                    setLoading(false);
                }).catch(err => {
                    setFlashMessage({
                        message: "Failed to fetch objects, " + err,
                        type: "error",
                    });
                    setLoading(false);
                });
            };

            fetchObjects();
        }
    }, [searchResults, currentPage, itemsPerPage, objectModel, setFlashMessage, setLoading]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (searchResults === undefined && !loading) {
        return null; // No search has been launched
    }

    if (loading) {
        return (
            <LoadingComponent/>
        );
    }

    if (searchResults !== undefined && searchResults.total === 0) {
        return (
            <div className="text-red-600">
                No results
            </div>
        );
    }

    const totalPages = Math.ceil((searchResults?.objectIDs?.length ?? 0) / itemsPerPage);

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
