import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DandelionService } from '../services/dandelion.service';
import { SentimentAnalysisResponse } from '../model';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {

  sentimentForm: FormGroup;
  result?: SentimentAnalysisResponse = undefined;

  constructor(
    private dandelionService: DandelionService,
    private formBuilder: FormBuilder
    ) {
    this.sentimentForm = this.formBuilder.group({
      text: ['', Validators.required],
      lang: ['auto', Validators.required],
    });
  }

  sentimentAnalysis() {
    this.dandelionService.sentimentAnalysis(
      this.sentimentForm.get('text')?.value,
      this.sentimentForm.get('lang')?.value,
    ).subscribe(response => {
      this.result = response;
    });
  }

  getColor(): string {
    if (this.result == undefined) return 'rgb(127,127,0)';

    const green = Math.round((this.result.sentiment.score + 1) * 127);
    const red = Math.round((this.result.sentiment.score - 1) * -127);

    return `rgb(${red},${green},0)`;
  }

}
