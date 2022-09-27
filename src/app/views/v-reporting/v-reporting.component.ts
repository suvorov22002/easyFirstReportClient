import { Component, OnInit } from '@angular/core';
import { Reporting } from 'src/app/modeles/reporting';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { ReportingService } from 'src/app/service/reporting.service';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-v-reporting',
  templateUrl: './v-reporting.component.html',
  styleUrls: ['./v-reporting.component.css']
})
export class VReportingComponent implements OnInit {

  title:string = "Rapport";
  url:string;
  report:any;

  report_synth_activ:Array<Reporting> = [];
  entry_report:any;

  synAct:boolean;
  detAct:boolean;
  synComp:boolean;
  synEval:boolean;

  rapports = [
    {reference : 'syn_act' , valeur : 'Synthèse activité'},
    {reference : 'det_act' , valeur :'Details activité'},
    {reference : 'syn_comp' , valeur : 'Synthese comparative'},
    {reference : 'syn_eval' , valeur : 'Evaluation'},
  ]

  constructor(
    private _reportserv:ReportingService,
    private _toolservice:ToolsService,
    private _config:AppConfigService,
    private _toast:ToastService
  ) { 
    
  }

  ngOnInit() {
    this.report_synth_activ = [];
    this.entry_report = {};
    this.synAct = false;
  }

  onSelectItem(data){
    this.title = 'Rapport';
    console.log(data.value.valeur);
    console.log("Rapport",this.report);
    var ref = data.value.reference;
    this.report = {};
    this.entry_report.addEvidence = false;

    if(ref === undefined || this.entry_report.dateD === undefined || this.entry_report.dateF === undefined){
      this._toast.showError("Bien vouloir renseigner les champs obligatoires");
      return
    }
    if(this.entry_report.dateD > this.entry_report.dateF){
      this._toast.showError("Mauvaise période de date!!:");
      return
    } 

    this.title = this.title + " de " +data.value.valeur;

    switch(ref){
      case 'syn_act' :
        this.synAct = true;
        this.getsynAct();
        this.detAct = false;
        this.synComp = false;
        this.synEval = false;
        break;
      
      case 'det_act' :
        this.entry_report.addEvidence = true;
        this.synAct = false;
        this.getsynAct();
        this.detAct = true;
        this.synComp = false;
        this.synEval = false;
        break;
      
      case 'syn_comp' :
        this.synAct = false;
        this.getsynComp();
        this.detAct = false;
        this.synComp = true;
        this.synEval = false;
        break;

      case 'syn_eval' :
        this.synAct = false;
        this.getsynEval();
        this.detAct = false;
        this.synComp = false;
        this.synEval = true;
        break;

      default:
        break;
    }
    
  }

  getsynAct(){
   //
    //this._reportserv._listRapport(this.url + "/getstatactivites", this.entry_report)
    this._toolservice.getAllReportRapport(this.entry_report)
      .subscribe(res => {
      //console.log("Rapport ok " , console.log(JSON.stringify(res)));
      this.report_synth_activ = res.datas;
      this._toast.showSuccess(this.report_synth_activ.length + ', données extraites avec succes');
    } , (error)=>{
      console.log("An error occured " , error);
      this._toast.showError(error);
    });
  }

  getdetAct(){

  }

  getsynComp(){

  }

  getsynEval(){
    
  }

}
