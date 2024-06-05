import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchParamsType from '../../types/SearchParamsType.tsx';
import DepartmentModel from "../../models/DepartmentModel.tsx";
import DepartmentType from "../../types/DepartmentType.tsx";
import { useFlashes } from "../../providers/FlashesProvider.tsx";

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
        ).catch((error) => {
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
        departmentId = departmentId !== 0 ? departmentId : null;
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

    useEffect(() => {
        setSearchParamsObj({
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
        })
    }, [setSearchParamsObj, searchParams])

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
        <div className="flex items-center justify-center py-8 bg-gray-900">
            <form onSubmit={handleSearch} className="w-full max-w-4xl">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        name="q"
                        value={searchParamsObj.q ?? ''}
                        onChange={(event) => setQ(event.target.value)}
                        className="flex-grow bg-gray-800 text-white placeholder-gray-400 rounded-full px-4 py-2 mr-4 focus:outline-none"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-300 transition duration-300"
                    >
                        Search
                    </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between mb-4">
                        <label className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                name="isHighlight"
                                checked={searchParamsObj.isHighlight ?? undefined}
                                onChange={(event) => setIsHighlight(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Highlight</span>
                        </label>
                        <label className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                name="title"
                                checked={searchParamsObj.title ?? undefined}
                                onChange={(event) => setTitle(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Title</span>
                        </label>
                        <label className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                name="tags"
                                checked={searchParamsObj.tags ?? undefined}
                                onChange={(event) => setTags(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Tags</span>
                        </label>
                        <label className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                name="isOnView"
                                checked={searchParamsObj.isOnView ?? undefined}
                                onChange={(event) => setIsOnView(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Is On View</span>
                        </label>
                        <label className="flex items-center mr-4">
                            <input
                                type="checkbox"
                                name="artistOrCulture"
                                checked={searchParamsObj.artistOrCulture ?? undefined}
                                onChange={(event) => setArtistOrCulture(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Artist or Culture</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="hasImages"
                                checked={searchParamsObj.hasImages ?? undefined}
                                onChange={(event) => setHasImages(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Has Images</span>
                        </label>
                    </div>
                    <div className="flex justify-between mb-4 flex-wrap">
                        <div className="flex flex-col">
                            <label className="text-white mb-2">Department</label>
                            <select
                                name="departmentId"
                                value={searchParamsObj.departmentId ?? ''}
                                onChange={(event) => setDepartmentId(Number(event.target.value))}
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
                            >
                                <option value="">Select a department</option>
                                {departments.map(department => (
                                    <option key={department.departmentId} value={department.departmentId}>
                                        {department.displayName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-2">Medium</label>
                            <input
                                type="text"
                                name="medium"
                                value={searchParamsObj.medium ?? undefined}
                                onChange={(event) => setMedium(event.target.value)}
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-2">Geo Location</label>
                            <input
                                type="text"
                                name="geoLocation"
                                value={searchParamsObj.geoLocation ?? undefined}
                                onChange={(event) => setGeoLocation(event.target.value)}
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mb-4 flex-wrap">
                        <div className="flex flex-col">
                            <label className="text-white mb-2">Start Date</label>
                            <input
                                type="number"
                                name="dateBegin"
                                value={searchParamsObj.dateBegin ?? '0'}
                                onChange={(event) => setDateBegin(Number(event.target.value))}
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white mb-2">End Date</label>
                            <input
                                type="number"
                                name="dateEnd"
                                value={searchParamsObj.dateEnd ?? '0'}
                                onChange={(event) => setDateEnd(Number(event.target.value))}
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center mt-6">
                            <input
                                type="checkbox"
                                name="useDates"
                                checked={useDates}
                                onChange={(event) => setUseDates(event.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-white">Filter by dates</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearchBar;
