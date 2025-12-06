import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDepartmentService } from '../../services/sub-department-service';
import { DepartmentService } from '../../services/department-service';
import { Department } from '../../models/department';
import { SubDepartment } from '../../models/subDepartment';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { take } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sub-department-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './sub-department-form-component.html',
  styleUrls: ['./sub-department-form-component.css'],
})
export class SubDepartmentFormComponent implements OnInit {
  formGroup: FormGroup;
  subDeptId = signal<number | null>(null);
  departmentsFromApi = signal<Department[]>([]);
  isSubmitting = signal(false);
  backendErrors = signal<string[] | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly sds: SubDepartmentService,
    private readonly ds: DepartmentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      departmentId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // load departments for the select
    this.ds.getDepartmentsFromApi().pipe(take(1)).subscribe({
      next: (departments: Department[]) => this.departmentsFromApi.set(departments),
      error: (err: any) => console.error('Error loading departments:', err),
    });

    // check route param for edit
    const idParam = this.route.snapshot.paramMap.get('id');
    this.subDeptId.set(idParam ? Number(idParam) : null);

    if (this.subDeptId()) {
      // edit mode: load existing sub-department
      this.sds.getSubDepartmentByIdFromApi(this.subDeptId()!).pipe(take(1)).subscribe({
        next: (sd: SubDepartment) => {
          this.formGroup.patchValue({ name: sd.name, departmentId: sd.department?.id ?? null });
        },
        error: (err: any) => {
          console.error('Error loading sub-department:', err);
          this.backendErrors.set(['Failed to load data.']);
        },
      });
    } else {
      // creation: allow pre-fill from query param (e.g., departmentId)
      this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
        const deptId = params.get('departmentId');
        if (deptId) {
          const id = Number(deptId);
          if (!isNaN(id)) {
            this.formGroup.patchValue({ departmentId: id });
          }
        }
      });
    }
  }

  saveSubDepartment(): void {
    if (this.formGroup.invalid) {
      this.backendErrors.set(['Please fill all required fields.']);
      this.formGroup.markAllAsTouched();
      return;
    }

    const { name, departmentId } = this.formGroup.value;
    this.backendErrors.set(null);
    this.isSubmitting.set(true);

    const payload: SubDepartment = {
      id: this.subDeptId() ?? 0,
      name,
      department: { id: departmentId, name: '' } as Department,
    };

    const id = this.subDeptId();
    const req$ = id !== null
      ? this.sds.editSubDepartmentInApi(id, payload)
      : this.sds.addSubDepartmentToApi(payload);

    req$.pipe(take(1), finalize(() => this.isSubmitting.set(false))).subscribe({
      next: () => this.router.navigate(['/sub-departments/list']),
      error: (err: any) => this.handleBackendError(err),
    });
  }

  private handleBackendError(err: any) {
    console.error('Sub-department backend error:', err);
    if (err.status === 400 && err.error && typeof err.error === 'object') {
      // backend returns a map of field -> message (see your controller)
      const messages: string[] = [];
      Object.entries(err.error).forEach(([field, msg]) => {
        messages.push(String(msg));
        const control = this.formGroup.get(field);
        if (control) {
          control.setErrors({ server: String(msg) });
        }
      });
      this.backendErrors.set(messages);
    } else if (err.message) {
      this.backendErrors.set([String(err.message)]);
    } else {
      this.backendErrors.set(['An unexpected error occurred.']);
    }
  }

  cancel(): void {
    this.router.navigate(['/sub-departments/list']);
  }
}
