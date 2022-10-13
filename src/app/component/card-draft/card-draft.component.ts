import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/modeles/activite';
import { CategorieActivite } from 'src/app/modeles/categorie-activite';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-card-draft',
  templateUrl: './card-draft.component.html',
  styleUrls: ['./card-draft.component.css']
})
export class CardDraftComponent implements OnInit {

  listCateg : Array<CategorieActivite> = [];
  listCategs ?: any;
  private _color = "light";

  constructor(private toolservice:ToolsService) { }

  ngOnInit() {
    this.getAllCategorie()
  }

  toggleCollapseShow1() {

  }

  toggleCollapseShow() {

  }


  addToAnotherActivity(items) {
    console.log(items)
  }

  getAllCategorie(){
    this.toolservice.getAllCategorie()
      .subscribe(
        items => {
          //console.log(JSON.stringify(items.datas))
          this.listCateg = items.datas;
        });
  }

  formatDatas() {
    var obj:any
    var acti : Activite[]
    this.listCategs = []
    obj = {}
    
    this.listCateg.forEach(val => {
      
      
      
    
      acti = []
      acti = val.activites
      for(var i=0;i<acti.length;i++){
        obj = {}
        obj.libelle = val.libelle
        console.log(" obj.libelle: ", obj.libelle)
        obj.reference = val.reference
        obj.activite = acti[i].libelle
        this.listCategs.push(obj)
      }
    });

    console.log("categ: ",JSON.stringify(this.listCategs))

  }

  addActi(item){

  }

}
