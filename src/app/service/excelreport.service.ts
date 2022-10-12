import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelreportService {

  obj:Array<any> = [];
  filename:string;
  header:any;

  constructor() { }

  exportFile(title:string, datas:Array<any>, code:string){
    
    datas.forEach(
      value => {
        var _obj:any;
        _obj = {};
        console.log(value)
        switch(code){
          case 'syn_act' :
            _obj.libelleCategorieActivite = value.libelleCategorieActivite;
            _obj.libelleActivite = value.libelleActivite;
            _obj.nombre = value.nombre;
            _obj.volume = value.volume;
            this.filename = "Synthèse activités";
            this.header=["Categorie","Activité","Nombre","Volume"]
            break;
          case 'det_act' :
            _obj.libelleCategorieActivite = value.libelleCategorieActivite;
            _obj.libelleActivite = value.libelleActivite;
            _obj.nombre = value.nombre;
            _obj.volume = value.volume;
            _obj.evidences = value.evidences;
            this.filename = "Synthèse detaillés activités";
            this.header=["Categorie","Activité","Nombre","Volume","Evidences"]
            break;
          default:
            break;
        }
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
    let worksheet = workbook.addWorksheet(this.filename);
    
    if(code === 'syn_act')
      worksheet.mergeCells('A1', 'D2');
    else if(code === 'det_act')
      worksheet.mergeCells('A1', 'E2');

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
    //let header=["Categorie","Activité","Nombre","Volume"]
    let headerRow = worksheet.addRow(this.header);
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

  }

}
