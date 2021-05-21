
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
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
    actors: Actor[]= [];
    genres: Genre[]= [];
    actorsToAdd: Actor[]= [];
    genresToAdd: Genre[]= [];
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
      this.getActorsAndGenres();
      this.getFilmToEdit();
    }


    //get the list of actors and genres
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


    //get the film to edit and select the genres and actors inside it
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
                for(let genre of this.film.genres){
                  for(let genreOfList of this.genres){
                    if(genreOfList.id== genre.id){
                      genreOfList.selected= true;
                      this.genresToAdd.push(genreOfList)
                    }
                  }
                }
                for(let actor of this.film.actors){
                  for(let actorOfList of this.actors){
                    if(actorOfList.id== actor.id){
                      actorOfList.selected= true;
                      this.actorsToAdd.push(actorOfList)
                    }
                  }
                }
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


    //remove the film from the list
    remove(){
      this.filmService.removeFilm(this.film.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }


    //edit the film
    edit(){
      for(let actor of this.actorsToAdd){
        actor.selected= false;
      }
      this.film.actors= this.actorsToAdd
      for(let genre of this.genresToAdd){
        genre.selected= false;
      }
      this.film.genres= this.genresToAdd
      //see the function
//      this.editActorsAndGenres();
      this.filmService.editFilm(this.film).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }


    //add the actor in the film actors list, based on click
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


    //add the actor in the film actors list, based on click
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


    //edit the actors and genres inside the film if the creator is the user
    //commented because the genre and actor dbs don't contain any film column
/*    editActorsAndGenres(){
      let insertedActor= false;
      for(let actorOfList of this.actors){
        for(let actorOfFilm of this.actorsToAdd){
          if(actorOfList.id== actorOfFilm.id && actorOfList.created_by== this.userService.loggedUser?.id){
            if(actorOfList.films==undefined){
              actorOfList.films= []
            }else{
              for(let film of actorOfList.films){
                if(film.id== this.film.id){
                  insertedActor= true
                }
              }
            }
            if(insertedActor== false){
              actorOfList.films.push(this.film)
              this.actorService.editActor(actorOfList).subscribe()
            }
          }
        }
      }
      let insertedGenre= false;
      for(let genreOfList of this.genres){
        for(let genreOfFilm of this.genresToAdd){
          if(genreOfList.id== genreOfFilm.id && genreOfList.created_by== this.userService.loggedUser?.id){
            if(genreOfList.films==undefined){
              genreOfList.films= []
            }else{
              for(let film of genreOfList.films){
                if(film.id== this.film.id){
                  insertedGenre= true
                }
              }
            }
            if(insertedGenre== false){
              genreOfList.films.push(this.film)
              this.genreService.editGenre(genreOfList).subscribe()
            }
          }
        }
      }
    }*/
  }
