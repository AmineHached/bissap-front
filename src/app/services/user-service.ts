import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}${environment.userPrefix}`;

  constructor(private readonly http: HttpClient) {}

  // GET ALL USERS FROM API
  getUsersFromApi(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // GET USER BY ID FROM API
  getUserByIdFromApi(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`);
  }

  // ADD USER TO API
  addUserToApi(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  // EDIT USER IN API
  editUserInApi(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }

  // DELETE USER FROM API
  deleteUserFromApi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // FILTER USERS BY SUB-DEPARTMENT NAME
  filterBySubDepartmentName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/filter/${encodeURIComponent(name)}`);
  }
}

