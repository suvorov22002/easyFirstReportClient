import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfbcoreService } from 'afbcore';
import { SelectItem } from "primeng/api";
import { Evidences } from 'src/app/modeles/evidences';
import { EvidencesService } from 'src/app/service/evidences.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ToolsService } from 'src/app/service/tools.service';



@Component({
  selector: 'app-v-evidences',
  templateUrl: './v-evidences.component.html',
  styleUrls: ['./v-evidences.component.css']
 //providers: [EvidencesService]
})
export class VEvidencesComponent implements OnInit {

  url: string = "";
  
  obj:any;
  collapseShow : boolean = false;
  collapseShow1 : boolean = true;
  evidence:Evidences;
  public evidences: Array<Evidences> = [];
  path:string = '/add';

  isAuth = false;

  types = [
    {label: 'TEXT', value: 'TEXT'},
    {label: 'DATE', value: 'DATE'},
    {label: 'CONTENT', value: 'CONTENT'},
    {label: 'NUMBER', value: 'NUMBER'},
    {label: 'COMBOBOX', value: 'COMBOBOX'}
];

evidents:Array<Evidences> = [];
_test:Evidences;
  constructor(
    private _toolservice:ToolsService,
    private afbcore:AfbcoreService,
    private _toast: ToastService,
    private router: Router
    ) { 

  }

  ngOnInit() {
    this.obj = {};
    this.evidence = new Evidences();
    
    this.getAllEvidences();
  
  }

  
  toggleCollapseShow() {
    this.evidence = new Evidences();
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;

    //another implementations will goes here
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
    this.getAllEvidences();
  }

  save(){
  //  console.log("Ref: "+this.evidence.typeInput+'   '+this._evi);
    if(this.evidence.code === undefined || this.evidence.code === '' || this.evidence.libelle === undefined || this.evidence.libelle === '' 
      || this.evidence.typeInput === null || this.evidence.typeInput === undefined){
        this._toast.showError('Veuillez renseigner tous les champs obligatoires!!!');
        return;
    }
   // let res:Evidences;
   // this.findEvidences(this.evidence.code, res);
    //this.afbcore.loading(true);
    //this._evi.create(this.url + "/add", this.evidence)
    this._toolservice.addEvidence(this.evidence)
      .subscribe(evident => {
        console.log("Evidence ok " ,   evident.codeResponse);
        console.log("Evidence ok " ,   evident.error);
        console.log("Evidence ok " ,   evident.message);
        this._toast.showSuccess(evident.code + ', crée avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
       // this.afbcore.showMessage('DANGER', 'An error occured!!');
      });
    
  }

  getAllEvidences(){
   // console.log("Ref: "+this.evidence.libelle+'   '+this._evi);
    this._toolservice.AllEvidence()
   // this._evi.listAllEvidence(this.url + "/findtypevidence")
    .subscribe(
      items => {
        this.evidents = items.datas;
        //console.log("Ret evidence: "+JSON.stringify(items));
      });

  }

  findEvidences(code:string, res:Evidences){
    
   // this._evi.get(this.url + "/findbycode", code)
    this._toolservice.getEvidenceByCode(code)
      .subscribe(
        items => {
          res = items;
          console.log("Ret evidence: "+ res.code);
        });
  }

}
