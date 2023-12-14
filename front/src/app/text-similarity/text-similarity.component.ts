import { Component } from '@angular/core';
import { DandelionService } from '../services/dandelion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextSimilarityResponse } from '../model';

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent {
  
  similarityForm: FormGroup;
  result?: TextSimilarityResponse = undefined;

  constructor(
    private dandelionService: DandelionService,
    private formBuilder: FormBuilder
    ) {
    this.similarityForm = this.formBuilder.group({
      text1: ['', Validators.required],
      text2: ['', Validators.required],
    });
  }

  checkSimilarity() {
    this.dandelionService.checkTextSimilarity(
      this.similarityForm.get('text1')?.value,
      this.similarityForm.get('text2')?.value,
    ).subscribe(response => {
      this.result = response;
    })
  }
}
