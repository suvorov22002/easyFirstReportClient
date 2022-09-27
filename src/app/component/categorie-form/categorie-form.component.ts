import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AfbcoreService } from 'afbcore';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Activite } from 'src/app/modeles/activite';
import { Evidences } from 'src/app/modeles/evidences';
import { CategorieService } from 'src/app/service/categorie.service';
import { EvidencesService } from 'src/app/service/evidences.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css'],
  providers: [DynamicDialogRef]
})
export class CategorieFormComponent implements OnInit {

  info:Activite;
  url:string;
  url_1:string;
  evids:Array<any> = [];
  toppings = new FormControl();
  toppingList: Array<Evidences> = [];

  profils = [
    {name: 'Direction des SI', code: 'DSI'},
    {name: 'Gestionnaires', code: 'GFC'},
    {name: 'Risque', code: 'DR'},
    {name: 'Comptabilite', code: 'DG'},
    {name: 'Recherche et investissement', code: 'DRI'}
  ];

  constructor(
    private afbcore: AfbcoreService,
    private _config:AppConfigService,
    private _catserv: CategorieService,
    private _toast: ToastService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _evi:EvidencesService
  ) { 
    
  }

  ngOnInit() {
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    this.url = this._config.get().API_BASE_URL + this._catserv.getPath();
    this.url_1 = this._config.get().API_BASE_URL + this._evi.getPath();
    this.getAllEvidences();
  }

  save(info){
    console.log(info);
    if(this.info.libelle === '' || this.info.reference === '' 
      || this.info.typeEvidences.length < 1 ){
        this._toast.showError('Données pas modifées.');
        return;
    }
     //console.log("Update evidences ok " , this.url + "/update");
  /*   this._catserv.create(this.url + "/add", info)
      .subscribe( 
        (res) => this.onSaveSuccess(res),
        (error) => this.onError(error)
     );
*/
  }

  onSaveSuccess(res) {
    this.afbcore.loading(false);
    this.ref.close(true);
    this._toast.showSuccess('Categorie modifié avec succes');
  }

  onError(error) {
    //this.afbcore.loading(false);
    //this.afbcore.showMessage('DANGER', 'Une erreur est survenue, veuillez réessayer!!');
    this._toast.showError(error);
  }

  delete(){
    console.log("Delete ");
  }

  getAllEvidences(){
    this._evi.listAllEvidence(this.url_1 + "/findtypevidence")
    .subscribe(
      items => {
        this.toppingList = items;
        console.log("Ret list-form evidence: "+ this.toppingList.length);
      });

  }

}
