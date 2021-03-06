import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  faPencil= faPencilAlt;
  faBack= faArrowLeft;
  user: User={
    id: 0,
    username: "",
    password:  "",
    firstname: "",
    lastname: "",
    birthdate: new Date,
    photo_url: "",
    favorite_films: [],
    favorite_actors: [],
    favorite_genres: [],
    token: "",
    last_login: new Date,
  }
  userImg= "https://pbs.twimg.com/profile_images/740272510420258817/sd2e6kJy_400x400.jpg";
  passwordCheck: string= "";
    constructor(
      private router: Router,
      private userService: UserService,
    ) { }
  
    ngOnInit(): void {
      this.getUserToEdit();
    }

    //get the user that is going to be edited
    getUserToEdit(){
      if(this.userService.loggedUser==null){
        alert('You must be logged!')
        this.router.navigate(['/login'])
      }else{
        this.user= this.userService.loggedUser;
        if(this.userService.loggedUser.photo_url!= undefined){
          this.userImg= this.userService.loggedUser.photo_url;
        }
        this.passwordCheck= this.user.password;
      }
    }


    //edit the user
    edit(){
      if(this.user.password!=this.passwordCheck){
        alert("check that your passwords are the same");
        return;
      }
      this.userService.editLoggedUser(this.user).subscribe()
      this.userService.logOut()
      this.router.navigate(['/login'])
    }
  }
