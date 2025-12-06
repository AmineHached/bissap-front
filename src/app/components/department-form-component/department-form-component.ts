import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department-service';
import { Department } from '../../models/department';
import { MATERIAL_IMPORTS } from '../../material.imports';

@Component({
  selector: 'app-department-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './department-form-component.html',
  styleUrls: ['./department-form-component.css'],
})
export class DepartmentFormComponent implements OnInit {
  formGroup: FormGroup;
  departmentId = signal<number | null>(null);
  department = signal<Department | null>(null);

  // signal to store backend validation errors (name matches template binding)
  backendErrors = signal<string[] | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly ds: DepartmentService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.departmentId.set(idParam ? Number(idParam) : null);

    if (this.departmentId()) {
      this.ds.getDepartmentByIdFromApi(this.departmentId()!).subscribe({
        next: (dept: { name: any; }) => {
          this.formGroup.patchValue({ name: dept.name });
        },
        error: (err: any) => {
          console.error('Error fetching department:', err);
          this.backendErrors.set(['Failed to load department data. Please try again later.']);
        },
      });
    }
  }


  saveDepartment(): void {
    if (this.formGroup.invalid) {
      this.backendErrors.set(['Please fill all required fields.']);
      return;
    }

    const formValue = this.formGroup.value;
  this.backendErrors.set(null); // reset previous errors

    if (this.departmentId()) {
      const updated: Department = { id: this.departmentId()!, name: formValue.name };
      this.ds.editDepartmentInApi(this.departmentId()!, updated)
        .subscribe({
          next: () => this.router.navigate(['/departments/list']),
          error: (err: any) => this.handleBackendError(err)
        });
    } else {
      const newDepartment: Department = { id: 0, name: formValue.name };
      this.ds.addDepartmentToApi(newDepartment)
        .subscribe({
          next: () => this.router.navigate(['/departments/list']),
          error: (err: any) => this.handleBackendError(err)
        });
    }
  }


  private handleBackendError(err: any) {
    console.error('Backend error:', err);
    if (err.status === 400 && err.error?.message) {
      const msg = Array.isArray(err.error.message) ? err.error.message : [String(err.error.message)];
      this.backendErrors.set(msg);
    } else if (err.message) {
      this.backendErrors.set([String(err.message)]);
    } else {
      this.backendErrors.set(['An unexpected error occurred.']);
    }
  }

  cancel(): void {
    this.router.navigate(['/departments/list']);
  }
}