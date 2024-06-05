import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchModel from '../models/SearchModel';
import SearchParamsType from '../types/SearchParamsType';
import ObjectsType from "../types/ObjectsType.tsx";
import AdvancedSearchBar from "./AdvancedSearchBar.tsx";
import SearchResults from "./SearchResults.tsx";
import ObjectModel from "../models/ObjectModel.tsx";
import { useFlashes } from "../providers/FlashesProvider.tsx";
import DepartmentModel from "../models/DepartmentModel.tsx";

interface AdvancedSearchPageProps {
    searchModel: SearchModel;
    objectModel: ObjectModel;
    departmentModel: DepartmentModel;
}

const AdvancedSearchPage: React.FC<AdvancedSearchPageProps> = ({
                                                                   searchModel,
                                                                   objectModel,
                                                                   departmentModel
                                                               }) => {
    const { setFlashMessage } = useFlashes();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<ObjectsType>();
    const [currentPage, setCurrentPage] = useState(() => {
        const page = searchParams.get('page');
        return page ? Number(page) : 1;
    });
    const [loading, setLoading] = useState(false);

    const areAllParamsNull = (params: SearchParamsType): boolean => {
        return Object.values(params).every(value => value === null || value === '*');
    };

    useEffect(() => {
        const searchParamsObj: SearchParamsType = {
            q: searchParams.get('q') === null ? '*' : searchParams.get('q'),
            isHighlight: searchParams.get('isHighlight') === null ? null : searchParams.get('isHighlight') === 'true',
            title: searchParams.get('title') === null ? null : searchParams.get('title') === 'true',
            tags: searchParams.get('tags') === null ? null : searchParams.get('tags') === 'true',
            departmentId: searchParams.get('departmentId') ? Number(searchParams.get('departmentId')) : null,
            isOnView: searchParams.get('isOnView') === null ? null : searchParams.get('isOnView') === 'true',
            artistOrCulture: searchParams.get('artistOrCulture') === null ? null : searchParams.get('artistOrCulture') === 'true',
            medium: searchParams.get('medium'),
            hasImages: searchParams.get('hasImages') === null ? null : searchParams.get('hasImages') === 'true',
            geoLocation: searchParams.get('geoLocation'),
            dateBegin: searchParams.get('dateBegin') ? Number(searchParams.get('dateBegin')) : null,
            dateEnd: searchParams.get('dateEnd') ? Number(searchParams.get('dateEnd')) : null,
        };

        if (areAllParamsNull(searchParamsObj)) {
            setSearchResults(undefined);
            setLoading(false);
            return;
        }

        searchModel.searchObjects(searchParamsObj).then(
            setSearchResults
        ).catch((error) => {
            setFlashMessage({
                message: "No results found, " + error,
                type: "error",
            });
        });
    }, [searchParams, searchModel, setFlashMessage]);

    useEffect(() => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', currentPage.toString());
            return newParams;
        });
    }, [currentPage, setSearchParams]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <AdvancedSearchBar departmentModel={departmentModel} />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader">Loading...</div>
                    </div>
                ) : (
                    <SearchResults
                        searchResults={searchResults}
                        objectModel={objectModel}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default AdvancedSearchPage;
