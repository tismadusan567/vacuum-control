import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  extractionForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
    ) {
    this.extractionForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      permissions: [0, Validators.required],
      password: ['', Validators.required]
    })
  }

  addUser() {
    this.apiService.createUser(
      this.extractionForm.get('name')?.value,
      this.extractionForm.get('last_name')?.value,
      this.extractionForm.get('email')?.value,
      this.extractionForm.get('permissions')?.value,
      this.extractionForm.get('password')?.value
    ).subscribe(response => {
      console.log(response);
    });
  }

}
