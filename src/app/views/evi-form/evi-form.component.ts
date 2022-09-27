import { Component, Input, OnInit } from '@angular/core';
import { TypeInput } from 'src/app/enums/type-input.enum';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { Evidence } from 'src/app/modeles/evidence';
import { Evidences } from 'src/app/modeles/evidences';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-evi-form',
  templateUrl: './evi-form.component.html',
  styleUrls: ['./evi-form.component.css']
})
export class EviFormComponent extends DynamicEvidence implements  OnInit {

  @Input('evid')
  evidences;
 
  obj:Evidence;
  objj:any;
  public type:string = "text";

 

  constructor(
    _evidences:EvidencesService
  ) { 
    super(_evidences);
  }

  ngOnInit() {
    //this.evidence = [];
    this.objj = {};
    this.objj.maxlength = 10;
    this.objj.minLength = 4;
    this.objj.input = "";
    let type =  this.evidences.typeInput.valueOf().split("-")[1];
    this.type = type;
    //console.log("Input evidences: "+this.evidences.length);
    this.fullEvidence(this.evidences);
    this.evi = this.obj;
    this.init();
  }

  fullEvidence(e:Evidences){
   
    this.obj = new Evidence();
    this.obj.valeur = "";
    this.obj.typeEvidence = e; 
    this.objj.input = TypeInput[e.typeInput];
  }

}
