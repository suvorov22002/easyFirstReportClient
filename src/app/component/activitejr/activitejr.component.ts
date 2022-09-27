import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AfbcoreService } from 'afbcore';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActiviteJournaliere } from 'src/app/modeles/activite-journaliere';
import { RapportJournalier } from 'src/app/modeles/rapport-journalier';
import { ActiviteJournaliereService } from 'src/app/service/activite-journaliere.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { RapportJournalierService } from 'src/app/service/rapport-journalier.service';


@Component({
  selector: 'app-activitejr',
  templateUrl: './activitejr.component.html',
  styleUrls: ['./activitejr.component.css']
})
export class ActivitejrComponent implements OnInit {

  info: any = {};
  statut:any;

  url:string;
  url_1:string;

  constructor(
    private afbcore: AfbcoreService,
    private _config:AppConfigService,
    private _actjrserv: ActiviteJournaliereService,
    private _rapjrserv:RapportJournalierService,
    private _toast: ToastService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { 
     this.url = this._config.get().API_BASE_URL + this._actjrserv.getPath();
     this.url_1 = this._config.get().API_BASE_URL + this._rapjrserv.getPath();
  }

  ngOnInit() {
     console.log(this.config);
     //this.info.actif = false;
     if(this.config.data != null && this.config.data != undefined ){
      this.info = this.config.data.obj;
      this.statut = this.config.data.statut;
     } 

    // console.log(this.info.length);
  }

  onSaveSuccess(res) {
    this.afbcore.loading(false);
    this.ref.close(true);
   // this.afbcore.showMessage('SUCCESS', 'Opération effectuée avec succès!');
  }

  onError(error) {
    this.afbcore.loading(false);
    this.afbcore.showMessage('DANGER', 'Une erreur est survenue, veuillez réessayer!!');
  }
  save() {
    //this.afbcore.loading(true);
    console.log('type info',this.info.length);
    
    this.info.forEach(element => {
      console.log(element);
    });
    console.log(this.info ? this.info[0].rapportJournalier.id : 'Nothing to display');
    if(this.info.length > 0){
      //update du rapport journalier
      var obj:RapportJournalier;
      obj = new RapportJournalier();

      obj.id = this.info[0].rapportJournalier.id;
      obj.activites = this.info;
      obj.editeur = this.info[0].rapportJournalier.editeur;
      obj.unite = this.info[0].rapportJournalier.unite;
      obj.specialite = this.info[0].rapportJournalier.specialite;
      obj.dateRapport = this.info[0].rapportJournalier.dateRapport;


      this._rapjrserv.create(this.url_1 + "/create", obj)
      .subscribe(res => {
        console.log("Rapport ok " , res.dateRapport);
        
        this._toast.showSuccess(res.activites.length + ', activité mis à jour avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
      });
    }
   // this._actjrserv.create(this.url, this.info)
  }

  close(){
    this.ref.close(true);
  }

  delete(){
    console.log("Delete ");
  }
  //ActiviteJournaliere
  getStatut(){
      switch(this.statut){
        case 'INITIE':
          return false;
        case 'REJETE':
          return true;
        case 'SAISI':
          return true;
   
        default:
          break;
      }
    return true;
    
  }

}
