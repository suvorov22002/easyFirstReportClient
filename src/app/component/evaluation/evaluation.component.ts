import { Component, Input, OnInit } from '@angular/core';
import { Reporting } from 'src/app/modeles/reporting';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

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
