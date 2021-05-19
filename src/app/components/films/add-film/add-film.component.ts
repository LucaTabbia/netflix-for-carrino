import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/film';
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
  actorId: number= 0;
  genreId: number= 0;

  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.film.created_at= new Date().toString();
    if(this.userService.loggedUser!= null){
    this.film.created_by= this.userService.loggedUser.id
    }
    this.filmService.addFilm(this.film).subscribe(response=>{
      console.log(response);
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
  addActor(){
    this.actorService.getActors().subscribe(actors => {
      if(actors.length==0){
        alert('there are no actors');
      }else{
        for(let actor of actors){
          if(actor.id== this.actorId){
            this.film.actors?.push(actor);
          }
        }
      }
    });
  }
  addGenre(){
    this.genreService.getGenres().subscribe(genres => {
      if(genres.length==0){
        alert('there are no genres');
      }else{
        for(let genre of genres){
          if(genre.id== this.genreId){
            this.film.genres?.push(genre);
          }
        }
      }
    });
  }
}
  
