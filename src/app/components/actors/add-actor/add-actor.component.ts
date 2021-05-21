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
  filmsToAdd: any[]= [];
  films: any[]= [];
  constructor(
    private actorService: ActorService,
    private filmService: FilmService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkUser();
    this.getFilms();
  }
  //get the list of films and assign them a selected parameter
  getFilms(){
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        for(let film of films){
          film= Object.assign(film, {
            selected: false
          })
        }
        this.films= films
      }
    });
  }
  //check if the user is logged
  checkUser(){
    if(this.userService.loggedUser==null){
      alert('You must be logged!')
      this.router.navigate(['/login'])
    }
  }
  //add the actor to the list
  add(){
    console.log(this.actor.films)
    if(this.userService.loggedUser!= null){
    this.actor.created_by= this.userService.loggedUser.id
    }
    for(let film of this.filmsToAdd){
      delete(film.selected)
      //commented because the actor db don't contain films column
//    this.actor.films?.push(film)
    }
    this.editFilm()
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
  //add the film or remove it on click
  addFilm(id: number){
    for(let filmToAdd of this.filmsToAdd){
      if(filmToAdd.id== id){
        filmToAdd.selected= false;
        this.filmsToAdd= this.filmsToAdd.filter(film=> film.id!= filmToAdd.id);
        return;
      }
    }
    for(let film of this.films){
      if(film.id== id){
        film.selected= true;
        this.filmsToAdd.push(film)
        return;
      }
    }
  }
  //add the actor to the film actor list
  editFilm(){
    for(let filmOfList of this.films){
      for(let filmOfActor of this.filmsToAdd){
        if(filmOfList.id== filmOfActor.id && filmOfList.created_by== this.userService.loggedUser?.id){
          filmOfList.actors.push(this.actor)
          console.log(filmOfList)
          this.filmService.editFilm(filmOfList).subscribe()
        }
      }
    }
  }
  //clear all the changes made and redirect to the actor list
  cancel(){
    this.actor={
      id: 0,
      firstname: '',
      lastname: '',
      photo_url: '',
      birthdate: new Date(),
      films: [],
      created_by: 0,
    }
    this.router.navigate(['actors/actor-list'])
  }
}
