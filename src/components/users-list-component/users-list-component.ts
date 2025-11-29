import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../app/services/user-service';
import { DepartmentService } from '../../app/services/department-service';
import { Router } from '@angular/router';
import { User } from '../../app/models/user';
import { Department } from '../../app/models/department';

@Component({
  selector: 'app-users-list-component',
  imports: [CommonModule],
  templateUrl: './users-list-component.html',
  styleUrls: ['./users-list-component.css'],
})
export class UsersListComponent implements OnInit {

  users : User[] = [];
  departments : Department[] = [];

  constructor(private readonly userService: UserService, private readonly departmentService: DepartmentService, private readonly router: Router) {
    this.users = this.userService.getUsers();
    this.departments = this.departmentService.getDepartments();
  }
  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.departments = this.departmentService.getDepartments();
  }

  openCreateUserForm() {
    this.router.navigate(['/users/create']);
  }

  openEditUserForm(userId: number) {
    this.router.navigate(['/users', userId, 'edit']);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId);
    this.users = this.userService.getUsers();
  }


}
