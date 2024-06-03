type SearchParamsType = {
    q: string | null;
    isHighlight: boolean | null;
    title: boolean | null;
    tags: boolean | null;
    departmentId: number | null;
    isOnView: boolean | null;
    artistOrCulture: boolean | null;
    medium: string | null;
    hasImages: boolean | null;
    geoLocation: string | null;
    dateBegin: number | null;
    dateEnd: number | null;
}

export default SearchParamsType;