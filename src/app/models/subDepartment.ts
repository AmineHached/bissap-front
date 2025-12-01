import { Department } from "./department";

export interface SubDepartment {
  id: number;
  name: string;
  department: Department;
}