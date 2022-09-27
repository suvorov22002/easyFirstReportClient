import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  resourcesUrl: any;


  constructor(
    private http: HttpClient,
    private share: ShareService
  ) { 
    //this.resourcesUrl = this.share.initParam.hostObj.url
    console.log(this.resourcesUrl);
  }

  loginLDAP(user) {
    let headers = new HttpHeaders();
    return this.http.post(this.resourcesUrl + '/auth-ldap-service/ldap/auth', user, {headers: headers})
    .pipe(map((res: any) => {
      return res;
      } ));
  }
}
