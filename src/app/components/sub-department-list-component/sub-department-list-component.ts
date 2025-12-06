import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { SubDepartment } from '../../models/subDepartment';
import { SubDepartmentService } from '../../services/sub-department-service';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department-service';

@Component({
  selector: 'app-sub-department-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-department-list-component.html',
  styleUrls: ['./sub-department-list-component.css'],
})
export class SubDepartmentListComponent implements OnInit {
  departmentsFromApi = signal<Department[]>([]);
  subDepartmentsFromApi = signal<SubDepartment[]>([]);

  constructor(
    private readonly sds: SubDepartmentService,
    private readonly ds: DepartmentService,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchSubDepartments();
  }

  private fetchDepartments(): void {
    this.ds.getDepartmentsFromApi().subscribe({
      next: (departments: Department[]) => {
        this.departmentsFromApi.set(departments);
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      },
    });
  }

  private fetchSubDepartments(): void {
    this.sds.getSubDepartmentsFromApi().subscribe({
      next: (subDepartments: SubDepartment[]) => {
        this.subDepartmentsFromApi.set(subDepartments);
      },
      error: (error: any) => {
        console.error('Error fetching sub-departments:', error);
      },
    });
  }

  createSubDepartment(): void {
    this.router.navigate(['/sub-departments/create']);
  }

  // Template calls `openCreateSubDepartment(department.id)` — provide a helper
  // that navigates to the create page and passes the department id as a query
  // parameter when provided.
  openCreateSubDepartment(departmentId?: number): void {
    if (departmentId != null) {
      this.router.navigate(['/sub-departments/create'], { queryParams: { departmentId } });
    } else {
      this.router.navigate(['/sub-departments/create']);
    }
  }

  editSubDepartmentFromApi(id: number): void {
    this.router.navigate(['/sub-departments', id, 'edit']);
  }

  removeSubDepartmentFromApi(id: number) {
    if (confirm('Are you sure?')) {
      this.sds.deleteSubDepartmentFromApi(id).subscribe(() => {
        // refresh list after successful deletion
        this.fetchSubDepartments();
        // stay on the list view (no immediate navigation needed)
      }, (err: any) => {
        console.error('Error deleting sub-department:', err);
      });
    }
  }

  // Return sub-departments that belong to the given department id.
  // The template calls this function in an `*ngFor` filter.
  subDepartmentsByDepartment(departmentId: number): SubDepartment[] {
    return this.subDepartmentsFromApi().filter(sd => sd.department?.id === departmentId);
  }
}

