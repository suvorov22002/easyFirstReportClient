import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfbcoreService } from 'afbcore';
import { NgxPermissionsService } from 'ngx-permissions';
import { ShareService } from 'src/app/service/share.service';

import { environment } from 'src/environments/environment';

declare const Liferay: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  obj: any;
  logoPath: any;
  roles: any[];
  query: any;
  apiMngLoad: boolean = false;
  queryID: any;
  
  constructor(
    private router: Router,
    private routeParams: ActivatedRoute,
    private service: ShareService,
    private permissionsService: NgxPermissionsService,
    private afbcore: AfbcoreService
  ) { 
 /* 
    this.postDaata();
    this.routeParams.queryParams.subscribe(params => {
      console.log("params: ",JSON.stringify(params));
      this.query = params['r']; // recuperaton des roles du user dans l'url
      this.queryID = params['id']; // recuperation du userID
      this.query = atob(this.query); // decodage des roles present dans l'url
      localStorage.setItem('role_ereport',this.query); // sauvegarde des roles dans la session
      localStorage.setItem('userId',this.queryID); // sauvegarde du userID dans la session
     });
    //si les roles ne sont pas present dans l'url on recupere les roles dans la session
      if(this.query == undefined || this.query == null) this.query = localStorage.getItem('role__ereport');

      this.logoPath = '/o/easyfirstreportclient-0.0.0/easyFirstReportClient/assets/images/EASY-FIRST-REPORT.png';

      let imgUrl = this.logoPath;*/
  }

  ngOnInit() {
   // this.roles = this.service.stringToTable(this.query); // on récupere les roles du user connecté
   // this.permissionsService.loadPermissions(this.roles); // on charge les roles du user connecté dans le module
  }

  postDaata() {
     //this.apimanager.getApiManager();
     this.afbcore.postModule(environment.name, 
      environment.name, 
      environment.name, "", this.logoPath, 
      true, "",this.service.permission, Liferay); 
  }



}
