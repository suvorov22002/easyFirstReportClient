import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser: any;
  emailTerm = "@afrilandfirstbank.com";

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private notLoggedIn = new BehaviorSubject<boolean>(true); // {1}
  private username = new BehaviorSubject<String>(null);
  
  constructor(
    private router: Router,
    private share: ShareService
  ) { }

  get isLoggedIn() {
    this.currentUser = localStorage.getItem('user');
    if(this.currentUser != null)  this.loggedIn = new BehaviorSubject<boolean>(true);
    return this.loggedIn.asObservable(); // {2}
  }

  // acesseur noLoggedIn
  get isNotLoggedIn() {
    return this.notLoggedIn.asObservable(); // {2}
  }

  // acesseur username
  get _USerName() {
    return this.username.asObservable(); // {2}
  }

  login(email) {
   /* this.currentUser = email +  this.emailTerm;
    this.username.next(this.currentUser);
    localStorage.setItem('user',JSON.stringify(this.currentUser));
    this.loggedIn.next(true);
    this.notLoggedIn.next(false);
    this.share.userObserver.next(JSON.parse(localStorage.getItem('user')));*/
    this.router.navigate(['/admin']);
  }

  logout(){

   // this.currentUser.next(null);
   this.loggedIn.next(false); // set la valeur de loggedIn
   this.notLoggedIn.next(true); // set la valeur de notLoggedIn
    localStorage.removeItem('user');
    this.router.navigate(['/login']);  // {4}

  }
}
