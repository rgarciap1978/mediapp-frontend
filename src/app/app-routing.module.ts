import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './pages/consult-wizard/consult-wizard.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { ExamComponent } from './pages/exam/exam.component';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ReportComponent } from './pages/report/report.component';
import { SearchComponent } from './pages/search/search.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { GuardService } from './service/guard.service';

const routes: Routes = [
  {
    path: 'pages/patient', component: PatientComponent, children: [
      { path: 'new', component: PatientEditComponent },
      { path: 'edit/:id', component: PatientEditComponent }
    ]

  },
  {
    path: 'pages/exam', component: ExamComponent, children: [
      { path: 'new', component: ExamEditComponent },
      { path: 'edit/:id', component: ExamEditComponent }
    ]
  },
  {
    path: 'pages/specialty', component: SpecialtyComponent, children: [
      { path: 'new', component: SpecialtyEditComponent },
      { path: 'edit/:id', component: SpecialtyEditComponent }
    ]
  },
  { path: 'pages/medic', component: MedicComponent },
  { path: 'pages/consult', component: ConsultComponent },
  { path: 'pages/consult-autocomplete', component: ConsultAutocompleteComponent },
  { path: 'pages/consult-wizard', component: ConsultWizardComponent },
  { path: 'pages/search', component: SearchComponent },
  { path: 'pages/report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
