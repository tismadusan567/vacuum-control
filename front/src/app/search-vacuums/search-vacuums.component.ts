import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Vacuum } from '../model';
import { formatDate } from '../util';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-search-vacuums',
  templateUrl: './search-vacuums.component.html',
  styleUrls: ['./search-vacuums.component.css']
})
export class SearchVacuumsComponent {
  searchForm: FormGroup;
  vacuums: Vacuum[] = [];

  constructor(
    private apiService: ApiService, 
    private formBuilder: FormBuilder, 
    private permissionsService: PermissionsService
    ) {
    this.searchForm = this.formBuilder.group({
      name: [null],
      status: [null],
      dateFrom: [null],
      dateTo: [null]
    });
  }

  onSubmit(): void {
    // console.log(this.searchForm.get('name')?.value)
    // console.log(this.searchForm.get('status')?.value)
    // console.log(this.formatDate(this.searchForm.get('dateFrom')?.value))
    // console.log(this.searchForm.get('dateTo')?.value)

    this.apiService.searchVacuums(
      this.searchForm.get('name')?.value,
      this.searchForm.get('status')?.value,
      formatDate(this.searchForm.get('dateFrom')?.value),
      formatDate(this.searchForm.get('dateTo')?.value)
    ).subscribe(resp => {
      this.vacuums = resp;
    })
  }

  canRemoveVacuums(): boolean {
    return this.permissionsService.permissions.includes("can_remove_vacuums");
  }

  removeVacuum(vacuumId: number): void {
    this.apiService.removeVacuum(vacuumId).subscribe( resp => {
      console.log(resp);
      this.onSubmit();
    })
  }
}
