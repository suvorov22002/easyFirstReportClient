import { Component, Input, OnInit } from '@angular/core';
import { Reporting } from 'src/app/modeles/reporting';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ExcelreportService } from 'src/app/service/excelreport.service';

@Component({
  selector: 'app-synthese-activite',
  templateUrl: './synthese-activite.component.html',
  styleUrls: ['./synthese-activite.component.css']
})
export class SyntheseActiviteComponent implements OnInit {

  @Input('rapport')
  datas:Array<Reporting> = [];
  obj:Array<any> = [];
  cols:any;

  title:string;
  
  constructor(
    private _excelserv:ExcelreportService
  ) { }

  ngOnInit() {
    this.title = "Rapport synthese activité"
    this.cols = [];
  }

  getColor(data:any){
  }

  exportFile(title:string){
    const datas = this.datas;
    const code = 'syn_act';
    this._excelserv.exportFile(title, datas, code);
/*
    this.datas.forEach(
      value => {
        var _obj:any;
        _obj = {};
        console.log(value)
        _obj.libelleCategorieActivite = value.libelleCategorieActivite;
        _obj.libelleActivite = value.libelleActivite;
        _obj.nombre = value.nombre;
        _obj.volume = value.volume;
        this.obj.push(_obj);
      }
    );

    this.obj.forEach(
      res => {
        console.log(res);
      }
    )
    //create new excel work book
    let workbook = new Workbook();

    //add name to sheet
    let worksheet = workbook.addWorksheet("Synthèse activités");

    worksheet.mergeCells('A1', 'D2');

    //adding title 
    let titleRow = worksheet.getCell('A1');
    titleRow.fill = {

      type: 'pattern',

      pattern: 'solid',

      fgColor: { argb: '4167B8' }

    };
    titleRow.value = title;

    titleRow.font = {

      name: 'Calibri',

      size: 16,

      bold: true,

      color: { argb: 'FFFFFF' }

    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    //Blank Row 
    worksheet.addRow([]);
    //add column name
    let header=["Categorie","Activité","Nombre","Volume"]
    let headerRow = worksheet.addRow(header);
    headerRow.getCell(1).fill = {

      type: 'pattern',

      pattern: 'none',

      fgColor: {}

    };





    headerRow.eachCell((cell, number) => {

      cell.fill = {
  
        type: 'pattern',
  
        pattern: 'solid',
  
        fgColor: { argb: '716FB0' },
  
        bgColor: { argb: '' }
  
      }
  
      cell.font = {
  
        bold: true,
  
        color: { argb: 'FFFFFF' },
  
        size: 12
  
      }
  
    })
  

    //add datas to worksheet
    this.obj.forEach(
      value => {
        let x2=Object.keys(value);
        let temp=[]
        for(let y of x2)
        {
          temp.push(value[y])
        }
        worksheet.addRow(temp)
      }
    );

    //set downloadable file name
    let fname="Synthese Activite"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
*/
  }

}
