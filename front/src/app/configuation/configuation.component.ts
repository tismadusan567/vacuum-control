import { Component } from '@angular/core';
import { DandelionService } from '../services/dandelion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuation',
  templateUrl: './configuation.component.html',
  styleUrls: ['./configuation.component.css']
})
export class ConfiguationComponent {

  apiToken: string;

  constructor(private dandelionService: DandelionService) {
    this.apiToken = this.dandelionService.getToken();
  }

  setToken(): void {
    this.dandelionService.setToken(this.apiToken);
  }

}
