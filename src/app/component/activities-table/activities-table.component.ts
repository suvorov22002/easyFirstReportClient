import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StatutRapport } from 'src/app/enums/statut-rapport.enum';
import { RapportJournalier } from 'src/app/modeles/rapport-journalier';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivitejrComponent } from '../activitejr/activitejr.component';
import { ActiviteJournaliere } from 'src/app/modeles/activite-journaliere';
import { Router } from '@angular/router';
import { RapportJournalierService } from 'src/app/service/rapport-journalier.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ActiviteJournaliereService } from 'src/app/service/activite-journaliere.service';
import { OperationRapportService } from 'src/app/service/operation-rapport.service';
import { OperationRapport } from 'src/app/modeles/operation-rapport';
import { CodeEtape } from 'src/app/enums/code-etape.enum';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.css'],
  providers: [DialogService]
})
export class ActivitiesTableComponent implements OnInit {

  @Input('rapport')
  datas:Array<RapportJournalier> = [];

  selectedAct:RapportJournalier;
  activitjr:Array<ActiviteJournaliere> = [];

  url:string;
  url_1:string;

  obj: any;
 // datas: any[];
  isSiege = false;
  user_color:string;
  state = false;
  etape: any;
  checked = false;
  login: any;

  today = new Date();
  month = this.today.getMonth();
  year =   this.today.getFullYear();

  cols:any[];

  constructor( 
    public dialogService: DialogService,
    //private actvjr:ActiviteJournaliereService,
    //private _config:AppConfigService,
    //private _opersev:OperationRapportService,
    private _toolservice:ToolsService,
    private _toast: ToastService,
    private dialog: MatDialog,
    private router: Router
    ) {
      
  }

  ngOnInit() {
    this.obj = {}
    this.obj.dateDebut = new Date(this.year, this.month, 1);
    this.obj.dateFin = new Date(this.year, this.month, this.today.getDate());

    this.cols = [
      { field: 'reference', header: 'Reference' },
      { field: 'date', header: 'Date saisie' },
      { field: 'statut', header: 'Statut' },
      { field: 'consultation', header: 'Consultation' },
      { field: 'envoyer', header: '' }
    ]
    
  }

  getColor(data:any){
    //console.log("statut rapport "+data.statut);
  //  StatutRapport[typeName].valueOf(); 
   switch(data.statut){
     case 'INITIE':
      this.user_color = '#F77102';
      break;
    
     case 'REJETE':
      this.user_color = '#E7E4E4';
      break;

     case 'SAISI':
      this.user_color = '#187C04';
      break;

     default:
       break;
   }
    return this.user_color;
  }

  getStatut(data:any){
    switch(data.statut){
      case 'INITIE':
        return false;
      case 'REJETE':
        return true;
      case 'SAISI':
        return true;
 
      default:
        break;
    }
    
  }

  openAddDialog1(data){
    console.log('ligne selectione: '+data.reference);
    //recherche des activités selon la reference du rapport.
    this._toolservice.getRapportJnrByRef(data.reference)
    .subscribe(
      items => {
        this.activitjr = items;
        console.log("Ret rapport jrn: "+ this.activitjr.length);
       
      });


    const ref = this.dialogService.open(ActivitejrComponent, {
      width: '60%',
      closeOnEscape: false,
      header: 'LISTE DES ACTIVITES',
      data: { obj:this.activitjr, from:'view-external' }
    });

    ref.onClose.subscribe(
      data => console.log("Dialog: ", data)
    );
  }

  openAddDialog(selectAct:RapportJournalier){
    this.selectedAct = selectAct;
    console.log('ligne selectione: '+this.selectedAct.reference);
    this.router.navigate(['/admin/activitejr']);
  }

  
  edit(obj) {
      var _state = obj.statut;
        //recherche des activités selon la reference du rapport.
      //this.actvjr.list(this.url+"/findbyrefrapportjournalier/", obj.reference)
      this._toolservice.getRapportJnrByRef(obj.reference)
      .subscribe(
        items => {
          this.activitjr = items.datas;
         // console.log("Ret rapport jrn: "+ this.activitjr.length);
        //  let data = this.activitjr;
          const ref = this.dialogService.open(ActivitejrComponent, {
            width: '80%',
            closeOnEscape: false,
            header: 'LISTE DES ACTIVITES',
              data: { obj:this.activitjr,
                      statut:_state
                    }
          });
          ref.onClose.subscribe(res => {
            if(res == true)  {
              console.log("Dialog: ", 'Opération effectuée avec succès!');
            }
          })
        
      });
  }

  send(obj:RapportJournalier){
    let objOperation = new OperationRapport();
    objOperation.rapports = [];
    objOperation.etape = CodeEtape.SAISIE_RAPPORT;
    objOperation.dateOperation = new Date();
    objOperation.rapports.push(obj);
    objOperation.userLevels = CodeEtape.SAISIE_RAPPORT;
    objOperation.userOpe = 'FELA';
    objOperation.decision = StatutRapport.INITIE;
    objOperation.commentaire = 'RAS';
 
    this._toolservice.addOperationRapport(objOperation)
      .subscribe(res => {
        console.log("Rapport ok " , res);
        this._toast.showSuccess(res.message + ', rapport envoyé avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
      });
  }

}
