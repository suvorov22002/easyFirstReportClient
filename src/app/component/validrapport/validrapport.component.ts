import { Component, OnInit } from '@angular/core';
import { RapportJournalier } from 'src/app/modeles/rapport-journalier';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-validrapport',
  templateUrl: './validrapport.component.html',
  styleUrls: ['./validrapport.component.css']
})
export class ValidrapportComponent implements OnInit {

  rapportjs:Array<RapportJournalier> = [];

  decisions:any;
  valid_report:any;
  c_edit:boolean;

  report:any;
  cols:any;
  etapes:any
  


  constructor(private toolservice:ToolsService) { }

  ngOnInit() {
   
    this.valid_report = {};
    this.c_edit = false;

    //decisions
  }

  getAllRapport(){

     if(this.valid_report.dateF == undefined){
       console.log('Veuillez indiquer la periode')
       return;
     }

    var obj:any;
    obj = {};
    obj.unite = '00001'
    if(obj.unite === '' || obj.unite == undefined){
      console.log('DANGER', 'Veuillez vous connecter.');
       return;
    }
    this.rapportjs = [];

      // this.toolservice.getAllRapport()
       this.toolservice.getAllRapportByUser(obj)
       .subscribe(
         items => {
          items.datas.forEach(element => {
          //  console.log(Date.parse(element.dateSaisie)+' ||| '+Date.parse(this.valid_report.dateF))
            console.log(Date.parse(this.valid_report.dateF) < Date.parse(this.valid_report.dateD))
            if(Date.parse(element.dateSaisie) < Date.parse(this.valid_report.dateF) && 
                Date.parse(element.dateSaisie) > Date.parse(this.valid_report.dateD)){
              //this.rapportjs = items.datas;
              this.rapportjs.push(element)
            }
          });
           
         });
   }

   getColor(data:any){
      //console.log("statut rapport "+data.statut);
    //  StatutRapport[typeName].valueOf(); 
    var user_color:string;
    switch(data.statut){
      
      case 'VALIDE':
        user_color = '#F77102';
        break;
      
      case 'REJETE':
        user_color = '#E7E4E4';
        break;

      case 'SAISI':
        user_color = '#F77102';
        break;

      default:
        break;
    }
      return user_color;
  }

   getStatut(data){

   }

   send(data){

   }

   edit(data){

   }

   searchR(){
    console.log(this.valid_report.dateF)
    this.getAllRapport();
   }

   onSelectItem($event){

   }
}
