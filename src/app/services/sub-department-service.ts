import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubDepartment } from '../models/subDepartment';

@Injectable({
  providedIn: 'root',
})
export class SubDepartmentService {
  apiUrl = `${environment.apiUrl}/subDepartments`;

  constructor(private readonly http: HttpClient) {}

  getSubDepartmentsFromApi() {
    return this.http.get<SubDepartment[]>(`${this.apiUrl}/`);
  }

  getSubDepartmentByIdFromApi(id: number) {
    return this.http.get<SubDepartment>(`${this.apiUrl}/get/${id}`);
  }

  addSubDepartmentToApi(sd: SubDepartment) {
    return this.http.post<SubDepartment>(`${this.apiUrl}/create`, sd);
  }

  editSubDepartmentInApi(id: number, sd: SubDepartment) {
    return this.http.put<SubDepartment>(`${this.apiUrl}/update/${id}`, sd);
  }

  deleteSubDepartmentFromApi(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  filterByDepartmentName(name: string) {
    return this.http.get<SubDepartment[]>(`${this.apiUrl}/filter/${encodeURIComponent(name)}`);
  }
}

