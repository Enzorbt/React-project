import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchParamsType from '../types/SearchParamsType';
import DepartmentModel from "../models/DepartmentModel.tsx";
import DepartmentType from "../types/DepartmentType.tsx";

interface AdvancedSearchBarProps {
    departmentModel: DepartmentModel;
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({ departmentModel }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<SearchParamsType>({
        q: '',
        isHighlight: false,
        title: false,
        tags: false,
        departmentId: null,
        isOnView: false,
        artistOrCulture: false,
        medium: '',
        hasImages: false,
        geoLocation: '',
        dateBegin: 0,
        dateEnd: 0,
    });

    const [departments, setDepartments] = useState<DepartmentType[]>([]);
    const [useDates, setUseDates] = useState(false);

    useEffect(() => {
        departmentModel.getDepartments().then(
            setDepartments
        ).catch(
            // Handle error
        );
    }, [departmentModel]);

    const setQ = (q: string) => {
        setSearchParams({ ...searchParams, q });
    };

    const setIsHighlight = (isHighlight: boolean) => {
        setSearchParams({ ...searchParams, isHighlight });
    };

    const setTitle = (title: boolean) => {
        setSearchParams({ ...searchParams, title });
    };

    const setTags = (tags: boolean) => {
        setSearchParams({ ...searchParams, tags });
    };

    const setDepartmentId = (departmentId: number | null) => {
        setSearchParams({ ...searchParams, departmentId });
    };

    const setIsOnView = (isOnView: boolean) => {
        setSearchParams({ ...searchParams, isOnView });
    };

    const setArtistOrCulture = (artistOrCulture: boolean) => {
        setSearchParams({ ...searchParams, artistOrCulture });
    };

    const setMedium = (medium: string) => {
        setSearchParams({ ...searchParams, medium });
    };

    const setHasImages = (hasImages: boolean) => {
        setSearchParams({ ...searchParams, hasImages });
    };

    const setGeoLocation = (geoLocation: string) => {
        setSearchParams({ ...searchParams, geoLocation });
    };

    const setDateBegin = (dateBegin: number | null) => {
        setSearchParams({ ...searchParams, dateBegin });
    };

    const setDateEnd = (dateEnd: number | null) => {
        setSearchParams({ ...searchParams, dateEnd });
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let queryString = '';
        for (const [key, value] of Object.entries(searchParams)) {
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
        <form onSubmit={handleSearch} className="flex flex-col items-center mt-5 bg-black">
            <input
                type="text"
                name="q"
                value={searchParams.q ?? ''}
                onChange={(event) => setQ(event.target.value)}
                className="border border-gray-500 bg-transparent rounded-full px-4 py-2 w-full text-white mb-4"
                placeholder="Search..."
            />
            <div className="flex flex-wrap justify-center">
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="isHighlight"
                        checked={searchParams.isHighlight ?? undefined}
                        onChange={(event) => setIsHighlight(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Highlight</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="title"
                        checked={searchParams.title ?? undefined}
                        onChange={(event) => setTitle(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Title</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="tags"
                        checked={searchParams.tags ?? undefined}
                        onChange={(event) => setTags(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Tags</span>
                </label>
                <label className="mr-4 flex items-center">
                    <select
                        name="departmentId"
                        value={searchParams.departmentId ?? ''}
                        onChange={(event) => setDepartmentId(Number(event.target.value))}
                        className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                    >
                        <option value="">Select a department</option>
                        {departments.map(department => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.displayName}
                            </option>
                        ))}
                    </select>
                    <span className="ml-2 text-white">Department</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="isOnView"
                        checked={searchParams.isOnView ?? undefined}
                        onChange={(event) => setIsOnView(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Is On View</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="artistOrCulture"
                        checked={searchParams.artistOrCulture ?? undefined}
                        onChange={(event) => setArtistOrCulture(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Artist or Culture</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="text"
                        name="medium"
                        value={searchParams.medium ?? undefined}
                        onChange={(event) => setMedium(event.target.value)}
                        className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                    />
                    <span className="ml-2 text-white">Medium</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="hasImages"
                        checked={searchParams.hasImages ?? undefined}
                        onChange={(event) => setHasImages(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Has Images</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="text"
                        name="geoLocation"
                        value={searchParams.geoLocation ?? undefined}
                        onChange={(event) => setGeoLocation(event.target.value)}
                        className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                    />
                    <span className="ml-2 text-white">Geo Location</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="number"
                        name="dateBegin"
                        value={searchParams.dateBegin ?? '0'}
                        onChange={(event) => setDateBegin(Number(event.target.value))}
                        className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                    />
                    <span className="ml-2 text-white">Date Begin</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="number"
                        name="dateEnd"
                        value={searchParams.dateEnd ?? '0'}
                        onChange={(event) => setDateEnd(Number(event.target.value))}
                        className="border border-gray-500 bg-transparent rounded-full px-4 py-2 text-white"
                    />
                    <span className="ml-2 text-white">Date End</span>
                </label>
                <label className="mr-4 flex items-center">
                    <input
                        type="checkbox"
                        name="useDates"
                        checked={useDates}
                        onChange={(event) => setUseDates(event.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-white">Use Dates</span>
                </label>
            </div>
            <button
                type="submit"
                className="bg-transparent text-white opacity-70 rounded-full p-2 mt-4"
            >
                Search
            </button>
        </form>
    );
};

export default AdvancedSearchBar;
