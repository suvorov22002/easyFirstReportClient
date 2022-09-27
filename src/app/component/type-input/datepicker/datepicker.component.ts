import { Component, OnInit } from '@angular/core';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent extends DynamicEvidence implements OnInit {

  constructor(
    _evidences:EvidencesService
  ) { 
    super(_evidences);
  }

  ngOnInit() {
  }

}
