import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  userLogin:string = '';
  constructor(
    private service: ShareService,
    private afbcore: AfbcoreService
  ) { }

  ngOnInit() {
   // this.loadUser();
  }

  loadUser(){
    this.service.loadAll()
      .subscribe(
        (res) => this.getuserInfo(res),
        (error) => this.onError(error) 
      );
  }

  getuserInfo(res) {
    console.log("users info: ",JSON.stringify(res));
    this.userLogin = res.loginPortal;
  }

  onError(error) {
    this.afbcore.loading(false);
    this.afbcore.showMessage('DANGER', 'Echec de la récupération des information utilisateur');
  }

}
