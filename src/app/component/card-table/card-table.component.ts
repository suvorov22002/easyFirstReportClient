import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material';
import { Evidences } from 'src/app/modeles/evidences';
import { EvidencesService } from 'src/app/service/evidences.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { EvidenceFormComponent } from '../evidence-form/evidence-form.component';
import { ToolsService } from 'src/app/service/tools.service';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css'],
  providers: [DialogService, DynamicDialogRef]
})
export class CardTableComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  
  title:string;
  url:string;
  evi:any;

  @Input('evidences')  evid:Evidences;
 

/*  evidences:any = [
    {code: 'Date', libelle: 'Date de la visite' , typeInput: 'Date' , actif:false },
    {code: 'NCP', libelle: 'Numero de compte' , typeInput: 'Texte' , actif: true }
];*/

  constructor(
    public router: Router,
    private eviservice: EvidencesService,
    private _config:AppConfigService,
    private _toast:ToastService,
    public dialogService: DialogService,
    private _toolservice:ToolsService,
    private dialog: MatDialog,
    private ref: DynamicDialogRef
  ) {
      this.url = this._config.get().API_BASE_URL + this.eviservice.getPath();
   }

  ngOnInit() {
    this.title = "Liste";
    this.evi = {};
  }

  editForm(event:any){
   // $event.preventDefault();
    console.log(event.code);
    console.log(this.url+"/findbycode");
   // this.eviservice.get(this.url+"/findbycode", event.code)
    this._toolservice.getEvidenceByCode(event.code)
      .subscribe(
        items => {
          if(items && items.datas.length > 0) this.evi = items.datas[0];
          console.log("Ret evidence: "+  JSON.stringify(items));
        //  let data = this.activitjr;
          const ref = this.dialogService.open(EvidenceFormComponent, {
            width: '50%',
            closeOnEscape: false,
            header: 'Modification type evidences',
            data: { obj:this.evi }
          });
          ref.onClose.subscribe(res => {
            if(res == true)  {
              console.log("Dialog: ", 'Opération effectuée avec succès!');
              this.ref.close(true);
            }
          })
        
      });

    //this.router.navigate(['/admin/evidences'], event);
  }

  erase(e:any){
    //$event.preventDefault();
    console.log(e);
    e.actif = !e.actif;
    //this.eviservice.update(this.url + "/update", e)
    this._toolservice.updateEvidence(e)
      .subscribe(res => {
        this._toast.showSuccess('Type evidence desactivé avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
      });

  }

}
