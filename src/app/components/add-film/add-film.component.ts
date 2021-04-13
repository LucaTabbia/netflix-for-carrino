import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Genre } from 'src/app/models/genre';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {

  film: Film= {
  id: 0,
  title: '',
  description: '',
  director: '',
  duration: {hours: 0, minutes: 0},
  vote: 0,
  release_year: 0,
  cover_url: '',
  tags: '',
  created_by: 0,
  actors: [],
  genres: [],
  votes: [],
  }
  actor: Actor={
    id: 0,
    firstname: 'string',
    lastname: 'string',
    birthdate: new Date(),
    created_by: 0,
  }
  genre: Genre={
    id: 0,
    name: '',
    created_by: 0
  }
  vote: number= 0;

  constructor(
    private filmService: FilmService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  add(){
    if(this.userService.loggedUser!= null){
    this.film.created_by= this.userService.loggedUser.id
    }
    this.filmService.addFilm(this.film).subscribe(response=>{
      console.log(response);
      this.film={
        id: 0,
        title: '',
        description: '',
        director: '',
        duration: {hours: 0, minutes: 0},
        vote: 0,
        release_year: 0,
        cover_url: '',
        tags: '',
        created_by: 0,
        actors: [],
        genres: [],
        votes: []
      };
      this.router.navigate(['/film-list'])
    });
  }
  addActor(){
    if(this.userService.loggedUser!= null){
      this.actor.created_by= this.userService.loggedUser.id
      }
    this.film.actors.push(this.actor);
    this.actor={
      id: 0,
      firstname: 'string',
      lastname: 'string',
      birthdate: new Date(),
      created_by: 0,
    }
  }
  addGenre(){
    if(this.userService.loggedUser!= null){
      this.genre.created_by= this.userService.loggedUser.id
    }
    this.film.genres.push(this.genre);
    this.genre={
      id: 0,
      name: '',
      created_by: 0
    }
  }
  addVote(){
    this.film.votes.push(this.vote);
    this.vote= 0;
  }
}
