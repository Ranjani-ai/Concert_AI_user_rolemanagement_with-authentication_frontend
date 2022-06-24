import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser } from './createUser';

@Injectable({providedIn: 'root'})
export class CreateUserService {
  private apiServerUrl = 'http://localhost:8080/api/create/new/user';

  constructor(private http: HttpClient){}

  public getUsers(): Observable<CreateUser[]> {
    return this.http.get<CreateUser[]>(`${this.apiServerUrl}/allUser`);
  }

  public addUser(createdUser: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(`${this.apiServerUrl}/addUser`, createdUser);
  }

  public updateUser(createdUser: CreateUser): Observable<CreateUser> {
    return this.http.put<CreateUser>(`${this.apiServerUrl}/update`, createdUser);
  }

  public deleteUser(createUserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${createUserId}`);
  }
}
