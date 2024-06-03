import DepartmentType from '../types/DepartmentType';

class DepartmentModel {
    private readonly baseURL: string;
    private departments: DepartmentType[];

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.departments = [];
    }

    async getDepartments(): Promise<DepartmentType[]> {
        if (this.departments.length > 0) {
            return this.departments;
        }
        try {
            const response = await fetch(`${this.baseURL}/departments`);
            if (!response.ok) {
                throw new Error('Failed to fetch departments');
            }
            const departments = await response.json();
            this.departments = departments.departments;
            return this.departments;
        } catch (error) {
            console.error(`Error fetching departments: ${error}`);
            throw error;
        }
    }

    getDepartmentNameById(id: number): string | undefined {
        const department = this.departments.find(d => d.departmentId === id);
        return department?.displayName;
    }

    getDepartmentIdByName(name: string): number | undefined {
        const department = this.departments.find(d => d.displayName === name);
        return department?.departmentId;
    }
}

export default DepartmentModel;
