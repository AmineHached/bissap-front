import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  // Ensure there's a slash between base URL and prefix
  apiUrl = `${environment.apiUrl}/${environment.departmentPrefix}`;

  constructor(private http: HttpClient) {}

  private departments : Department[]=[
    {id : 1, name : 'Department 1'},
    {id : 2, name : 'Department 2'},
    {id : 3, name : 'Department 3'}
  ]
  // GET DEPARTMENTS
  getDepartments():Department[]{
    return this.departments;
  }

  getDepartmentsFromApi(): any{
    return this.http.get<Department[]>(this.apiUrl+"/all")
  }
  //ADD DEPARTMENT
  addDepartment(createD : Department):void{
    createD.id = this.departments.length +1;
    this.departments.push(createD);
  }
  //EDIT DEPARTMENT
  editDepartment(id: number , editD : Department):void{
    const index= this.departments.findIndex(dept => dept.id === id);
    if(index > -1){
      this.departments[index]= editD;
    }
  }
  //DELETE DEPARTMENT
  deleteDepartment(id:number):void{
    this.departments = this.departments.filter(dept => dept.id !== id);
  }
}
