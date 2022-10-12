import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AfbcoreService } from 'afbcore';
import { Etape } from 'src/app/modeles/etape';
import { EtapeService } from 'src/app/service/etape.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-param-etape',
  templateUrl: './param-etape.component.html',
  styleUrls: ['./param-etape.component.css']
})
export class ParamEtapeComponent implements OnInit {

  etap:Etape;

  datas: Etape[];

  types = [
    {value: 'EDITION', label: 'EDITION'},
    {value: 'AVIS', label: 'AVIS'},
    {value: 'APPRECIATION', label: 'APPRECIATION'},
    {value: 'CONSULTATION', label: 'CONSULTATION'}
  ]

  ordres = [1,2,3,4,5,6,7,8,9,10];

  toppings = new FormControl();
  toppingList: any[] = [
    {value: '1', label: 'Journalier'},
    {value: '7', label: 'Hebdomadaire'}
  ];

  constructor(
    private _toolservice:ToolsService,
    private afbcore:AfbcoreService,
    private _toast: ToastService
  ) { 
    
  }

  ngOnInit() {
    this.etap = new Etape();
    this.datas = [];
    this.getAllEtape();
  }

  save(){
    console.log("etape duree: "+this.etap.dureeEtape);
    this._toolservice.addEtape(this.etap)
      .subscribe(etape => {
        console.log("Evidence ok " , etape.code);
        this._toast.showSuccess(etape.libelle + ', crée avec succes');
        this.datas.push(etape);
        this.etap = new Etape();
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
       // this.afbcore.showMessage('DANGER', 'An error occured!!');
      });
  }

  getAllEtape(){

    this._toolservice.getAllEtapes()
      .subscribe(
        items => {
         
          this.datas = items.datas;
          //console.log("Ret list etapes: "+ JSON.stringify(items));
        });
  }

}
