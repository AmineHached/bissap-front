import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department-service';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { Router } from '@angular/router';
import { Department } from '../../models/department';

@Component({
  selector: 'app-departments-list-component',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  templateUrl: './departments-list-component.html',
  styleUrl: './departments-list-component.css',
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];

  constructor(private ds: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.departments = this.ds.getDepartments();
  }

  openCreateDepartment(): void {
    this.router.navigate(['/departments/create']);
  }

  openEditDepartment(id: number): void {
    this.router.navigate(['/departments', id, 'edit']);
  }

  removeDepartment(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?');
    if (confirmDelete) {
      this.ds.deleteDepartment(id);
      this.departments = this.ds.getDepartments();
    }
  }
}
