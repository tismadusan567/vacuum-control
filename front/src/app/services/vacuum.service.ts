import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VacuumService {

  private  readonly = "http://localhost:8080/vacuum";
  private readonly jwtToken;

  constructor(private apiService: ApiService ) { 
    this.jwtToken = apiService.getJwtToken()
  }
}
