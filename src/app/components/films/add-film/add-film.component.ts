import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {

  faPlus= faPlus;
  faBack= faArrowLeft;
  film: Film= {
  id: 0,
  title: '',
  description: '',
  plot: '',
  director: '',
  duration: {hours: 0, minutes: 0},
  vote: 0,
  release_year: 0,
  cover_url: '',
  tags: '',
  created_by: 0,
  created_at: new Date().toString(),
  actors: [],
  genres: [],
  votes: [],
  }
  actors: Actor[]= [];
  genres: Genre[]= [];
  actorsToAdd: Actor[]= [];
  genresToAdd: Genre[]= [];

  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkUser();
    this.getActorsAndGenres();
  }


  //get the list of genres and actors
  getActorsAndGenres(){
    this.genreService.getGenres().subscribe(genres => {
      if(genres.length==0){
        alert('there are no genres');
      }else{
        this.genres= genres;
      }
    });
    this.actorService.getActors().subscribe(actors => {
      if(actors.length==0){
        alert('there are no actors');
      }else{
        this.actors= actors;
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


  //add the film to the film list
  add(){
    this.film.created_at= new Date().toString();
    if(this.userService.loggedUser!= null){
    this.film.created_by= this.userService.loggedUser.id
    }
    for(let actor of this.actorsToAdd){
      actor.selected= false;
      this.film.actors.push(actor)
    }
    for(let genre of this.genresToAdd){
      genre.selected= false;
      this.film.genres.push(genre)
    }
    //see the function
//    this.editActorsAndGenres();
    this.filmService.addFilm(this.film).subscribe(response=>{
      this.film={
        id: 0,
        title: '',
        description: '',
        plot: '',
        director: '',
        duration: {hours: 0, minutes: 0},
        vote: 0,
        release_year: 0,
        cover_url: '',
        tags: '',
        created_by: 0,
        created_at: new Date().toString(),
        actors: [],
        genres: [],
        votes: []
      };
      this.router.navigate(['films/film-list'])
    });
  }


  //add the actor or remove it from the list, based on click
  addActor(id: number){
    for(let actorToAdd of this.actorsToAdd){
      if(actorToAdd.id== id){
        actorToAdd.selected= false;
        this.actorsToAdd= this.actorsToAdd.filter(actor=> actor.id!= actorToAdd.id);
        return;
      }
    }
    for(let actor of this.actors){
      if(actor.id== id){
        actor.selected= true;
        this.actorsToAdd.push(actor);
        return;
      }
    }
  }


  //add the genre or remove it from the list, based on click
  addGenre(id: number){
    for(let genreToAdd of this.genresToAdd){
      if(genreToAdd.id== id){
        genreToAdd.selected= false;
        this.genresToAdd= this.genresToAdd.filter(genre=> genre.id!= genreToAdd.id);
        return;
      }
    }
    for(let genre of this.genres){
      if(genre.id== id){
        genre.selected= true;
        this.genresToAdd.push(genre)
        return;
      }
    }
  }


  //edit the actors and genres inside the film if the creator is the same as the user
  //commented because the genre and actor dbs don't contain any films column
/*  editActorsAndGenres(){
    for(let actorOfList of this.actors){
      for(let actorOfFilm of this.actorsToAdd){
        if(actorOfList.id== actorOfFilm.id && actorOfList.created_by== this.userService.loggedUser?.id){
          if(actorOfList.films==undefined){
            actorOfList.films= []
          }
          actorOfList.films.push(this.film)
          this.actorService.editActor(actorOfList).subscribe()
        }
      }
    }
    for(let genreOfList of this.genres){
      for(let genreOfFilm of this.genresToAdd){
        if(genreOfList.id== genreOfFilm.id && genreOfList.created_by== this.userService.loggedUser?.id){
          if(genreOfList.films==undefined){
            genreOfList.films= []
          }
          genreOfList.films.push(this.film)
          this.genreService.editGenre(genreOfList).subscribe()
        }
      }
    }
  }
  */


  //clear the film and redirect to the film list
  cancel(){
    this.film={
      id: 0,
      title: '',
      description: '',
      plot: '',
      director: '',
      duration: {hours: 0, minutes: 0},
      vote: 0,
      release_year: 0,
      cover_url: '',
      tags: '',
      created_by: 0,
      created_at: new Date().toString(),
      actors: [],
      genres: [],
      votes: []
    };
    this.router.navigate(['films/film-list'])
  }
}
  
