import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { DynamicEvidenceComponent } from 'src/app/component/dynamic-evidence/dynamic-evidence.component';
import { TypeInput } from 'src/app/enums/type-input.enum';
import { Activite } from 'src/app/modeles/activite';
import { ActiviteJournaliere } from 'src/app/modeles/activite-journaliere';
import { CategorieActivite } from 'src/app/modeles/categorie-activite';
import { Evidence } from 'src/app/modeles/evidence';
import { Evidences } from 'src/app/modeles/evidences';
import { RapportJournalier } from 'src/app/modeles/rapport-journalier';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-v-traitement',
  templateUrl: './v-traitement.component.html',
  styleUrls: ['./v-traitement.component.css']
})
export class VTraitementComponent implements OnInit {
  version = VERSION.full;
  dateNow : Date = new Date();
  format : string = 'dd-MM-yyyy HH:mm:ss';
  obj:any;
  _obj:Evidence;
  objec:Activite;
  activity:Activite; //stocke toutes les activités d'une categorie choisie.
  rapportj:RapportJournalier;
  rapportjs:Array<RapportJournalier> = [];
  activJs:Array<ActiviteJournaliere> = [];
  activiteJr:ActiviteJournaliere;
  evidence:Evidence;
  __evidences:string;
  evide:Evidences;
  all_evidences:Array<Evidences> = [];
  all_evidence:Array<Evidence> = [];
  _evis:Array<Evidence>;

  nomcli:string;
  ncp:string;
  date:Date;
  lieu:string;
  objet:string;
  content:string;
 
  url: string = "";
  url_1: string = "";
  url_2: string = "";
  url_3: string = "";
  categories:Array<CategorieActivite> = [];
  categorie:CategorieActivite;

  activites:Array<Activite> = [];

  collapseShow : boolean = true;
  collapseShow1 : boolean = false;

    timeOne : Date = new Date('1968-11-16T12:00:00');
    timeTwo : Date = new Date('1968-11-16T03:00:00');
    timeThree : Date = new Date('1968-11-16T05:00:00');
    timeFour : Date = new Date('1968-11-16T15:00:00');

    selectDate: Date; 
  __obj:Evidence;
  charge = 0;
  
  @ViewChild(DynamicEvidenceComponent, {static:true}) child;

  constructor(
    private _toast: ToastService,
    private toolservice:ToolsService
  ) { 
  }

  ngOnInit() {
    this.obj = {};
    this._obj = new Evidence();
    this.obj.categ = "";
    this.obj.act = "";
    this.obj.datec = null;
    this.objec = new Activite();
    this.timeOne = new Date('1968-11-16T12:00:00');
    this.charge = 0;
    this.rapportj = new RapportJournalier();
    this.rapportjs = [];
    this.getAllCategorie();
    this.activites = [];

    this.activiteJr = new ActiviteJournaliere();
    this.evidence = new Evidence();
    this.evide = new Evidences();

    this.all_evidences = new Array<Evidences>();
    this.activJs = [];

    this.__evidences = "";
    this.getAllRapport();
  

    
  }

  ngAfterViewInit() {
    if(this._evis != undefined){
      this._evis= this.child.evis; //<= This will set data
      console.log("Ret valeur evidence: "+this._evis.length);
    }
      
  }


  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
    this.getAllRapport();
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
  }

  save(){
    
  }

  updateDate(dateNow: Date): void {
    this.dateNow = dateNow;
  }

  getAllCategorie(){
    this.toolservice.getAllCategorie()
      .subscribe(
        items => {
         // console.log(JSON.stringify(items))
          this.categories = items.datas;
        });
  }

  //recuperer la liste des activites par categorie
  getActivite(obj:Activite){
    this.activites = [];
    this.toolservice.getActivite(obj)
      .subscribe(
        items => {
          this.activites = items;
          console.log("Ret Activite: "+ this.activites[0].libelle);
        });
  }

  getCategorieRef(ref:string){
    this.toolservice.getCategoryByRef(ref)
    .subscribe(
      items => {
        this.categorie = items.datas[0];
      //  console.log("Ret categorie: "+ JSON.stringify(items));
        this.activites = this.categorie.activites;
      });
  }

  chargerActivite(code){
    this.getCategorieRef(code);
  }

  onChange(catg){
    console.log(catg.value);
    this.all_evidences = [];
    this.charge = 0;
    this.chargerActivite(catg.value);
    this.__evidences = "";
  }

  submit(form: any){
   
    console.log('form response ' + form);
  }



  //Recherche de tous les types d'evidences
  onChangeActivite(activity){
    this.__evidences = "";
    console.log("activity "+activity.value.libelle);
    this.all_evidences = [];
    this. getActivityCode(activity.value.reference);
  }

  getActivityCode(ref:string){
    localStorage.clear;
    let str_evidence;

    this.toolservice.getActivityCode(ref)
    .subscribe(
      items => {
        this.activity = items.datas[0];
      //  console.log("Ret activity: "+ JSON.stringify(items));
        str_evidence = this.activity.evidences
        localStorage.setItem('code', str_evidence);
        var splitter = str_evidence.split("/"); 
        console.log("Ret splitter: "+ splitter);

        for(var i=0;i<splitter.length;i++){
          this.get_evidencesCode(splitter[i])
        }

        this.all_evidences.forEach(value => {
          var obj:Evidence;
          obj.valeur = "";
          obj.typeEvidence = value;
          this.all_evidence.push(obj);
        });
       
      });
  }

  addActivity(){
    console.log("in add activity: "+localStorage.getItem('code'));
    var code = localStorage.getItem('code');
    var splitter = code.split("/"); 
    for(var i=0;i<splitter.length;i++){
  //   console.log("code: "+splitter[i] + " , Storage valeur: "+localStorage.getItem(splitter[i]));
     var compose = splitter[i] + ";" + localStorage.getItem(splitter[i]);

     this.__evidences = (this.__evidences == "" ? this.__evidences : this.__evidences+"/") + compose;
    }
    this.activiteJr.evidences = this.__evidences;
    this.activJs.push(this.activiteJr);
    this.activiteJr = new ActiviteJournaliere();
    this.__evidences = "";
    this.charge = this.activJs.length;
    console.log("Ret this.activJs: "+this.activJs.length);
  }

  get_evidencesCode(code:string){
    this.toolservice.getEvidenceCode(code)
      .subscribe(
        items => {
          this.all_evidences.push(items.datas[0]);
          console.log(TypeInput[items.datas[0].typeInput]);
          console.log("Ret evidences items: "+ JSON.stringify(items));
        });
  }

  saveR(){
    this.rapportj.activites = this.activJs;
    this.rapportj.nomEditeur = 'FELATA AICHA';
    this.rapportj.specialite = 'GFC RETAIL';
    this.rapportj.editeur = 'FELA';
    this.rapportj.unite = '00001';
    
    this.toolservice.saveR(this.rapportj)
      .subscribe(evident => {
        //console.log("Rapport ok " , JSON.stringify(evident));
        this.activJs = [];
        this.obj = {};
        this.__evidences = "";
        this.all_evidences = [];
        this.charge = 0;
        localStorage.clear;
        this._toast.showSuccess(evident.message+"\n "+evident.datas.length + ', activité ajoutée avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this.charge = 0;
        this._toast.showError(error);
      });
  }

  getAllRapport(){
   /* this._rapJnr.list(this.url_3, "/getall")
    .subscribe(
      items => {
        this.rapportjs = items;
        console.log("Ret rapportjs " , this.rapportjs.length);
      });
      */
      var obj:any;
      obj = {};
      obj.unite = '00001';
      obj.editeur = 'FELA';
      this.toolservice.getAllRapportByUser(obj)
    //  this.toolservice.getAllRapport()
      .subscribe(
        items => {
          this.rapportjs = items.datas;
          //console.log("Ret rapportjs " , JSON.stringify(items));
        });
  }

  childToParent(name:any){
    this._evis = name;
  }

  fullEvidence(e:Evidences){
   
    this.__obj = new Evidence();
    this.__obj.valeur = "";
    this.__obj.typeEvidence = e; 
  }

}

function save() {
  throw new Error('Function not implemented.');
}

