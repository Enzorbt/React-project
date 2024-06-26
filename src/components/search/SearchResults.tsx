﻿import React, { useState, useEffect } from "react";
import ObjectsType from "../../types/ObjectsType.tsx";
import ObjectModel from "../../models/ObjectModel.tsx";
import SearchResult from "./SearchResult.tsx";
import ObjectType from "../../types/ObjectType.tsx";
import { useFlashes } from "../../providers/FlashesProvider.tsx";
import LoadingComponent from "../loading/LoadingComponent.tsx";

interface SearchResultsProps {
    searchResults: ObjectsType | undefined;
    objectModel: ObjectModel;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, objectModel, currentPage, setCurrentPage, loading, setLoading }) => {
    const [itemsPerPage] = useState(12);
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
                        .catch((err) => {
                            setFlashMessage({
                                message: "Failed to fetch objects, " + err,
                                type: "error",
                            });
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
        return null;
    }

    if (loading) {
        return (
            <LoadingComponent />
        );
    }

    if (searchResults !== undefined && searchResults.total === 0) {
        setFlashMessage({
            message: "No result found !",
            type: "error",
        });
        return null;
    }

    const totalPages = Math.ceil((searchResults?.objectIDs?.length ?? 0) / itemsPerPage);

    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="flex flex-wrap -mx-2">
                {objects.map((object) => (
                    <div key={object.objectID} className="w-full md:w-1/4 lg:w-1/3 p-2">
                        <SearchResult object={object} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button className={`mx-1 px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-red-500 cursor-not-allowed' : 'bg-red-950 text-white'}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className={`mx-1 px-3 py-1 rounded-full ${pageNumber === currentPage ? 'bg-red-950 text-white' : 'bg-red-500'}`} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                ))}
                <button className={`mx-1 px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-red-950 cursor-not-allowed' : 'bg-red-500 text-white'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
};

export default SearchResults;