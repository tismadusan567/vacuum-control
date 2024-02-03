import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage, LoginResponse, User, Vacuum } from '../model';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jwtToken: string = "";
  private readonly loginUrl = "http://localhost:8080/auth/login";
  private readonly usersUrl = "http://localhost:8080/users";
  private readonly vacuumsUrl = "http://localhost:8080/vacuum";

  constructor(private httpClient: HttpClient, private permissionsService: PermissionsService) {
    this.jwtToken = localStorage.getItem('domacijwt') ?? '';
   }

   login(email: string, password: string): void {
    this.httpClient.post<LoginResponse>(this.loginUrl, {email: email, password: password})
    .subscribe(resp => 
      {
        this.setToken(resp.jwt);
        this.permissionsService.permissions = resp.permissions;
        if(resp.permissions.length === 0) {
          alert("Warning, you have no permissions");
        }
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

   searchVacuums(name?: string, status?: string, dateFrom?: string, dateTo?: string ): Observable<Vacuum[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    let params = new HttpParams();
    if (name) params = params.append('name', name);
    if (status) params = params.append('status', status);
    if (dateFrom) params = params.append('dateFrom', dateFrom);
    if (dateTo) params = params.append('dateTo', dateTo);

    return this.httpClient.get<Vacuum[]>(this.vacuumsUrl + `/search`, {headers: headers, params: params});
   }

   addVacuum(name: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    let params = new HttpParams().append('name', name);

    return this.httpClient.post<Vacuum>(this.vacuumsUrl + `/add`, {}, {headers: headers, params: params});
   }

   getErrorMessages() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.get<ErrorMessage[]>(this.vacuumsUrl + `/errorhistory`, {headers})
   }

   startVacuum(vacuumId: number, date?: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    let params = new HttpParams();
    if (date) params = params.append("scheduleDate", date);

    return this.httpClient.post(this.vacuumsUrl + `/start/` + vacuumId, {}, {headers, params});
  }

  stopVacuum(vacuumId: number, date?: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    let params = new HttpParams();
    if (date) params = params.append("scheduleDate", date);

    return this.httpClient.post(this.vacuumsUrl + `/stop/` + vacuumId, {}, {headers, params});
  }

  dischargeVacuum(vacuumId: number, date?: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    let params = new HttpParams();
    if (date) params = params.append("scheduleDate", date);

    return this.httpClient.post(this.vacuumsUrl + `/discharge/` + vacuumId, {}, {headers, params});
  }

  removeVacuum(vacuumId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

    return this.httpClient.delete(this.vacuumsUrl + `/remove/${vacuumId}`, {headers})
  }

   private setToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('domacijwt', this.jwtToken);
   }

   
}
