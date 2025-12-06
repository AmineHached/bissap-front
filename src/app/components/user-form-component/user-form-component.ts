import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { CommonModule } from '@angular/common';
import { SubDepartment } from '../../models/subDepartment';
import { UserService } from '../../services/user-service';
import { SubDepartmentService } from '../../services/sub-department-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './user-form-component.html',
  styleUrls: ['./user-form-component.css'],
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup;
  subDepartmentsFromApi = signal<SubDepartment[]>([]);
  userId = signal<number | null>(null);
  isSubmitting = signal(false);
  backendErrors = signal<string[] | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly us: UserService,
    private readonly sds: SubDepartmentService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.email, Validators.required]],
      userStatus: ['ACTIVE', [Validators.required]],
      subDepartmentId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Load sub-departments for the dropdown
    this.sds.getSubDepartmentsFromApi().pipe(take(1)).subscribe({
      next: (subDepartments: SubDepartment[]) => {
        this.subDepartmentsFromApi.set(subDepartments);
      },
      error: (err: any) => console.error('Error loading sub-departments:', err),
    });

    // Check if editing (route param contains id)
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId.set(idParam ? Number(idParam) : null);

    if (this.userId()) {
      // Load existing user data for edit
      this.us.getUserByIdFromApi(this.userId()!).pipe(take(1)).subscribe({
        next: (user: User) => {
          this.formGroup.patchValue({
            name: user.name,
            age: user.age,
            email: user.email,
            userStatus: user.userStatus,
            subDepartmentId: user.subDepartment?.id ?? null,
          });
        },
        error: (err: any) => {
          console.error('Error loading user:', err);
          this.backendErrors.set(['Failed to load user data.']);
        },
      });
    }
  }

  saveUser(): void {
    if (this.formGroup.invalid) {
      this.backendErrors.set(['Please fill all required fields correctly.']);
      this.formGroup.markAllAsTouched();
      return;
    }

    const { name, age, email, userStatus, subDepartmentId } = this.formGroup.value;
    this.backendErrors.set(null);
    this.isSubmitting.set(true);

    const payload: User = {
      id: this.userId() ?? 0,
      name,
      age,
      email,
      userStatus,
      subDepartment: { id: subDepartmentId, name: '', department: { id: 0, name: '' } },
    };

    const id = this.userId();
    const req$ =
      id !== null
        ? this.us.editUserInApi(id, payload)
        : this.us.addUserToApi(payload);

    req$
      .pipe(
        take(1),
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: () => this.router.navigate(['/users/list']),
        error: (err: any) => this.handleBackendError(err),
      });
  }

  private handleBackendError(err: any) {
    console.error('User backend error:', err);
    if (err.status === 400 && err.error && typeof err.error === 'object') {
      const messages: string[] = [];
      for (const [field, msg] of Object.entries(err.error)) {
        messages.push(String(msg));
        const control = this.formGroup.get(field);
        if (control) {
          control.setErrors({ server: String(msg) });
        }
      }
      this.backendErrors.set(messages);
    } else if (err.message) {
      this.backendErrors.set([String(err.message)]);
    } else {
      this.backendErrors.set(['An unexpected error occurred.']);
    }
  }

  cancel(): void {
    this.router.navigate(['/users/list']);
  }
}

