import ObjectsType from '../types/ObjectsType';
import ObjectsParamsType from "../types/ObjectsParamsType.tsx";

class ObjectsModel {
    private readonly baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getObjects(params: ObjectsParamsType): Promise<ObjectsType> {
        const queryString = this.buildQueryString(params);
        try {
            const response = await fetch(`${this.baseURL}/objects${queryString}`);
            if (!response.ok) {
                throw new Error('Failed to fetch objects');
            }
            const objects = await response.json();
            return objects;
        } catch (error) {
            console.error(`Error fetching objects with query ${queryString}:`, error);
            throw error;
        }
    }

    private buildQueryString(params: ObjectsParamsType): string {
        const queryParams: string[] = [];

        if (params.metadataDate) {
            queryParams.push(`metadataDate=${params.metadataDate}`);
        }

        if (params.departmentIds) {
            const departmentIdString = params.departmentIds.join('|');
            queryParams.push(`departmentIds=${departmentIdString}`);
        }

        return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    }
}



export default ObjectsModel;