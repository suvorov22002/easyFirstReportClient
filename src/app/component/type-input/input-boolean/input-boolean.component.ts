import { Component, OnInit } from '@angular/core';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-input-boolean',
  templateUrl: './input-boolean.component.html',
  styleUrls: ['./input-boolean.component.css']
})
export class InputBooleanComponent extends DynamicEvidence implements OnInit {

  constructor(
    _evidences:EvidencesService
  ) {
     super(_evidences);
   }

  ngOnInit() {
  }

}
