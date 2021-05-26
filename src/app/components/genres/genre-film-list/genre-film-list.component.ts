import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-genre-film-list',
  templateUrl: './genre-film-list.component.html',
  styleUrls: ['./genre-film-list.component.scss']
})
export class GenreFilmListComponent implements OnInit {


  faBack= faArrowLeft;
  faEdit= faEdit;
  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;
  films: any[]= [];
  userId: number= this.userService.loggedUser ? this.userService.loggedUser.id : 0

  constructor(
    private location: Location,
    private userService: UserService,
    private filmService: FilmService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getFilms();
  }


  //add a vote to the film
  newVote(value: any, film: Film){
    film.votes.push(value);
    this.filmService.editFilm(film)
  }


  //get the list of films
  getFilms(): void{
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        for(let film of films){
          for(let genre of film.genres){
            if(genre.id== this.actRoute.snapshot.params.id){
              film= Object.assign(film, {
                isFavorite: false
              })
              this.films.push(film)
              break;
            }
          }
        }
      }
    });

  }


  //add the film to the user favorites list
  addToFavorites(id: number){
      this.userService.addFavoriteFilm(id.toString()).subscribe()     
  }

  back(){
    this.location.back()
  }
}