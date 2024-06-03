import ObjectsType from "../types/ObjectsType.tsx";
import ObjectType from "../types/ObjectType.tsx";
import ObjectModel from "./ObjectModel.tsx";
import SearchParamsType from "../types/SearchParamsType.tsx";

class SearchModel {
    private readonly baseURL: string;
    private readonly objectModel: ObjectModel;
    private readonly highlights: ObjectType[];
    
    constructor(baseURL: string, objectModel: ObjectModel) {
        this.baseURL = baseURL;
        this.highlights = [];
        this.objectModel = objectModel;
    }

    async getHighlights(): Promise<ObjectType[]> {
        if (this.highlights.length === 0) {
            const response = await this.searchObjects({ isHighlight: true });
            for (const objectIDsKey in response.objectIDs) {
                this.highlights.push(await this.objectModel.getObject(objectIDsKey));
            }
        }
        return this.highlights;
    }

    async searchObjects(params: SearchParamsType): Promise<ObjectsType> {
        const queryString = this.buildQueryString(params);
        try {
            const response = await fetch(`${this.baseURL}/search${queryString}`);
            if (!response.ok) {
                throw new Error('Failed to search objects');
            }
            const searchResult = await response.json();
            return searchResult;
        } catch (error) {
            console.error(`Error searching objects with query ${queryString}:`, error);
            throw error;
        }
    }

    private buildQueryString(params: SearchParamsType): string {
        const queryParams: string[] = [];

        if (!params.q) {
            queryParams.push(`q=*`);
        } else {
            queryParams.push(`q=${encodeURIComponent(params.q)}`);
        }

        if (params.isHighlight !== undefined) {
            queryParams.push(`isHighlight=${params.isHighlight}`);
        }

        if (params.title !== undefined) {
            queryParams.push(`title=${params.title}`);
        }

        if (params.tags !== undefined) {
            queryParams.push(`tags=${params.tags}`);
        }

        if (params.departmentId) {
            queryParams.push(`departmentId=${params.departmentId}`);
        }

        if (params.isOnView !== undefined) {
            queryParams.push(`isOnView=${params.isOnView}`);
        }

        if (params.artistOrCulture !== undefined) {
            queryParams.push(`artistOrCulture=${params.artistOrCulture}`);
        }

        if (params.medium) {
            queryParams.push(`medium=${encodeURIComponent(params.medium)}`);
        }

        if (params.hasImages !== undefined) {
            queryParams.push(`hasImages=${params.hasImages}`);
        }

        if (params.geoLocation) {
            queryParams.push(`geoLocation=${encodeURIComponent(params.geoLocation)}`);
        }

        if (params.dateBegin !== undefined && params.dateEnd !== undefined) {
            queryParams.push(`dateBegin=${params.dateBegin}`);
            queryParams.push(`dateEnd=${params.dateEnd}`);
        }

        return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    }
}

export default SearchModel;
