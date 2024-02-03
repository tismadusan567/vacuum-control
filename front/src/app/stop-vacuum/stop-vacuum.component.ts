import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { formatStartTime } from '../util';

@Component({
  selector: 'app-stop-vacuum',
  templateUrl: './stop-vacuum.component.html',
  styleUrls: ['./stop-vacuum.component.css']
})
export class StopVacuumComponent {
  stopVacuumForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.stopVacuumForm = this.formBuilder.group({
      vacuumId: [0, Validators.required],
      startTime: ['']
    });
  }

  stopVacuum() {
    if (this.stopVacuumForm.valid) {
      let vacuumId: number = this.stopVacuumForm.get('vacuumId')?.value;
      let date: string | undefined = formatStartTime(this.stopVacuumForm.get('startTime')?.value);;
      this.apiService.stopVacuum(vacuumId, date).subscribe(resp => {
        console.log(resp);
      });
    }
  }
}
