
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/models/film';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
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
    userId: number=0;
  
    constructor(
      private filmService: FilmService,
      private actorService: ActorService,
      private genreService: GenreService,
      private router: Router,
      private userService: UserService,
      private actRoute: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.getFilmToEdit();
    }
    
    getFilmToEdit(){
      if(this.userService.loggedUser==null){
        alert('You must be logged!')
        this.router.navigate(['/login'])
      }else{
        this.userId= this.userService.loggedUser.id;
        this.filmService.getFilms().subscribe(films => {
          if(films.length==0){
            alert('there are no films');
          }else{
            for(let film of films){
              if(film.id== this.actRoute.snapshot.params.id && film.created_by == this.userId){
                this.film= film;
              }
              if(film.id== this.actRoute.snapshot.params.id && film.created_by != this.userId){
                alert("You haven't the permits to edit this film")
                this.router.navigate(['films/film-list'])
              }
            }
          }
        });
      }
    }
    remove(){
      this.filmService.removeFilm(this.film.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }
    edit(){
      this.filmService.editFilm(this.film).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
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
