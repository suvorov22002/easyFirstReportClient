import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class AppinitService {
  url: any;

  constructor(
    private afbcore:AfbcoreService, 
    private service:ShareService, 
    private http:HttpClient) 
    { }

    init(){
      let url = null;
      let headers = new HttpHeaders();
      headers = headers.set("Authorization", "Basic " + btoa(this.afbcore.userName + ":" + this.afbcore.password))
      console.log("afbcore.userName: "+this.afbcore.userName+" - afbcore.password: "+this.afbcore.password);
      return new Promise<void>((resolve, reject) =>
        {
          this.http.get("/api/jsonws/afbliferayservice.afbparamgeneraux/get-afb-param-generauxs", {headers:headers})
          .toPromise()
          .then(
            (res:any) => {
              this.service.apiHost = res[0].adresseIP + "/easyfirstreport-service/rest/api/easyfirstreport";
              this.url = res[0].adresseIP;
              this.service.apiEReport = res[0].adresseGedProcess;
              console.log("init app done");
              resolve(res);
            }
          )
          .catch(
            error => {
              console.log('Initializer failed');
            }
          )
        }
      )

    }

    getOAUTH2AcessToken(res) {

      console.log('get token url ' + JSON.stringify(res));
// just for development
      let grant_type = 'password';
      let clientID = 'USER_CLIENT_APP';
      let clientSecret = 'password';
      const client = btoa(clientID+":"+clientSecret);
      const formData = new FormData()
      formData.append("grant_type", grant_type);
      formData.append("username", "user1");
      formData.append("password", "123456");
// just for development
      let headers = new HttpHeaders();
      headers = headers.set('authorization', 'basic '+client);

      return new Promise<void>( (resolve, reject) =>
        {
          this.http.post(res[0].adresseIP + "/authorization-service/oauth/token", formData, {headers:headers})
          .toPromise()
          .then(
            (res:any) => {
              localStorage.setItem('afb_access_token', JSON.stringify(res));
              resolve();
            }
          )
          .catch(
            error => {
              return error;
            }
          )
        }

      )
    }
}
