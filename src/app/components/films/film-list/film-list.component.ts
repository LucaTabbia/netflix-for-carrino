import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  films: any[]= [];
  searchTag: string= '';
  filmsForSearch: any[]= [];
  userId: number= this.userService.loggedUser ? this.userService.loggedUser.id : 0

  constructor(
    private userService: UserService,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getFilms();
  }


  //search inside the film list, based on the values that the user types
  search(): void{
    this.films= this.filmsForSearch
    if(this.searchTag== "" || this.searchTag== " "){
      return;
    }
    let searchedFilms= [];
    let userTags= this.searchTag.split(/[" ",;-]+/)
    for(let film of this.filmsForSearch){
      let tags= film.tags.split(/[" ",;-]+/)
      for(let userTag of userTags){
        for(let tag of tags){
          if(userTag.toLowerCase()==tag.toLowerCase()){
            searchedFilms.push(film)
            break;
          }
        }
      break;  
      }
    }
    this.films= searchedFilms
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
        this.films = films;
        this.filmsForSearch= films;
      }
    });
  }


  //add the film to the user favorites list
  addToFavorites(id: number){
    if(this.userService.loggedUser?.favorite_films!= undefined){
      let favoriteFilmList= this.userService.loggedUser?.favorite_films.toString()+ ","+id;
      this.userService.addFavoriteFilm(favoriteFilmList).subscribe()
    }
    else{
      let favoriteFilmList= id.toString();
      this.userService.addFavoriteFilm(favoriteFilmList).subscribe()
    }
     
  }

}