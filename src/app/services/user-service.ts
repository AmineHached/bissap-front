import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users : User[] = [
    {id : 1, name : 'value', age : 20, email : 'test@gmail.com', department: {id: 1, name: 'HR'}},
    {id : 2, name : 'value2', age : 25, email : 'test2@gmail.com', department: {id: 2, name: 'IT'}},
    {id : 3, name : 'value3', age : 30, email : 'test3@gmail.com', department: {id: 1, name: 'HR'}},
  ]

  // Method to get all users
  public getUsers(): User[] {
    return this.users;
  }

  // Method to add a new user
  public addUser(user: User): void {
    user.id = this.users.length + 1; // Simple ID generation
    this.users.push(user);
  }

  // Method to update a user
  public updateUser(id: number, updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  // Method to delete a user
  public deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  // Method to find a user by ID
  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
  
}
