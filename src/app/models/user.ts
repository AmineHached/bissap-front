import { Department } from "./department";

export interface User {
    id : number;
    name : string; 
    age : number;
    email : string;
    department : Department;
}
