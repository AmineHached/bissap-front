import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { DepartmentService } from '../../services/department-service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Department } from '../../models/department';

@Component({
  selector: 'app-users-list-component',
  imports: [CommonModule],
  templateUrl: './users-list-component.html',
  styleUrl: './users-list-component.css',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  departments: Department[] = [];
  constructor(private us: UserService, private ds: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.us.getUsers();
    this.departments = this.ds.getDepartments();
  }

  openCreateUser(): void {
    this.router.navigate(['/users/create']);
    //this.router.navigateByUrl('/users/create');
  }

  openEditUser(id: number): void {
    this.router.navigate(['/users', id, 'edit']);
  }

  removeUser(id: number): void {
    const alertConfirmation = window.confirm(
      'Are you sure that you want to delete this user ?');
    if (alertConfirmation) {
      this.us.deleteUser(id);
      this.users = this.us.getUsers();
    }
  }
}
