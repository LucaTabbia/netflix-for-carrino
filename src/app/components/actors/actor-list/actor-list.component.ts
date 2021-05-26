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
        for(let actor of actors){
          actor= Object.assign(actor, {
            isFavorite: false
          })
        }
        this.actors = actors;
      }
    });
  }
//add the actor to the user favorite list
  addToFavorites(id: number){
    if(this.userService.loggedUser?.favorite_actors!= undefined){
      let favoriteActorList= this.userService.loggedUser?.favorite_actors.toString()+ ","+id;
      this.userService.addFavoriteActor(favoriteActorList).subscribe()
    }
    else{
      let favoriteActorList= id.toString();
      this.userService.addFavoriteActor(favoriteActorList).subscribe()
    }
  }
}
