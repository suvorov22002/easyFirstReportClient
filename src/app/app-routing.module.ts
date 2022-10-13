import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './component/body/body.component';
import { CardDraftComponent } from './component/card-draft/card-draft.component';
import { CardSheetsComponent } from './component/card-sheets/card-sheets.component';
import { UActivitejrComponent } from './component/u-activitejr/u-activitejr.component';
import { ValidrapportComponent } from './component/validrapport/validrapport.component';

import { AdminComponent } from './layout/admin/admin.component';

import { LoginComponent } from './views/login/login.component';
import { ParamEtapeComponent } from './views/param-etape/param-etape.component';
import { ProcessComponent } from './views/process/process.component';
import { VActiviteComponent } from './views/v-activite/v-activite.component';
import { VCategorieComponent } from './views/v-categorie/v-categorie.component';
import { VConfigComponent } from './views/v-config/v-config.component';
import { VConsultationComponent } from './views/v-consultation/v-consultation.component';
import { VEvidencesComponent } from './views/v-evidences/v-evidences.component';
import { VReportingComponent } from './views/v-reporting/v-reporting.component';
import { VTraitementComponent } from './views/v-traitement/v-traitement.component';


const routes: Routes = [
 
  {
    path:'',
    component: BodyComponent,
    children:[
      {
        path:"admin",
        component: AdminComponent
      },
      {
        path:"evidences",
        component: VEvidencesComponent
      },{
        path:"consultation",
        component: VConsultationComponent
      },{
        path:"config",
        component: VConfigComponent
      },{
        path:"categorie",
        component: VCategorieComponent
      },
      {
        path:"reports",
        component: VReportingComponent
      },
      {
        path:"traitement",
        component: CardSheetsComponent //VTraitementComponent;CardDraftComponent 
      },
      {
        path:"activites",
        component: VActiviteComponent
      },
      {
        path:"etapes",
        component: ParamEtapeComponent
      },
      {
        path:"parcours",
        component: ProcessComponent
      },
      {
        path:"parametre",
        component: VConfigComponent
      },
      {
        path:"historiques",
        component: ProcessComponent
      },
      {
        path:"activitejr",
        component:  UActivitejrComponent
      },
      {
        path:"validrapport",
        component:  ValidrapportComponent
      },
      {
        path:"**",
        redirectTo: ""
      },
      {
        path: '', 
        redirectTo: 'traitement',
        pathMatch: 'full'
      } 
    ]

  }
/*  {
    path: "login",
    component: LoginComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ]
  },
  { path: "", component: LoginComponent},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
