import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActiviteService } from 'src/app/service/activite.service';
import { EvidencesService } from 'src/app/service/evidences.service';
import { AppConfigService } from 'src/app/service/helper/app-config.service';
import { ToastService } from 'src/app/service/helper/toast.service';
import { CategorieFormComponent } from '../categorie-form/categorie-form.component';

@Component({
  selector: 'app-categ-table',
  templateUrl: './categ-table.component.html',
  styleUrls: ['./categ-table.component.css'],
  providers: [DialogService, DynamicDialogRef]
})
export class CategTableComponent implements OnInit {

  @Input('activites')  activ;

  url:string;

  evidences = [
    {libelle: 'Nom client', reference: 'NOMCLI'},
    {libelle: 'Numero compte', reference: 'NCP'},
    {libelle: 'Date', reference: 'DATE'},
    {libelle: 'Lieu', reference: 'LIEU'},
    {libelle: 'Contenu', reference: 'CTENT'}
  ];

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
 
  constructor(
    private actiservice: ActiviteService,
    private _config:AppConfigService,
    private _toast:ToastService,
    public dialogService: DialogService,
    private dialog: MatDialog,
    private ref: DynamicDialogRef
  ) {
    this.url = this._config.get().API_BASE_URL + this.actiservice.getPath();
  }

  ngOnInit(){
    
  }

  editForm(item){
    // $event.preventDefault();
    console.log(item.reference);
    console.log(this.url+"/findbyreference");
    
    this.actiservice.get(this.url+"/findbyreference", item.reference)
      .subscribe(
        items => {
           console.log("Ret activite: "+  items);
           var catg = items;
        //  let data = this.activitjr;
          const ref = this.dialogService.open(CategorieFormComponent, {
            width: '50%',
            closeOnEscape: false,
            header: 'Modification type evidences',
            data: { obj:catg }
          });
          ref.onClose.subscribe(res => {
            if(res == true)  {
              this.ref.close(true);
              console.log("Dialog: ", 'Opération effectuée avec succès!');
            }
          })
        
      });
  }

  erase(item){
    console.log(item);
  /*  item.actif = !item.actif;
    this.actiservice.update(this.url + "/update", item)
      .subscribe(res => {
        this.ref.close(true);
        this._toast.showSuccess('Type evidence desactivé avec succes');
      } , (error)=>{
        console.log("An error occured " , error);
        this._toast.showError(error);
      });
      */
    }

}
