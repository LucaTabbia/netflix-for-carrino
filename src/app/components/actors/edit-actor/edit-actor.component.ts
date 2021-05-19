import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.scss']
})
export class EditActorComponent implements OnInit {

  actor: Actor={
    id: 0,
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: new Date(),
    films: [],
    created_by: 0,
  }
    filmId: number= 0;
    userId: number=0;
  
    constructor(
      private filmService: FilmService,
      private actorService: ActorService,
      private router: Router,
      private userService: UserService,
      private actRoute: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.getActorToEdit();
    }
  
    getActorToEdit(){
      if(this.userService.loggedUser==null){
        alert('You must be logged!')
        this.router.navigate(['/login'])
      }else{
        this.userId= this.userService.loggedUser.id;
        this.actorService.getActors().subscribe(actors => {
          if(actors.length==0){
            alert('there are no actors');
          }else{
            for(let actor of actors){
              if(actor.id== this.actRoute.snapshot.params.id && actor.created_by == this.userId){
                this.actor= actor;
              }
              if(actor.id== this.actRoute.snapshot.params.id && actor.created_by != this.userId){
                alert("You haven't the permits to edit this actor")
                this.router.navigate(['actors/actor-list'])
              }
            }
          }
        });
      }
    }
    remove(){
      this.actorService.removeActor(this.actor.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }
    edit(){
      this.actorService.editActor(this.actor).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }
    addFilm(){
      this.filmService.getFilms().subscribe(films => {
        if(films.length==0){
          alert('there are no films');
        }else{
          for(let film of films){
            if(film.id== this.filmId){
              this.actor.films?.push(film);
            }
          }
        }
      });
    }
  }
