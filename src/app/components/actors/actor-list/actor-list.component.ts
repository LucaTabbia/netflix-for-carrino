import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { UserService } from 'src/app/services/user.service';
import { faHeart, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit {

  faList= faList;
  faEdit= faEdit;
  faPlus= faPlus;
  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;
  actors: any[]= [];
  userId: number= this.userService.loggedUser ? this.userService.loggedUser.id : 0

  constructor(
    private actorService: ActorService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getActors();
  }

//get the actors list
  getActors(): void{
    this.actorService.getActors().subscribe(actors => {
      if(actors.length==0){
        alert('there are no actors');
      }else{
        if(this.userService.loggedUser?.favorite_actors!= undefined){
          let userActors= this.userService.loggedUser?.favorite_actors.toString().split(",").map(function(id){
            return parseInt(id);
          });
          for(let actor of actors){
            if(userActors!= undefined){
              if(userActors.find(x=> x== actor.id) != undefined){
                actor= Object.assign(actor, {
                  isFavorite: true
                })
              }else{
                actor= Object.assign(actor, {
                  isFavorite: false
                })
              }
            }else{
              actor= Object.assign(actor, {
                isFavorite: false
              })
            }
          }
        }else{
          for(let actor of actors){
            actor= Object.assign(actor, {
              isFavorite: false
            })
          }
        }
        this.actors = actors;
      }
    });
  }
//add the actor to the user favorite list
addToFavorites(id: number){
  if(this.userService.loggedUser == null){
    alert('You must be logged!');
    return;
  }
  if(this.actors.find(x=> x.id== id).isFavorite== true){
    this.actors.find(x=> x.id== id).isFavorite= false; 
  }else{
    this.actors.find(x=> x.id== id).isFavorite= true;
  }
  if(this.userService.loggedUser != null){
    if(this.userService.loggedUser?.favorite_actors!=undefined){
      let actors = this.userService.loggedUser?.favorite_actors.toString().split(",").map(function(id){
        return parseInt(id);
      });
      if(actors.find(x=> x== id)== undefined){
        actors.push(id);
        this.userService.loggedUser.favorite_actors.push(id);
        if(actors!= undefined){
          this.userService.addFavoriteActor(actors.toString()).subscribe();
        }
      }else{
        if(actors!= undefined){
          this.userService.loggedUser.favorite_actors = actors.filter(x=> x!= id);
          this.userService.addFavoriteActor(this.userService.loggedUser.favorite_actors.toString()).subscribe();
        }
      }
    }else{
      this.userService.loggedUser.favorite_actors= [];
      this.userService.loggedUser.favorite_actors.push(id);
      this.userService.addFavoriteActor(this.userService.loggedUser.favorite_actors.toString()).subscribe();
    }
  }   
}
}
