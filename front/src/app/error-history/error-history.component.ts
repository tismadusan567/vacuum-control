import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ErrorMessage } from '../model';

@Component({
  selector: 'app-error-history',
  templateUrl: './error-history.component.html',
  styleUrls: ['./error-history.component.css']
})
export class ErrorHistoryComponent {
  errorMessages: ErrorMessage[] = [];

  constructor(private apiService: ApiService) {
    this.getErrorMessages();
  }

  getErrorMessages(): void {
    this.apiService.getErrorMessages().subscribe(resp => {
      this.errorMessages = resp;
  });
  }
}
