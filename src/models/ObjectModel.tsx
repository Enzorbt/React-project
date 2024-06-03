import ObjectType from '../types/ObjectType';

class ObjectModel {
    private readonly baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getObject(objectID: string): Promise<ObjectType> {
        try {
            const response = await fetch(`${this.baseURL}/objects/${objectID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch object');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching object ${objectID}:`, error);
            throw error;
        }
    }
}

export default ObjectModel;
