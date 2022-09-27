import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { Evidences } from 'src/app/modeles/evidences';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-simple-text',
  templateUrl: './simple-text.component.html',
  styleUrls: ['./simple-text.component.css']
})
export class SimpleTextComponent extends DynamicEvidence implements OnInit {

  min:number;
  max:number;
  regex: string;

  evidences:Evidences;

  constructor(
    _evidences:EvidencesService
  ) { 
    super(_evidences);
  }

  ngOnInit() {
   // this.min = this.evidences.min || 0;
   // this.max = this.evidences.max || Number.MAX_VALUE;
   // this.regex = this.evidences.regex || '.*';
  }

  get validators(){
    let validator = [];
    validator.push(Validators.minLength(this.min))
    validator.push(Validators.maxLength(this.max))
    validator.push(Validators.pattern(this.regex))
    return validator;
  }

}
