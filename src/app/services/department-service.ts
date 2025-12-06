import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  // Ensure there's a slash between base URL and prefix
  apiUrl = `${environment.apiUrl}${environment.departmentPrefix}`;

  constructor(private readonly http: HttpClient) {}

  private departments : Department[]=[
    {id : 1, name : 'Department 1'},
    {id : 2, name : 'Department 2'},
    {id : 3, name : 'Department 3'}
  ]
  // GET DEPARTMENTS
  getDepartments():Department[]{
    return this.departments;
  }

  // GET DEPARTMENTS FROM API
  getDepartmentsFromApi(): any{
    return this.http.get<Department[]>(this.apiUrl+"/all")
  }
  // GET DEPARTMENT BY ID FROM API
  getDepartmentByIdFromApi(id: number): any {
    return this.http.get<Department>(`${this.apiUrl}/get/${id}`);
  }

  //ADD DEPARTMENT
  addDepartment(createD : Department):void{
    createD.id = this.departments.length +1;
    this.departments.push(createD);
  }
  // ADD DEPARTMENT TO API
  addDepartmentToApi(dept: Department): any {
    return this.http.post<Department>(this.apiUrl + '/create', dept);
  }

  //EDIT DEPARTMENT
  editDepartment(id: number , editD : Department):void{
    const index= this.departments.findIndex(dept => dept.id === id);
    if(index > -1){
      this.departments[index]= editD;
    }
  }
  // EDIT DEPARTMENT IN API
  editDepartmentInApi(id: number, dept: Department): any {
    return this.http.put<Department>(`${this.apiUrl}/update/${id}`, dept);
  }

  //DELETE DEPARTMENT
  deleteDepartment(id:number):void{
    this.departments = this.departments.filter(dept => dept.id !== id);
  }
  // DELETE DEPARTMENT FROM API
  deleteDepartmentFromApi(id: number): any {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
