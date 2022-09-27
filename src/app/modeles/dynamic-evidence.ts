import { EvidencesService } from "../service/evidences.service";
import { Evidences } from "./evidences";
import { Node } from 'src/app/modeles/validators/form-config';
import { FormControl } from "@angular/forms";
import { Evidence } from "./evidence";
import { AppConfigService } from "../service/helper/app-config.service";
import { EventEmitter, Output } from "@angular/core";

export abstract class DynamicEvidence {
    public evidences:Evidences;
    public evi:Evidence;
    public evis:Array<Evidence> = [];
    public node:Node;
    public control:FormControl;
    public loaded:boolean = false;
    url:string;
    private timeout_interval:number = 1000;
    private timeout_id;
    _code:string;
    
    @Output() childToParent = new EventEmitter<any>();

    constructor(
        protected _evidences:EvidencesService
       
    
    )
    {
     // this.url = this._config.get().API_BASE_URL + this._evidences.getPath();
      this.evi = new Evidence();
      this.evis = [];
      this.evi.valeur = "";
      this.evi.typeEvidence = new Evidences();;
      this.control = new FormControl('');
      this._code = "";
    }

    getErrorMessage(){
      //  return ( this.control.hasError('scoring') ? this.control.getError('scoring') : ''+JSON.stringify(this.control.errors))
    }

    sendToParent(name:any){
      console.log("Init result: "+name);
      this.childToParent.emit(name);
    }

    init():any{

      return Promise.all([Promise.resolve(this.evi.typeEvidence.code)]).then((result)=>{
        //console.log("Init result: "+result);
        this.loaded = true;
        //console.log("Init Storage "+localStorage.getItem('code'));
    
          // init form control
          this.control = new FormControl(this.evi.valeur , []);
          this.control.valueChanges.subscribe(value => {
            console.log("control value changes" , this.control.dirty , this.control.valid ,this.control.parent);
            if(this.control.valid){
                this.evi.valeur = value;
                this.evi.typeEvidence.code = result[0];
              //  console.log(" this.evi.valeur : " ,  this.evi.valeur);
                localStorage.setItem(this.evi.typeEvidence.code, this.evi.valeur);
                this.autoSave();
            }else if(this.control.invalid){
              
                console.log("invalid : " , this.control.errors);
            }
        })

      })
      
    }

  autoSave(){
      console.log("autosaved");
      this.cancelSave();
      this.timeout_id = setTimeout(()=>this.save() , this.timeout_interval)
  }

  cancelSave(){
      if(this.timeout_id){
          clearTimeout(this.timeout_id)
      }
      
  }

  save(){
    this.evis.push(this.evi);
    console.log("Save "+this.evis.length);
    //localStorage.setItem('code', this._code);
    this.evis.forEach(function (value) {
      console.log(value);
     });
     var code = localStorage.getItem('code');
     var splitter = code.split("/"); 
     for(var i=0;i<splitter.length;i++){
      console.log("code: "+splitter[i] + " , Storage valeur: "+localStorage.getItem(splitter[i]));
     }
    
  }
}
