import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { formatStartTime } from '../util';

@Component({
  selector: 'app-start-vacuum',
  templateUrl: './start-vacuum.component.html',
  styleUrls: ['./start-vacuum.component.css']
})
export class StartVacuumComponent {
  startVacuumForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.startVacuumForm = this.formBuilder.group({
      vacuumId: [0, Validators.required],
      startTime: ['']
    });
  }

  startVacuum() {
    if (this.startVacuumForm.valid) {
      let vacuumId: number = this.startVacuumForm.get('vacuumId')?.value;
      let date: string | undefined = formatStartTime(this.startVacuumForm.get('startTime')?.value);;
      this.apiService.startVacuum(vacuumId, date).subscribe(resp => {
        console.log(resp);
      });
    }
  }
}
