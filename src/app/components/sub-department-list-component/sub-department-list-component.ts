import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDepartment } from '../../models/subDepartment';
import { SubDepartmentService } from '../../services/sub-department-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-department-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-department-list-component.html',
  styleUrls: ['./sub-department-list-component.css'],
})
export class SubDepartmentListComponent implements OnInit {
  subDepartmentsFromApi = signal<SubDepartment[]>([]);

  constructor(
    private readonly sds: SubDepartmentService,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
    this.fetchSubDepartments();
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

  editSubDepartmentFromApi(id: number): void {
    this.router.navigate(['/sub-departments', id, 'edit']);
  }

  removeSubDepartmentFromApi(id: number) {
    if (confirm('Are you sure?')) {
      this.sds.deleteSubDepartmentFromApi(id).subscribe({
        next: () => {
          this.fetchSubDepartments();
        },
        error: (err: any) => {
          console.error('Error deleting sub-department:', err);
        }
      });
    }
  }
}

