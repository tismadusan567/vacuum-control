import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private apiService: ApiService) {
    this.email = ""
    this.password = ""
  }

  login(): void {
    this.apiService.login(this.email, this.password);
  }
}
