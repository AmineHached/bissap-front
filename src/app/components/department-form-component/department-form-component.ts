import { Component, OnInit } from '@angular/core';
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
  styleUrl: './department-form-component.css',
})
export class DepartmentFormComponent implements OnInit {
  formGroup: FormGroup;
  departmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ds: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.departmentId = Number(idParam);
      const depts = this.ds.getDepartments();
      const dept = depts.find((d) => d.id === this.departmentId);
      if (dept) {
        this.formGroup.patchValue({ name: dept.name });
      }
    }
  }

  saveDepartment(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const payload: Department = {
      id: this.departmentId ?? 0,
      ...this.formGroup.value,
    };

    if (this.departmentId) {
      this.ds.editDepartment(this.departmentId, payload);
    } else {
      this.ds.addDepartment(payload);
    }

    this.router.navigate(['/departments/list']);
  }

  cancel(): void {
    this.router.navigate(['/departments/list']);
  }
}