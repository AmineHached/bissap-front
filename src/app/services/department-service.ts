import { Injectable } from '@angular/core';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private departments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Finance' },
  ];

  // Method to get all departments
  public getDepartments(): Department[] {
    return this.departments;
  }

  // Method to add a new department
  public addDepartment(department: Department): void {
    this.departments.push(department);
  }

  // Method to update a department
  public updateDepartment(id: number, updatedDepartment: Department): void {
    const index = this.departments.findIndex(dept => dept.id === id);
    if (index !== -1) {
      this.departments[index] = updatedDepartment;
    }
  }

  // Method to delete a department
  public deleteDepartment(id: number): void {
    this.departments = this.departments.filter(dept => dept.id !== id);
  }

  // Method to find a department by ID
  public getDepartmentById(id: number): { id: number; name: string } | undefined {
    return this.departments.find(dept => dept.id === id);
  }
}

