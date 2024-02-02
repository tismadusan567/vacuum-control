import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-vacuum',
  templateUrl: './add-vacuum.component.html',
  styleUrls: ['./add-vacuum.component.css']
})
export class AddVacuumComponent {

  public addForm: FormGroup

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.apiService.addVacuum(this.addForm.get('name')?.value)
    .subscribe(resp => {
      console.log(resp);
    });
  }
}
