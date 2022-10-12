import { Component, Input, OnInit } from '@angular/core';
import { Reporting } from 'src/app/modeles/reporting';

@Component({
  selector: 'app-synt-compar-activite',
  templateUrl: './synt-compar-activite.component.html',
  styleUrls: ['./synt-compar-activite.component.css']
})
export class SyntComparActiviteComponent implements OnInit {

  @Input('rapport')
  datas:Array<Reporting> = [];
  
  evidences:any;
  report:any;
  cols:any;

  constructor() { }

  ngOnInit() {
    this.evidences = [];
    this.report = "";
    this.cols = [];
  }

}
