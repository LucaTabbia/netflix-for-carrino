import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.scss']
})
export class FilmViewComponent implements OnInit {

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
            this.film= film;
          }
        }
      }
    });
  }


  //add a vote to the film
  newVote(value: any, film: Film){
    film.votes.push(value);
    this.filmService.editFilm(film)
  }

  //add to favorites
  addToFavorites(id: number){
    this.userService.addFavoriteFilm(id.toString()).subscribe()     
  }
  back(){
    this.location.back()
  }
}
