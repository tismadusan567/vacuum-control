import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vacuum',
  templateUrl: './add-vacuum.component.html',
  styleUrls: ['./add-vacuum.component.css']
})
export class AddVacuumComponent {

  public searchForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      name: [null],
      status: [null],
      dateFrom: [null],
      dateTo: [null]
    })
  }

  onSubmit(): void {
    console.log(this.searchForm.get('name')?.value)
    console.log(this.searchForm.get('status')?.value)
    console.log(this.searchForm.get('dateFrom')?.value)
    console.log(this.searchForm.get('dateTo')?.value)
  }
}
