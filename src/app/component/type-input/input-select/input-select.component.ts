import { Component, OnInit } from '@angular/core';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent extends DynamicEvidence implements OnInit {

  question:any;
  constructor(
    _evidences:EvidencesService
  ) { 
    super(_evidences);
  }

  ngOnInit() {
    this.question = [];
    this.question.options = [];
  }

}
