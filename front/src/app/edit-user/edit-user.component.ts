import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  extractionForm: FormGroup;
  user!: User;

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.apiService.getUser(id).subscribe(user => {
      this.user = user;
    })
  }

  editUser() {
    this.apiService.editUser(
      this.user.userId,
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
