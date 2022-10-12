import { Component, OnInit } from '@angular/core';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-unknow-question',
  templateUrl: './unknow-question.component.html',
  styleUrls: ['./unknow-question.component.css']
})
export class UnknowQuestionComponent extends DynamicEvidence implements OnInit {

  constructor(
    _evidences:EvidencesService
  ) {
    super(_evidences);
   }

  ngOnInit() {
  }

}
