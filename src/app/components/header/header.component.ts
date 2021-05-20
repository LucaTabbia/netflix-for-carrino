import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userId= 0;
  userImg= "https://pbs.twimg.com/profile_images/740272510420258817/sd2e6kJy_400x400.jpg";
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkUser()
  }
  checkUser(){
    if(this.userService.loggedUser==null){
      return;
    }
    else{
      this.userId= this.userService.loggedUser.id;
      if(this.userService.loggedUser.photo_url!= undefined){
        this.userImg= this.userService.loggedUser.photo_url;
      }
    }
  }
  logOut(){
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
