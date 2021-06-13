import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { faHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  faPlus= faPlus;
  faEdit= faEdit;
  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;

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
	setVote(film: Film, vote: number) {
		film.vote = vote;
		this.filmService.editFilm(film).subscribe(response => console.log(response))
	}


  //get the list of films
  getFilms(): void{
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        if(this.userService.loggedUser?.favorite_films!=undefined){
          let userFilms= this.userService.loggedUser?.favorite_films.toString().split(",").map(function(id){
            return parseInt(id);
          });
          for(let film of films){
            if(userFilms!= undefined){
              if(userFilms.find(x=> x== film.id) != undefined){
                film= Object.assign(film, {
                  isFavorite: true
                })
              }else{
                film= Object.assign(film, {
                  isFavorite: false
                })
              }
            }else{
              film= Object.assign(film, {
                isFavorite: false
              })
            }
          }
        }else{
          for(let film of films){
            film= Object.assign(film, {
              isFavorite: false
            })
          }
        }
        this.films = films;
        this.filmsForSearch= films;
      }
    });
  }


  //add the film to the user favorites list
  addToFavorites(id: number){
    if(this.userService.loggedUser == null){
      alert('You must be logged!');
      return;
    }
    if(this.films.find(x=> x.id== id).isFavorite== true){
      this.films.find(x=> x.id== id).isFavorite= false; 
    }else{
      this.films.find(x=> x.id== id).isFavorite= true;
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

}