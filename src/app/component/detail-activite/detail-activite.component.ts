import { Component, Input, OnInit } from '@angular/core';
import { Reporting } from 'src/app/modeles/reporting';
import { ExcelreportService } from 'src/app/service/excelreport.service';

@Component({
  selector: 'app-detail-activite',
  templateUrl: './detail-activite.component.html',
  styleUrls: ['./detail-activite.component.css']
})
export class DetailActiviteComponent implements OnInit {

  @Input('rapport')
  datas:Array<Reporting> = [];
  evidences:any;

  cols:any;

  title:string;
  
  constructor(
    private _excelserv:ExcelreportService
  ) { }

  ngOnInit() {
    this.title = "Rapport synthese detail activité";
    this.cols = [];
    //console.log(this.datas.length);
  }

  exportFile(title:string){
    const datas = this.datas;
    const code = 'det_act';
    this._excelserv.exportFile(title, datas, code);
  }

  smash(data){
    var evi:any = [];
    var _evi:any = [];
    evi = data.split("/");
    evi.forEach(element => {
      if(element)
         _evi.push(element.split("_")[1]);
    });
    console.log(_evi);
    return _evi;
    
  }

}
