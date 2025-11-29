import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form',
  // import ReactiveFormsModule and FormsModule to use both reactive and template-driven forms
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  // Define the FormGroup
  formGroup: FormGroup;

  user: any = {
    name: '',
    email: '',
    age: null
  };

  constructor(private readonly builder: FormBuilder) { 
    // Initialize the form group with form controls

    this.formGroup = this.builder.group({
      // Define form controls with initial values
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // Method to handle form submission
  public onSubmit() {
    if (this.formGroup.valid) {
      alert('Form Submitted! ' + JSON.stringify(this.formGroup.value));
    } else {
      alert('Form is invalid');
    }
  }

  public saveUser() { 
    this.user = this.formGroup.value;
    alert('User Saved! ' + JSON.stringify(this.user));
  }

  saveUserTDF(form: any) {
    if (form.valid) {
      this.user = form.value;
      alert('User Saved! ' + JSON.stringify(this.user));
    } else {
      alert('Form is invalid');
    }
  }
}
