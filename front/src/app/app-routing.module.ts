import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguationComponent } from './configuation/configuation.component';
import { EntityExtractionComponent } from './entity-extraction/entity-extraction.component';
import { TextSimilarityComponent } from './text-similarity/text-similarity.component';
import { LanguageDetectionComponent } from './language-detection/language-detection.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { authGuard, createGuard, readGuard, updateGuard } from './auth.guard';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users-view",
    component: UsersViewComponent,
    canActivate: [readGuard]
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [createGuard]
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent,
    canActivate: [updateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
