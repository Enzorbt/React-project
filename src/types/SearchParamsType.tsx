type SearchParamsType = {
    q?: string;
    isHighlight?: boolean;
    title?: boolean;
    tags?: boolean;
    departmentId?: number;
    isOnView?: boolean;
    artistOrCulture?: boolean;
    medium?: string;
    hasImages?: boolean;
    geoLocation?: string;
    dateBegin?: number;
    dateEnd?: number;
}

export default SearchParamsType;