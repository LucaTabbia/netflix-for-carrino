import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { faEdit, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.scss']
})
export class FilmViewComponent implements OnInit {

  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;
  faBack= faArrowLeft;
  faEdit= faEdit;
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
    userId: number=0;
    isFavorite: boolean= false;
  constructor(
    private filmService: FilmService,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getFilm();
  }

  //get the film to edit and select the genres and actors inside it
  getFilm(){
    if(this.userService.loggedUser!=null){
      this.userId= this.userService.loggedUser.id;
    }
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        for(let film of films){
          if(film.id== this.actRoute.snapshot.params.id){
            if(this.userService.loggedUser?.favorite_films!=undefined){
              let userFilms= this.userService.loggedUser?.favorite_films.toString().split(",").map(function(id){
                return parseInt(id);
              });
              if(userFilms!= undefined){
                if(userFilms.find(x=> x== film.id) != undefined){
                  this.isFavorite= true;
                }else{
                  this.isFavorite= false;
                }
              }else{
                this.isFavorite= false;
              }
            }
            this.film= film;
          }
        }
      }
    });
  }


  //add a vote to the film
	setVote(film: Film, vote: number) {
		film.vote = vote;
		this.filmService.editFilm(film).subscribe(response => console.log(response))
	}

  //add to favorites
  addToFavorites(id: number){
    if(this.userService.loggedUser == null){
      alert('You must be logged!');
      return;
    }
    if(this.isFavorite== true){
      this.isFavorite= false; 
    }else{
      this.isFavorite= true;
    }
    if(this.userService.loggedUser != null){
      if(this.userService.loggedUser?.favorite_films!=undefined){
        let films = this.userService.loggedUser?.favorite_films.toString().split(",").map(function(id){
          return parseInt(id);
        });
        if(films.find(x=> x== id)== undefined){
          films.push(id);
          this.userService.loggedUser.favorite_films.push(id);
          if(films!= undefined){
            this.userService.addFavoriteFilm(films.toString()).subscribe();
          }
        }else{
          if(films!= undefined){
            this.userService.loggedUser.favorite_films = films.filter(x=> x!= id);
            this.userService.addFavoriteFilm(this.userService.loggedUser.favorite_films.toString()).subscribe();
          }
        }
      }else{
        this.userService.loggedUser.favorite_films= [];
        this.userService.loggedUser.favorite_films.push(id);
        this.userService.addFavoriteFilm(this.userService.loggedUser.favorite_films.toString()).subscribe();
      }
    }   
  }
  back(){
    this.location.back()
  }
}
