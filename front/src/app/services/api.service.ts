import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../model';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private jwtToken: string = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyM0BnbWFpbC5jb20iLCJyb2xlcyI6IltjYW5fY3JlYXRlX3VzZXJzLCBjYW5fcmVhZF91c2VycywgY2FuX3VwZGF0ZV91c2VycywgY2FuX2RlbGV0ZV91c2Vyc10iLCJleHAiOjE3MDUwODQzODYsImlhdCI6MTcwNTA0ODM4Nn0.Ihq8cSIYW1uA1erHS1jidqYrSRNcSCXx1G06Yd9B4Qet6rTh5ZQAfJzLBTiu45DWxrQYDfbeUyHgzBijDK4B0Q";
  private readonly loginUrl = "http://localhost:8080/auth/login";
  private readonly usersUrl = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient, private permissionsService: PermissionsService) {
    this.jwtToken = localStorage.getItem('domacijwt') ?? '';
   }

   login(email: string, password: string): void {
    this.httpClient.post<LoginResponse>(this.loginUrl, {email: email, password: password})
    .subscribe(resp => 
      {
        this.setToken(resp.jwt);
        this.permissionsService.permissions = resp.permissions;
      }
    );
   }

   getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.get<User[]>(this.usersUrl, {headers});
   }

   createUser(firstName: string, lastName: string, email: string, permissions: number, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.post(this.usersUrl, {firstName: firstName, lastName: lastName, email: email, permissions: permissions, password: password} , {headers});
   }

   editUser(userId: number, firstName: string, lastName: string, email: string, permissions: number, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.put(this.usersUrl, {userId: userId, firstName: firstName, lastName: lastName, email: email, permissions: permissions, password: password} , {headers});
   }

   getUser(userId: number): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.get<User>(this.usersUrl + `/${userId}`, {headers});
   }

   deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.delete(this.usersUrl + `/${userId}`, {headers});
   }

   private setToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('domacijwt', this.jwtToken);
   }
}
