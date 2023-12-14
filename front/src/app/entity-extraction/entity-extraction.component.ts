import { Component } from '@angular/core';
import { DandelionService } from '../services/dandelion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annotation } from '../model';

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent {

  apiToken: string;
  extractionForm: FormGroup;
  sliderValue: number = 0.5;
  annotations: Annotation[] = [];

  constructor(
    private dandelionService: DandelionService,
    private formBuilder: FormBuilder
    ) {
    this.apiToken = this.dandelionService.getToken();
    this.extractionForm = this.formBuilder.group({
      text: ['', Validators.required],
      min_confidence: [0.5, Validators.required],
      image: false,
      abstract: false,
      categories: false
    })
  }

  extractEntities() {
    this.dandelionService.getEntityExtraction(
      this.extractionForm.get('text')?.value,
      this.extractionForm.get('min_confidence')?.value,
      this.extractionForm.get('image')?.value,
      this.extractionForm.get('abstract')?.value,
      this.extractionForm.get('categories')?.value
    ).subscribe( response => {
      this.annotations = response.annotations;
    });
  }

}
