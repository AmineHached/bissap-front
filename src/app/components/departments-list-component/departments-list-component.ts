import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { Router } from '@angular/router';
import { Department } from '../../models/department';

@Component({
  selector: 'app-departments-list-component',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  templateUrl: './departments-list-component.html',
  styleUrls: ['./departments-list-component.css'],
})
export class DepartmentsListComponent implements OnInit {

  departmentsFromApi = signal<Department[]>([]);

  constructor(private readonly ds: DepartmentService, private readonly router: Router) {}

  fetchDepartments(): void {
    this.ds.getDepartmentsFromApi().subscribe((data: Department[]) => {
      this.departmentsFromApi.set(data);
    });
  }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  openCreateDepartment(): void {
    this.router.navigate(['/departments/create']);
  }

  openEditDepartment(id: number): void {
    this.router.navigate(['/departments', id, 'edit']);
  }

  removeDepartmentFromApi(id: number) {
    if (confirm('Are you sure?')) {
      this.ds.deleteDepartmentFromApi(id).subscribe(() => {
        this.fetchDepartments();
      });
    }
  }

  editDepartmentFromApi(id: number): void {
    this.router.navigate(['/departments', id, 'edit']);
  }

  addDepartmentFromApi(): void {
    this.router.navigate(['/departments/create']);
  }
}
