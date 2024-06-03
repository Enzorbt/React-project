import ObjectType from '../types/ObjectType';

class ObjectModel {
    private readonly baseURL: string;
    private readonly objects: ObjectType[] = [];

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getObject(objectID: number): Promise<ObjectType> {
        const cachedObject = this.objects.find((obj) => obj.objectID === objectID);
        if (cachedObject) {
            console.log("used cashed object (id:" + cachedObject.objectID + ")");
            return cachedObject;
        }

        try {
            const response = await fetch(`${this.baseURL}/objects/${objectID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch object');
            }
            const object = await response.json();
            this.objects.push(object);
            return object;
        } catch (error) {
            console.error(`Error fetching object ${objectID}:`, error);
            throw error;
        }
    }

}

export default ObjectModel;
