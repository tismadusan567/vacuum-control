import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DandelionService } from '../services/dandelion.service';
import { LanguageDetectionResponse } from '../model';

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {
  languageForm: FormGroup;
  result?: LanguageDetectionResponse = undefined;

  constructor(
    private dandelionService: DandelionService,
    private formBuilder: FormBuilder
    ) {
    this.languageForm = this.formBuilder.group({
      text: ['', Validators.required],
      clean: false,
    });
  }

  detectLanguage() {
    this.dandelionService.detectLanguage(
      this.languageForm.get('text')?.value,
      this.languageForm.get('clean')?.value,
    ).subscribe(response => {
      this.result = response;
    });
  }
}
