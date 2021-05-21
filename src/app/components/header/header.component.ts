import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userId: number= 0;
  userImg= "https://pbs.twimg.com/profile_images/740272510420258817/sd2e6kJy_400x400.jpg";

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.checkUser()
  }

  //check if the user in logged in, if not show a default image
  checkUser(){
    let check= setInterval(() =>{
      if(this.userService.loggedUser==null){
        this.userId=0
        this.userImg= "https://pbs.twimg.com/profile_images/740272510420258817/sd2e6kJy_400x400.jpg";
        return;
      }
      else{
        this.userId= this.userService.loggedUser.id;
        if(this.userService.loggedUser.photo_url!= undefined){
          this.userImg= this.userService.loggedUser.photo_url;
        }
        clearInterval(check)
      }
    }, 200)
  }


  //log out the user
  logOut(){
    this.userService.logOut();
    this.router.navigate(['/login']);
    this.checkUser()
  }
}
