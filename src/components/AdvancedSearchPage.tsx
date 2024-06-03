import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchModel from '../models/SearchModel';
import SearchParamsType from '../types/SearchParamsType';
import ObjectsType from "../types/ObjectsType.tsx";
import AdvancedSearchBar from "./AdvancedSearchBar.tsx";
import SearchResults from "./SearchResults.tsx";
import ObjectModel from "../models/ObjectModel.tsx";

interface AdvancedSearchPageProps {
    searchModel: SearchModel;
    objectModel: ObjectModel;
}

const AdvancedSearchPage: React.FC<AdvancedSearchPageProps> = ({
                                                                   searchModel, 
                                                                   objectModel 
}: { 
    searchModel: SearchModel, 
    objectModel: ObjectModel
}) => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<ObjectsType>();

    useEffect(() => {
        const searchParamsObj: SearchParamsType = {
            q: searchParams.get('q') ?? '*',
            isHighlight: searchParams.get('isHighlight') === 'true',
            title: searchParams.get('title') === 'true',
            tags: searchParams.get('tags') === 'true',
            departmentId: searchParams.get('departmentId') ? Number(searchParams.get('departmentId')) : null,
            isOnView: searchParams.get('isOnView') === 'true',
            artistOrCulture: searchParams.get('artistOrCulture') === 'true',
            medium: searchParams.get('medium'),
            hasImages: searchParams.get('hasImages') === 'true',
            geoLocation: searchParams.get('geoLocation'),
            dateBegin: searchParams.get('dateBegin') ? Number(searchParams.get('dateBegin')) : null,
            dateEnd: searchParams.get('dateEnd') ? Number(searchParams.get('dateEnd')) : null,
        };
        
        searchModel.searchObjects(searchParamsObj).then(setSearchResults);
    }, [searchParams, searchModel]);

    return (
        <>
            <AdvancedSearchBar setSearchResults={setSearchResults}/>
            
            <SearchResults 
                searchResults={searchResults}
                objectModel={objectModel}
            />
        </>
    );
};

export default AdvancedSearchPage;
