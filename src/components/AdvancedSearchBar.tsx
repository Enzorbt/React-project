import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import SearchParamsType from '../types/SearchParamsType';
import DepartmentModel from "../models/DepartmentModel.tsx";
import DepartmentType from "../types/DepartmentType.tsx";
import {useFlashes} from "../providers/FlashesProvider.tsx";

interface AdvancedSearchBarProps {
    departmentModel: DepartmentModel;
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({ departmentModel }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchParamsObj, setSearchParamsObj] = useState<SearchParamsType>({
        q: searchParams.get('q') === null ? '' : searchParams.get('q'),
        isHighlight: searchParams.get('isHighlight') === null ? null : searchParams.get('isHighlight') === 'true',
        title: searchParams.get('title') === null ? null : searchParams.get('title') === 'true',
        tags: searchParams.get('tags') === null ? null : searchParams.get('tags') === 'true',
        departmentId: searchParams.get('departmentId') ? Number(searchParams.get('departmentId')) : null,
        isOnView: searchParams.get('isOnView') === null ? null : searchParams.get('isOnView') === 'true',
        artistOrCulture: searchParams.get('artistOrCulture') === null ? null : searchParams.get('artistOrCulture') === 'true',
        medium: searchParams.get('medium'),
        hasImages: searchParams.get('hasImages') === null ? null : searchParams.get('hasImages') === 'true',
        geoLocation: searchParams.get('geoLocation'),
        dateBegin: searchParams.get('dateBegin') ? Number(searchParams.get('dateBegin')) : 0,
        dateEnd: searchParams.get('dateEnd') ? Number(searchParams.get('dateEnd')) : 0,
    });

    const [departments, setDepartments] = useState<DepartmentType[]>([]);
    const [useDates, setUseDates] = useState(false);
    const { setFlashMessage } = useFlashes();
    

    useEffect(() => {
        departmentModel.getDepartments().then(
            setDepartments
        ).catch((error) =>{
            setFlashMessage({
                message: "Error fetching highlights, " + error,
                type: "error",
            });
        });
    }, [departmentModel, setFlashMessage]);

    const setQ = (q: string) => {
        setSearchParamsObj({ ...searchParamsObj, q });
    };

    const setIsHighlight = (isHighlight: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, isHighlight });
    };

    const setTitle = (title: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, title });
    };

    const setTags = (tags: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, tags });
    };

    const setDepartmentId = (departmentId: number | null) => {
        setSearchParamsObj({ ...searchParamsObj, departmentId });
    };

    const setIsOnView = (isOnView: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, isOnView });
    };

    const setArtistOrCulture = (artistOrCulture: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, artistOrCulture });
    };

    const setMedium = (medium: string) => {
        setSearchParamsObj({ ...searchParamsObj, medium });
    };

    const setHasImages = (hasImages: boolean) => {
        setSearchParamsObj({ ...searchParamsObj, hasImages });
    };

    const setGeoLocation = (geoLocation: string) => {
        setSearchParamsObj({ ...searchParamsObj, geoLocation });
    };

    const setDateBegin = (dateBegin: number | null) => {
        setSearchParamsObj({ ...searchParamsObj, dateBegin });
    };

    const setDateEnd = (dateEnd: number | null) => {
        setSearchParamsObj({ ...searchParamsObj, dateEnd });
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let queryString = '';
        for (const [key, value] of Object.entries(searchParamsObj)) {
            if (key === 'dateBegin' || key === 'dateEnd') {
                if (useDates && value !== null && value !== '') {
                    queryString += `${key}=${encodeURIComponent(value.toString())}&`;
                }
            } else if (value !== null && value !== '' && value !== false) {
                queryString += `${key}=${encodeURIComponent(value.toString())}&`;
            }
        }
        queryString = queryString.slice(0, -1); // remove trailing '&'
        navigate(`/search?${queryString}`);
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSearch}
                  className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-center items-center mt-5 border border-gray-500 bg-transparent rounded-full w-4/5">
                    <input
                        type="text"
                        name="q"
                        value={searchParamsObj.q ?? ''}
                        onChange={(event) => setQ(event.target.value)}
                        className="bg-transparent rounded-full px-4 py-2 w-full text-white"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="bg-transparent text-gray-500 opacity-70 rounded-full p-2 flex items-center justify-center border-2"
                    >Search
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-wrap justify-center my-4">
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="isHighlight"
                                checked={searchParamsObj.isHighlight ?? undefined}
                                onChange={(event) => setIsHighlight(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-white">Highlight</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="title"
                                checked={searchParamsObj.title ?? undefined}
                                onChange={(event) => setTitle(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-white">Title</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="tags"
                                checked={searchParamsObj.tags ?? undefined}
                                onChange={(event) => setTags(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-white">Tags</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="isOnView"
                                checked={searchParamsObj.isOnView ?? undefined}
                                onChange={(event) => setIsOnView(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-white">Is On View</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="artistOrCulture"
                                checked={searchParamsObj.artistOrCulture ?? undefined}
                                onChange={(event) => setArtistOrCulture(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span
                                className="ml-2 text-white">Artist or Culture</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="checkbox"
                                name="hasImages"
                                checked={searchParamsObj.hasImages ?? undefined}
                                onChange={(event) => setHasImages(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-white">Has Images</span>
                        </label>
                    </div>
                    <hr className="w-60 white my-4"/>
                    <div className="flex justify-center">
                        <div>
                            <label className="flex items-center flex-col">
                                <span className="text-white">Department</span>
                                <select
                                    name="departmentId"
                                    value={searchParamsObj.departmentId ?? ''}
                                    onChange={(event) => setDepartmentId(Number(event.target.value))}
                                    className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                                >
                                    <option value="">Select a department
                                    </option>
                                    {departments.map(department => (
                                        <option key={department.departmentId}
                                                value={department.departmentId}>
                                            {department.displayName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                    </div>
                    <hr className="w-60 white my-4"/>
                    <div className="flex justify-center">
                        <label className="flex flex-col items-center">
                            <span className="text-white">Medium</span>
                            <input
                                type="text"
                                name="medium"
                                value={searchParamsObj.medium ?? undefined}
                                onChange={(event) => setMedium(event.target.value)}
                                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                            />
                        </label>
                    </div>
                    <hr className="w-60 white my-4"/>
                    <div className="flex justify-center">
                        <label className="flex flex-col items-center">
                            <span className="text-white">Geo Location</span>
                            <input
                                type="text"
                                name="geoLocation"
                                value={searchParamsObj.geoLocation ?? undefined}
                                onChange={(event) => setGeoLocation(event.target.value)}
                                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                            />
                        </label>
                    </div>
                    <hr className="w-60 white my-4"/>
                    <div className="flex flex-wrap justify-center flex-col">
                        <label className="mr-4 flex items-center">
                            <input
                                type="number"
                                name="dateBegin"
                                value={searchParamsObj.dateBegin ?? '0'}
                                onChange={(event) => setDateBegin(Number(event.target.value))}
                                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                            />
                            <span className="ml-2 text-white">Start Date</span>
                        </label>
                        <label className="mr-4 flex items-center">
                            <input
                                type="number"
                                name="dateEnd"
                                value={searchParamsObj.dateEnd ?? '0'}
                                onChange={(event) => setDateEnd(Number(event.target.value))}
                                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                            />
                            <span className="ml-2 text-white">End Date</span>
                        </label>
                        <label
                            className="mr-4 flex items-center justify-center">
                            <input
                                type="checkbox"
                                name="useDates"
                                checked={useDates}
                                onChange={(event) => setUseDates(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span
                                className="ml-2 text-white">Filter by dates</span>
                        </label>
                    </div>
                    <hr className="w-60 white my-4"/>
                    

                </div>
            </form>
        </div>
    );
};

export default AdvancedSearchBar;
