import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfbcoreService } from 'afbcore';
import { NgxPermissionsService } from 'ngx-permissions';
import { GfcInformation } from 'src/app/modeles/users';
import { ShareService } from 'src/app/service/share.service';
import { environment } from 'src/environments/environment';

declare const Liferay: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
