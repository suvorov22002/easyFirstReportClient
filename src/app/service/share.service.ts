import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AfbcoreService } from 'afbcore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  userObserver =  new BehaviorSubject<any>(null); // {1}
  notification = new BehaviorSubject<number>(0); // {1}
  initParam: any;


  apiHost: String;
  apiEReport: String; 
  apiMngLoad = new BehaviorSubject<boolean>(false); 
  tabRoles: any[];
  userLogin:string = '';

  permission = [
    "ESR_MANAGE_REPORTING",
    "ESR_MANAGE_PARAM",
    "ESR_MANAGE_ETAPE",
    "ESR_MANAGE_AFFECTATION",
    "ESR_MANAGE_EDITION",
    "ESR_MANAGE_ALL_EXTRACTION",
    "ESR_AVISDADS",
    "ESR_AVISGFC",
    "ESR_AVISDR",
    "ESR_AVISRPRE",
    "ESR_AVISDG",
    "ESR_AVISDIR",
    "ESR_CHOIXGFC",
    "ESR_AVISCHDEP"
  ]
  constructor(
    private afbcore:AfbcoreService, 
    private dialog: MatDialog,
    private http:HttpClient 
  ) { }

  onSucces(res: any) {
    this.afbcore.loading(false);
    this.apiHost = res[0].adresseIP + '/easyreport/rest/api';
    this.apiMngLoad.next(true);
  }

  stringToTable(str: any) {
    console.log('str ' + str);
    this.tabRoles = [];
    if(str != null) {
      for(let s of str.split(';')) {
        this.tabRoles.push(s);
      }
    }
    console.log(this.tabRoles);
    return this.tabRoles;
  }

  loading(state:boolean) {
   // if(state == true) {
   //   this.dialog.open(LoadingComponent, {
   //     width: '300px',
    //    disableClose: true
   //   })
  //  }
  //  else {
  //    this.dialog.closeAll();
  //  }
     
  }

  getUsers() {
    let headers = new HttpHeaders();
    let username = 'test';
    let password = 'test';
    
    headers = headers.set("Authorization", "Basic " + btoa(username + ":" + password))
    return this.http.get('/api/jsonws/afbliferayservice.afb_module/get-users', { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  loadAll() {
    return this.afbcore.getUSerByScreenName()
  }
}
