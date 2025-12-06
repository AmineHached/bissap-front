import { SubDepartment } from "./subDepartment";

export interface User {
    id: number;
    name: string; 
    age: number;
    email: string;
    userStatus: string;
    subDepartment: SubDepartment;
}

