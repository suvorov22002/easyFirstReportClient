import { Component, OnInit } from '@angular/core';
import { CategorieActivite } from 'src/app/modeles/categorie-activite';

@Component({
  selector: 'app-card-draft',
  templateUrl: './card-draft.component.html',
  styleUrls: ['./card-draft.component.css']
})
export class CardDraftComponent implements OnInit {

  listCateg : Array<CategorieActivite> = [];

  constructor() { }

  ngOnInit() {
  }


  addToAnotherActivity() {
    
  }

}
