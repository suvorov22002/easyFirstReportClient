import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Activite } from 'src/app/modeles/activite';
import { CategorieActivite } from 'src/app/modeles/categorie-activite';
import { Evidences } from 'src/app/modeles/evidences';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ToolsService } from 'src/app/service/tools.service';


@Component({
  selector: 'app-v-categorie',
  templateUrl: './v-categorie.component.html',
  styleUrls: ['./v-categorie.component.css'],
  providers: [DialogService, DynamicDialogRef]
})
export class VCategorieComponent implements OnInit {

  url: string = "";
  url_1: string = "";
  url_2: string = "";
  color:any;

  c_edit:boolean = false;

  collapseShow : boolean = false;
  collapseShow1 : boolean = true;

  obj:any;

  profils = [
    {name: 'Direction des SI', code: 'DSI'},
    {name: 'Gestionnaires', code: 'GFC'},
    {name: 'Risque', code: 'DR'},
    {name: 'Comptabilite', code: 'DG'},
    {name: 'Recherche et investissement', code: 'DRI'}
  ];

  toppings = new FormControl();

 // toppingList: Evidences[] = ['Nom client', 'Numero compte', 'Date', 'Lieu', 'Contenu', 'Objet'];

  toppingList: Array<Evidences> = [];
  activite:Activite;
  activits: Array<Activite> = [];
  _activits: Array<Activite> = [];
  categ:CategorieActivite;
  category:Array<CategorieActivite> = [];
  
  constructor(
    private _toast: ToastService,
    public dialogService: DialogService,
    private _toolservice:ToolsService,
  ) {
   }

  ngOnInit() {
    this.obj = {};
    this.activits = new Array<Activite>();
    this.color = "";

    this.getAllEvidences();
    this.getAllCategories();

    this.activite = new Activite();
    this.activite.reference = "";
    this.activite.libelle = "";

    this.categ = new CategorieActivite();
  }

  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
    this.categ = new CategorieActivite();
    this.c_edit = false;
    this._activits = [];
    //another implementations will goes here
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
  }

  addTableActivity(){
    var act:Activite;
    if(this.activite.libelle === '' || this.activite.reference === '' 
      || this.activite.typeEvidences.length < 1 ){
        this._toast.showError('Veuillez renseigner tous les champs obligatoires!!!');
        return;
    }

    this.c_edit = true; //bloque les champs de selection de la categorie
    act = this.activite;
    this.activite = new Activite();
   
    this._activits.push(act);
    console.log("Ret list activity: "+ this._activits.length);
  }

  getAllEvidences(){
    //this._evi.listAllEvidence(this.url_1 + "/findtypevidence")
    this._toolservice.AllEvidence()
    .subscribe(
      items => {
        this.toppingList = items.datas;
        console.log("Ret list evidence: "+ items.message);
      });

  }

  getAllActivites(){
    console.log("All list activits: "+ this.url_2 + "/getall");
   // this._activi.list(this.url_2 + "/getall")
    this._toolservice.getAllActivite()
      .subscribe(
        items => {
          this.activits = items;
          console.log("Ret list activits: "+ this.activits.length);
        });
  }

  getAllCategories(){
    console.log("All list categories: "+ this.url + "/getall");
    //this._catg.list(this.url + "/getall")
    this._toolservice.getAllCategorie()
      .subscribe(
        items => {
          console.log("Ret list categories: "+ items.message);
          this.category = items.datas;
        });
  }

  addActivite(activite:Activite){
    if(activite.libelle === '' || activite.reference === '' 
      || activite.typeEvidences.length < 1 ){
        this._toast.showError('Veuillez renseigner tous les champs obligatoires!!!');
        return;
    }

    this._toolservice.addActivity(activite)
      .subscribe(res => {
        console.log("Activite ok " , res.libelle);
        this._toast.showSuccess(res.libelle + ', crée avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
       // this.afbcore.showMessage('DANGER', 'An error occured!!');
      });
  }

  saveCateg(){
    if(this.categ.libelle === '' || this.categ.reference === '' 
      || this.categ.profils === '' ){
        this._toast.showError('Definir la categorie !!!');
        return;
    }
    this.c_edit = true;
    this.categ.activites = this._activits;
    console.log("Ret list categ: "+ this.categ.activites.length);

    //this._catg.create(this.url + "/add", this.categ)
    this._toolservice.addCategory(this.categ)
      .subscribe(res => {
        console.log("Categorie ok " , res.libelle);
        this._toast.showSuccess(res.libelle + ', crée avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
      });
  }

  editForm(event:any){
    // $event.preventDefault();
     console.log(event.reference);
     console.log(this.url+"/findbyreference");
     this.toggleCollapseShow();
    
    // this._catg.get(this.url+"/findbyreference", event.reference)
     this._toolservice.getCategoryByRef(event.reference)
       .subscribe(
         items => {
          //console.log("Ret evidence: "+  JSON.stringify(items));
          if(items.datas && items.datas.length > 0)  this.categ = items.datas[0];
          
           this._activits = this.categ.activites;
           this._activits.forEach(
             value => {
               console.log(value);
             }
           )
         //  let data = this.activitjr;
         /*  const ref = this.dialogService.open(CategorieFormComponent, {
             width: '50%',
             closeOnEscape: false,
             header: 'Modification type evidences',
             data: { obj:catg }
           });
           ref.onClose.subscribe(res => {
             if(res == true)  {
               console.log("Dialog: ", 'Opération effectuée avec succès!');
             }
           })
         */
       });
       
   }
 
   erase(e:any){
     //$event.preventDefault();
     console.log(e);
  /*   e.actif = !e.actif;
     this._catg.update(this.url + "/update", e)
       .subscribe(res => {
         this.ref.close(true);
         this._toast.showSuccess('Type evidence desactivé avec succes');
       } , (error)=>{
         console.log("An error occured " , error);
         this._toast.showError(error);
       });
 */
   }

}
