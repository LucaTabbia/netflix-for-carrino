import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Netflix';
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    let user= this.userService.getLoggedUser();
    if(user){
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
