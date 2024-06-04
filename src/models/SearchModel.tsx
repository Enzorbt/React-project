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

    async getCarrouselItems(params: SearchParamsType, nb: number): Promise<ObjectType[]> {
        if (this.highlights.length === 0) {
            const response = await this.searchObjects(params);
            const objectIds = response.objectIDs.slice();
            for (let i = objectIds.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [objectIds[i], objectIds[j]] = [objectIds[j], objectIds[i]];
            }
            for (let i = 0; i < nb; i++) {
                this.highlights.push(await this.objectModel.getObject(objectIds[i]));
            }
        }
        return this.highlights;
    }

    async searchObjects(params: SearchParamsType): Promise<ObjectsType> {
        const queryString = this.buildQueryString(params);
        try {
            const response = await fetch(`${this.baseURL}/search${queryString}`);
            if (!response.ok) {
                throw new Error('Failed to search objects, ' + response.statusText + ", " + await response.json());
            }
            const searchResult = await response.json();
            return searchResult;
        } catch (error) {
            throw new Error(`Error searching objects with query ${queryString}:` + error);
        }
    }

    private buildQueryString(params: SearchParamsType): string {
        const queryParams: string[] = [];
        if (params.isHighlight !== null) {
            queryParams.push(`isHighlight=${params.isHighlight}`);
        }

        if (params.title !== null) {
            queryParams.push(`title=${params.title}`);
        }

        if (params.tags !== null) {
            queryParams.push(`tags=${params.tags}`);
        }

        if (params.departmentId !== null) {
            queryParams.push(`departmentId=${params.departmentId}`);
        }

        if (params.isOnView !== null) {
            queryParams.push(`isOnView=${params.isOnView}`);
        }

        if (params.artistOrCulture !== null) {
            queryParams.push(`artistOrCulture=${params.artistOrCulture}`);
        }

        if (params.medium !== null) {
            queryParams.push(`medium=${encodeURIComponent(params.medium)}`);
        }

        if (params.hasImages !== null) {
            queryParams.push(`hasImages=${params.hasImages}`);
        }

        if (params.geoLocation !== null) {
            queryParams.push(`geoLocation=${encodeURIComponent(params.geoLocation)}`);
        }

        if (params.dateBegin !== null && params.dateEnd !== null) {
            queryParams.push(`dateBegin=${params.dateBegin}`);
            queryParams.push(`dateEnd=${params.dateEnd}`);
        }
        if (params.q === null) {
            queryParams.push(`q=*`);
        } else {
            queryParams.push(`q=${encodeURIComponent(params.q)}`);
        }

        return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    }
}

export default SearchModel;
