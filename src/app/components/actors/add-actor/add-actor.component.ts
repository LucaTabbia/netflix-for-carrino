import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {

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

  constructor(
    private actorService: ActorService,
    private filmService: FilmService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  add(){
    if(this.userService.loggedUser!= null){
    this.actor.created_by= this.userService.loggedUser.id
    }
    this.actorService.addActor(this.actor).subscribe(response=>{
      console.log(response);
      this.actor={
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        films: [],
        birthdate: new Date(),
        created_by: 0,
      }
      this.router.navigate(['actors/actor-list'])
    });
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
