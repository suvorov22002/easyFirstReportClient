import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ShareService } from 'src/app/service/share.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin:string = '';
  logoPath: any;

  constructor(
    private service: ShareService,
    private afbcore: AfbcoreService
  ) {
    //this.logoPath = '/o/easyfirstreportclient-0.0.0/easyFirstReportClient/assets/images/EASY-FIRST-REPORT2.jpg';
    this.logoPath = 'assets/images/EASY-FIRST-REPORT2.jpg';
   }

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
