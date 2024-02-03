import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguationComponent } from './configuation/configuation.component';
import { EntityExtractionComponent } from './entity-extraction/entity-extraction.component';
import { TextSimilarityComponent } from './text-similarity/text-similarity.component';
import { LanguageDetectionComponent } from './language-detection/language-detection.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { addVacuumGuard, authGuard, createGuard, dischargeVacuumGuard, readGuard, searchVacuumGuard, startVacuumGuard, stopVacuumGuard, updateGuard } from './auth.guard';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SearchVacuumsComponent } from './search-vacuums/search-vacuums.component';
import { AddVacuumComponent } from './add-vacuum/add-vacuum.component';
import { ErrorHistoryComponent } from './error-history/error-history.component';
import { StartVacuumComponent } from './start-vacuum/start-vacuum.component';
import { StopVacuumComponent } from './stop-vacuum/stop-vacuum.component';
import { DischargeVacuumComponent } from './discharge-vacuum/discharge-vacuum.component';

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
  },
  {
    path: "search-vacuums",
    component: SearchVacuumsComponent,
    canActivate: [searchVacuumGuard]
  },
  {
    path: "add-vacuum",
    component: AddVacuumComponent,
    canActivate: [addVacuumGuard]
  },
  {
    path: "error-history",
    component: ErrorHistoryComponent
  },
  {
    path: "start-vacuum",
    component: StartVacuumComponent,
    canActivate: [startVacuumGuard]
  },
  {
    path: "stop-vacuum",
    component: StopVacuumComponent,
    canActivate: [stopVacuumGuard]
  },
  {
    path: "discharge-vacuum",
    component: DischargeVacuumComponent,
    canActivate: [dischargeVacuumGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
