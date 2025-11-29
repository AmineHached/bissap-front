import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MaterialModule } from '../../material/material-module';
import { CommonModule, JsonPipe } from '@angular/common';
import { Department } from '../../models/department';
import { UserService } from '../../services/user-service';
import { DepartmentService } from '../../services/department-service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL_IMPORTS, MaterialModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.css',
})
export class UserFormComponent implements OnInit{
  formGroup: FormGroup;
  departments : Department[]=[];
  userId! : number | null;

  user = {
    name: '',
    email: '',
    age: '',
  };
  storedData:any = null;

  constructor(
    private builder: FormBuilder, 
    private us : UserService, // use createUser
    private ds : DepartmentService,  // use getDepartments
    private router : Router, // fix redirection using navigate or navigateByUrl
    private route : ActivatedRoute // create user if !id  , edit user if id
    ) {
    this.formGroup = this.builder.group({
      name: ['', [Validators.required]],
      age: [null, Validators.required],
      email: ['', [Validators.email, Validators.required]],
      department : [null]
    });
  }
  ngOnInit(): void {
    this.departments = this.ds.getDepartments();
    
  }


  saveUser():void{
    const data : User = {id : this.userId ?? 1, ...this.formGroup.value};
    if(this.userId){
      this.us.updateUser(this.userId , data);
    }else{
      this.us.createUser(data);
    }
    this.router.navigate(['/users/list']);
  }




  ts_saveUser() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.storedData = this.formGroup.value;
  }

  tdf_saveUser(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.storedData = { ...this.user };
  }

  clearContent() {
    this.formGroup.reset();
    this.formGroup.clearValidators();
    this.storedData = null;
  }

  clearContent1(form: any) {
    form.resetForm();
    this.storedData = null;
  }
}
