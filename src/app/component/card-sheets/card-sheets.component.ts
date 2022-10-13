import { Component, Directive, OnInit } from '@angular/core';
import { Activite } from 'src/app/modeles/activite';
import { CategorieActivite } from 'src/app/modeles/categorie-activite';
import { Evidences } from 'src/app/modeles/evidences';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-card-sheets',
  templateUrl: './card-sheets.component.html',
  styleUrls: ['./card-sheets.component.css']
})

export class CardSheetsComponent implements OnInit {

  listCateg : Array<CategorieActivite> = [];
  listCategs ?: any;
  ilistCategs ?: any;
  private _color = "light";
  map:any; 
  all_evidences:Array<Evidences> = [];
  
  constructor(private toolservice:ToolsService) { }

  ngOnInit() {
    this.getAllCategorie()
    this.map = new Map();
  }

  getAllCategorie(){
    this.toolservice.getAllCategorie()
      .subscribe(
        items => {
          this.listCateg = items.datas;
        //  console.log("categ: ",JSON.stringify(this.listCateg))
        });
  }

  formatDatas() {
    var obj:any
    var str : string
    var lblCat : string
    var acti : Activite[]
    this.listCategs = []
    obj = {}
    
    this.listCateg.forEach(val => {
      
      this.ilistCategs = []
      obj = {}
      lblCat = val.libelle
      obj.libelleCatg = lblCat
      obj.libelle =  ""
      obj.reference =val.reference
      obj.categ = true
      this.ilistCategs.push(obj)

      //this.map.set(lblCat, this.listCategs)
    
      acti = []
      acti = val.activites
      for(var i=0;i<acti.length;i++){
        obj = {}
        str = acti[i].libelle
        if (str.trim().length > 64) {
          str = str.substring(0, str.indexOf("("))
        }
        obj.libelle = str
        obj.reference =acti[i].reference
        obj.evidence = acti[i].evidences

        var splitter = obj.evidence.split("/"); 
       // console.log("Ret splitter: "+ splitter);
       console.log("obj.evidence: "+obj.evidence);
        for(var i=0;i<splitter.length;i++){
          console.log("Ret splitter: "+ splitter[i]);
          this.get_evidencesCode(splitter[i])
        }


        obj.libelleCatg = lblCat
        obj.categ = false
        this.ilistCategs.push(obj)

        this.map.set(lblCat, this.ilistCategs)
      }
    });
   // console.log("categ: ",JSON.stringify(this.listCategs))
     this.listCategs = []
    for (let [key, value] of this.map) {
      //console.log("key: ",JSON.stringify(key))
      value.forEach(v => {
        this.listCategs.push(v)
      });
    }
  }

  addRoow(event) {
    console.log(JSON.stringify(event))
    var preVal : any = []

  //  for (let [key, value] of this.map) {
  //    console.log("Origin Map: ",JSON.stringify(value))
  //  }

    preVal = this.map.get(event.libelleCatg)
    //console.log("Origin Map: ",JSON.stringify(preVal))

    preVal.push(event)

    this.map.set(event.libelleCatg, preVal)
    //console.log("After Map: ",JSON.stringify(preVal))
   
    this.listCategs = []
    for (let [key, value] of this.map) {
     // console.log("After Map: ",key)
      value.forEach(v => {
        this.listCategs.push(v)
      });
    }
  }

  get_evidencesCode(code:string){
    this.toolservice.getEvidenceCode(code)
      .subscribe(
        items => {
          this.all_evidences.push(items.datas[0]);
          //console.log("Ret evidences items: "+ JSON.stringify(items));
        });
  }

}
