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

  constructor(
    private userService: UserService,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getFilms();
  }

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
  newVote(value: any, film: Film){
    film.votes.push(value);
    this.filmService.editFilm(film)
  }
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
  addToFavorites(id: number){
    console.log(id)
    this.userService.addFavoriteFilm(id)
  }

}