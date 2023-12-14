import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityExtractionResponse, LanguageDetectionResponse, SentimentAnalysisResponse, TextSimilarityResponse } from '../model';
import { RequestHistoryService } from './request-history.service';

@Injectable({
  providedIn: 'root'
})
export class DandelionService {

  private readonly entityExtractionUrl = 'https://api.dandelion.eu/datatxt/nex/v1/';
  private readonly textSimilarityUrl = 'https://api.dandelion.eu/datatxt/sim/v1';
  private readonly languageDetectionUrl = 'https://api.dandelion.eu/datatxt/li/v1';
  private readonly sentimentAnalysisUrl = 'https://api.dandelion.eu/datatxt/sent/v1';
  private apiToken: string;

  constructor(private httpClient: HttpClient, private historyService: RequestHistoryService) {
    this.apiToken = localStorage.getItem('dandelionApiToken') ?? '';
   }

   setToken(token: string): void {
    this.apiToken = token;
    localStorage.setItem('dandelionApiToken', this.apiToken);
   }

   getToken(): string {
    return this.apiToken;
   }

   hasToken(): boolean {
    return this.apiToken !== '';
   }

   private get<T>(url: string, params: HttpParams): Observable<T> {
    this.historyService.addLog({
      date: new Date(),
      type: 'GET',
      url: url + '?' + params.toString()
    })
    return this.httpClient.get<T>(url, {params: params});
   }

   getEntityExtraction(
    text: string,
    min_confidence: number,
    image: boolean = false,
    abstract: boolean = false,
    categories: boolean = false
    ): Observable<EntityExtractionResponse> {
    let params = new HttpParams()
      .set('lang', 'en')
      .set('text', text)
      .set('min_confidence', min_confidence)
      .set('token', this.apiToken);

    if (image || abstract || categories) {
      let include = `${image ? "image," : ""}${abstract ? "abstract," : ""}${categories ? "categories" : ""}`;
      if (include.endsWith(',')) include = include.slice(0, -1);
      params = params.set('include', include);
    }

    return this.get<EntityExtractionResponse>(this.entityExtractionUrl, params);
   }

   checkTextSimilarity(text1: string, text2: string): Observable<TextSimilarityResponse> {
    let params = new HttpParams()
      // .set('lang', 'en')
      .set('text1', text1)
      .set('text2', text2)
      .set('token', this.apiToken);

    return this.get<TextSimilarityResponse>(this.textSimilarityUrl, params);
   }

   detectLanguage(text: string, clean: boolean = false): Observable<LanguageDetectionResponse> {
    let params = new HttpParams()
    .set('text', text)
    .set('token', this.apiToken)
    .set('clean', clean);

    return this.get<LanguageDetectionResponse>(this.languageDetectionUrl, params);
   }

   sentimentAnalysis(text: string, lang: string = 'auto'): Observable<SentimentAnalysisResponse> {
    let params = new HttpParams()
    .set('text', text)
    .set('lang', lang)
    .set('token', this.apiToken);

    return this.get<SentimentAnalysisResponse>(this.sentimentAnalysisUrl, params);
   }
}
