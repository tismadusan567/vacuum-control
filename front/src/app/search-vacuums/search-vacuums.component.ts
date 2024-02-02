import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Vacuum } from '../model';

@Component({
  selector: 'app-search-vacuums',
  templateUrl: './search-vacuums.component.html',
  styleUrls: ['./search-vacuums.component.css']
})
export class SearchVacuumsComponent {
  searchForm: FormGroup;
  vacuums: Vacuum[] = [];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      name: [null],
      status: [null],
      dateFrom: [null],
      dateTo: [null]
    })
  }

  onSubmit(): void {
    // console.log(this.searchForm.get('name')?.value)
    // console.log(this.searchForm.get('status')?.value)
    // console.log(this.formatDate(this.searchForm.get('dateFrom')?.value))
    // console.log(this.searchForm.get('dateTo')?.value)

    this.apiService.searchVacuums(
      this.searchForm.get('name')?.value,
      this.searchForm.get('status')?.value,
      this.formatDate(this.searchForm.get('dateFrom')?.value),
      this.formatDate(this.searchForm.get('dateTo')?.value)
    ).subscribe(resp => {
      this.vacuums = resp;
    })
  }

  private formatDate(date?: string): string | undefined {
    if (date == undefined) return undefined;
    let split = date.split("-");
    return [split[1], split[2], split[0]].join(".");
  }
}
