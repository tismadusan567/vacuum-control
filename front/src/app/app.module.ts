import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguationComponent } from './configuation/configuation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityExtractionComponent } from './entity-extraction/entity-extraction.component';
import { TextSimilarityComponent } from './text-similarity/text-similarity.component';
import { LanguageDetectionComponent } from './language-detection/language-detection.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { HistoryComponent } from './history/history.component';
import { RequestLogPipe } from './request-log.pipe';
import { LoginComponent } from './login/login.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddVacuumComponent } from './add-vacuum/add-vacuum.component';
import { SearchVacuumsComponent } from './search-vacuums/search-vacuums.component';
import { ErrorHistoryComponent } from './error-history/error-history.component';
import { StartVacuumComponent } from './start-vacuum/start-vacuum.component';
import { StopVacuumComponent } from './stop-vacuum/stop-vacuum.component';
import { DischargeVacuumComponent } from './discharge-vacuum/discharge-vacuum.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguationComponent,
    EntityExtractionComponent,
    TextSimilarityComponent,
    LanguageDetectionComponent,
    SentimentAnalysisComponent,
    HistoryComponent,
    RequestLogPipe,
    LoginComponent,
    UsersViewComponent,
    AddUserComponent,
    EditUserComponent,
    AddVacuumComponent,
    SearchVacuumsComponent,
    ErrorHistoryComponent,
    StartVacuumComponent,
    StopVacuumComponent,
    DischargeVacuumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
