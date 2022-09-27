import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EvidencesService } from 'src/app/service/evidences.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';

@Component({
  selector: 'app-evidence-form',
  templateUrl: './evidence-form.component.html',
  styleUrls: ['./evidence-form.component.css']
})
export class EvidenceFormComponent implements OnInit {

  info:any;
  url:string;

  types = [
    {label: 'TEXT', value: 'TEXT'},
    {label: 'DATE', value: 'DATE'},
    {label: 'CONTENT', value: 'CONTENT'},
    {label: 'NUMBER', value: 'NUMBER'},
    {label: 'COMBOBOX', value: 'COMBOBOX'}
  ];

  constructor(
    private afbcore: AfbcoreService,
    private _config:AppConfigService,
    private _evidserv: EvidencesService,
    private _toast: ToastService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    this.url = this._config.get().API_BASE_URL + this._evidserv.getPath();
  }

  save(info){
    console.log(info);
    if(this.info.code === undefined || this.info.code === '' || this.info.libelle === undefined || this.info.libelle === '' 
    || this.info.typeInput === null || this.info.typeInput === undefined){
      this._toast.showError('Veuillez renseigner tous les champs obligatoires!!!');
      return;
     }
     //console.log("Update evidences ok " , this.url + "/update");
     this._evidserv.update(this.url + "/update", info)
      .subscribe( 
        (res) => this.onSaveSuccess(res),
        (error) => this.onError(error)
     );

  }

  onSaveSuccess(res) {
    this.afbcore.loading(false);
    this.ref.close(true);
    this._toast.showSuccess('Type evidence modifié avec succes');
  }

  onError(error) {
    //this.afbcore.loading(false);
    //this.afbcore.showMessage('DANGER', 'Une erreur est survenue, veuillez réessayer!!');
    this._toast.showError(error);
  }

  delete(){
    console.log("Delete ");
  }

}
