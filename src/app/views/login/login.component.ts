import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  logo = 'assets/images/logo_afb.png'

  constructor(
    private service: LoginService,
    private share: ShareService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = {};
  }

  login() {
    this.authService.login(this.user.username);
  /*  this.share.loading(true);
    this.service.loginLDAP(this.user)
    .subscribe(
      (res) => this.onLoginSuccess(res),
      (error) => this.onErro(error)
    )*/
  }

  onLoginSuccess(res) {
    this.share.loading(false);
    this.authService.login(this.user.username)
  }

  onErro(error) {
    this.share.loading(false);
  }

}
