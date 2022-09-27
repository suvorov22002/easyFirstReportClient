import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {DropdownModule} from 'primeng/dropdown';
import { FilterService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { MAT_LABEL_GLOBAL_OPTIONS, MAT_DATE_LOCALE, MatButtonModule, MatCardModule, MatDatepickerModule,
   MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, 
   MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule, 
   MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, 
   MatTableModule, MatTabsModule, MatTooltipModule, MatBadgeModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardTableComponent } from './component/card-table/card-table.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeadersComponent } from './component/headers/headers.component';
import { NavbarsComponent } from './component/navbars/navbars.component';
import { OperationsComponent } from './component/operations/operations.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { VActiviteComponent } from './views/v-activite/v-activite.component';
import { VCategorieComponent } from './views/v-categorie/v-categorie.component';
import { VConfigComponent } from './views/v-config/v-config.component';
import { VConsultationComponent } from './views/v-consultation/v-consultation.component';
import { VEvidencesComponent } from './views/v-evidences/v-evidences.component';
import { VReportingComponent } from './views/v-reporting/v-reporting.component';
import { VTraitementComponent } from './views/v-traitement/v-traitement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestMaterialComponent } from './views/test-material/test-material.component';

import {A11yModule} from '@angular/cdk/a11y';
//import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { CategTableComponent } from './component/categ-table/categ-table.component';
import { ActivityTableComponent } from './component/activity-table/activity-table.component';
import { ActivitiesTableComponent } from './component/activities-table/activities-table.component';
//import { PrimengModule } from './primeng.module';
import { AfbcoreModule, AfbcoreService } from 'afbcore';
import { CalendarModule } from 'primeng/Calendar';
import { AppinitService } from './service/appinit.service';
import { EvidencesService } from './service/evidences.service';
import { AdminComponent } from './layout/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandlerService } from './service/helper/http-error-handler.service';
import { AppConfigService } from './service/helper/app-config.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './service/helper/toast.service';
import { ProcessComponent } from './views/process/process.component';
import { ParamEtapeComponent } from './views/param-etape/param-etape.component';
import { EtapeService } from './service/etape.service';
import { DynamicEvidenceComponent } from './component/dynamic-evidence/dynamic-evidence.component';
import { DatepickerComponent } from './component/type-input/datepicker/datepicker.component';
import { InputBooleanComponent } from './component/type-input/input-boolean/input-boolean.component';
import { InputRadioComponent } from './component/type-input/input-radio/input-radio.component';
import { InputSelectComponent } from './component/type-input/input-select/input-select.component';
import { InputComponent } from './component/type-input/input/input.component';
import { RichTextComponent } from './component/type-input/rich-text/rich-text.component';
import { SimpleTextComponent } from './component/type-input/simple-text/simple-text.component';
import { InputCurrencyComponent } from './component/type-input/input-currency/input-currency.component';
import { UnknowQuestionComponent } from './component/unknow-question/unknow-question.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './service/auth.service';
import { LoginService } from './service/login.service';
import { EviFormComponent } from './views/evi-form/evi-form.component';
import { ActivitejrComponent } from './component/activitejr/activitejr.component';
import { UActivitejrComponent } from './component/u-activitejr/u-activitejr.component';
import { OperationRapportService } from './service/operation-rapport.service';
import { DetailActiviteComponent } from './component/detail-activite/detail-activite.component';
import { EvaluationComponent } from './component/evaluation/evaluation.component';
import { SyntComparActiviteComponent } from './component/synt-compar-activite/synt-compar-activite.component';
import { SyntheseActiviteComponent } from './component/synthese-activite/synthese-activite.component';
import { ValidrapportComponent } from './component/validrapport/validrapport.component';
import { ExcelreportService } from './service/excelreport.service';
import { EvidenceFormComponent } from './component/evidence-form/evidence-form.component';
import { CategorieFormComponent } from './component/categorie-form/categorie-form.component';
import { APP_BASE_HREF } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './component/body/body.component';
import { MenuComponent } from './layout/menu/menu.component';
        
export function initApp(appInitService:AppinitService){
  return (): Promise<any> => {
    return appInitService.init();
   /* .then(
      (res:any) => {
        console.log('resolve');
        return appInitService.getOAUTH2AcessToken(res)
        .then( 
          (res:any) => {
            localStorage.setItem('afb_access_token', JSON.stringify('afb_access_token'));
          }
        )
      }
    )*/
  }
}

var SERVICES = [
  EvidencesService,
  HttpErrorHandlerService,
  AppConfigService,
  ToastService,
  EtapeService,
  AuthService,
  LoginService,
  OperationRapportService,
  ExcelreportService
]

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    CardTableComponent,
    HeaderComponent,
    FooterComponent,
    HeadersComponent,
    NavbarsComponent,
    OperationsComponent,
    SidebarComponent,
    VActiviteComponent,
    VCategorieComponent,
    VConfigComponent,
    VConsultationComponent,
    VEvidencesComponent,
    VReportingComponent,
    VTraitementComponent,
    TestMaterialComponent,
    CategTableComponent,
    ActivityTableComponent,
    ActivitiesTableComponent,
    AdminComponent,
    ProcessComponent,
    ParamEtapeComponent,
    DynamicEvidenceComponent,
    UnknowQuestionComponent,
    InputRadioComponent,
    InputSelectComponent,
    SimpleTextComponent,
    InputComponent,
    RichTextComponent,
    DatepickerComponent,
    InputBooleanComponent,
    InputCurrencyComponent,
    LoginComponent,
    EviFormComponent,
    ActivitejrComponent,
    UActivitejrComponent,
    DetailActiviteComponent,
    EvaluationComponent,
    SyntComparActiviteComponent,
    SyntheseActiviteComponent,
    ValidrapportComponent,
    EvidenceFormComponent,
    CategorieFormComponent,
    MenuComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    A11yModule,
//    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DynamicDialogModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CalendarModule,
    AfbcoreModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })

  ],
  entryComponents: [
    DynamicEvidenceComponent,
    InputRadioComponent,
    InputSelectComponent,
    SimpleTextComponent,
    InputComponent,
    RichTextComponent,
    DatepickerComponent,
    InputBooleanComponent,
    InputCurrencyComponent,
    UnknowQuestionComponent,
    ActivitejrComponent,
    EvidenceFormComponent,
    CategorieFormComponent
  ],
  providers: [
    ...SERVICES,
    AfbcoreService,
    FilterService,
    DialogService,
  //  {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppinitService], multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, //format datepicker dd/MM/yyyy
    {provide: APP_BASE_HREF, useValue: ''}
  //  { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'} },
  //  {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  //  {provide: APP_BASE_HREF, useValue: ''}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
