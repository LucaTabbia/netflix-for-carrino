import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit {

  actors: any[]= [];
  constructor(
    private actorService: ActorService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getActors();
  }


  getActors(): void{
    this.actorService.getActors().subscribe(actors => {
      if(actors.length==0){
        alert('there are no actors');
      }else{
        this.actors = actors;
      }
    });
  }
  addToFavorites(id: number){
    console.log(id)
    this.userService.addFavoriteFilm(id)
  }
}
