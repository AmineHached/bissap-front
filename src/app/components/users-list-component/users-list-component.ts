import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list-component.html',
  styleUrls: ['./users-list-component.css'],
})
export class UsersListComponent implements OnInit {
  usersFromApi = signal<User[]>([]);

  constructor(private readonly us: UserService, private readonly router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.us.getUsersFromApi().subscribe({
      next: (users: User[]) => {
        this.usersFromApi.set(users);
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  openCreateUser(): void {
    this.router.navigate(['/users/create']);
  }

  openEditUser(id: number): void {
    this.router.navigate(['/users', id, 'edit']);
  }

  removeUserFromApi(id: number): void {
    if (confirm('Are you sure that you want to delete this user?')) {
      this.us.deleteUserFromApi(id).subscribe({
        next: () => {
          this.fetchUsers();
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }
}

