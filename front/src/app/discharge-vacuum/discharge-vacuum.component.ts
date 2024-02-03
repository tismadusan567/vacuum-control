import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { formatStartTime } from '../util';

@Component({
  selector: 'app-discharge-vacuum',
  templateUrl: './discharge-vacuum.component.html',
  styleUrls: ['./discharge-vacuum.component.css']
})
export class DischargeVacuumComponent {
  dischargeVacuumForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.dischargeVacuumForm = this.formBuilder.group({
      vacuumId: [0, Validators.required],
      startTime: ['']
    });
  }

  dischargeVacuum() {
    if (this.dischargeVacuumForm.valid) {
      let vacuumId: number = this.dischargeVacuumForm.get('vacuumId')?.value;
      let date: string | undefined = formatStartTime(this.dischargeVacuumForm.get('startTime')?.value);;
      this.apiService.dischargeVacuum(vacuumId, date).subscribe(resp => {
        console.log(resp);
      });
    }
  }
}
