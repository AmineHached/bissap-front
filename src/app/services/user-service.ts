import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users : User[] = [
    {id : 1, name : 'user 1', age : 20 , email :'user1@demo.com', department : {id : 1 , name : 'department 1'}},
    {id : 2, name : 'user 2', age : 24 , email :'user2@demo.com', department : {id : 2 , name : 'department 2'}}, 
    {id : 3, name : 'user 3', age : 28 , email :'user3@demo.com', department : {id : 3 , name : 'department 3'}},
    // id : 4 , ...
  ];

  // GET USERS
  getUsers(): User[]{
    return this.users;
  }
  // ADD USER
  createUser(createU : User):void {
    createU.id = this.users.length + 1;
    this.users.push(createU);
  }
  // EDIT USER
  updateUser(id : number , updatedU : User){
    const index = this.users.findIndex(user => user.id === id);
    if(index > -1){
      this.users[index] = updatedU;
    } 
  }
  // DELETE USER
  deleteUser(id : number):void{
    this.users = this.users.filter(user => user.id !== id);
  }
}
