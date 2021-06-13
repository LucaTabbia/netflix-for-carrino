import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor-film-list',
  templateUrl: './actor-film-list.component.html',
  styleUrls: ['./actor-film-list.component.scss']
})
export class ActorFilmListComponent implements OnInit {

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
	setVoteHandler(film: Film, vote: number) {
		film.votes.push(vote);
		this.filmService.editFilm(film).subscribe(response => console.log(response))
	}


  //get the list of films
  getFilms(): void{
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        if(this.userService.loggedUser?.favorite_films!= undefined){
          let userFilms= this.userService.loggedUser?.favorite_films.toString().split(",").map(function(id){
            return parseInt(id);
          });
          for(let film of films){
            for(let actor of film.actors){
              if(actor.id== this.actRoute.snapshot.params.id){
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
                this.films.push(film)
                break;
              }
            }
          }
        }else{
          for(let film of films){
            for(let actor of film.actors){
              if(actor.id== this.actRoute.snapshot.params.id){
                film= Object.assign(film, {
                  isFavorite: false
                })
                this.films.push(film)
              }
            }
          }
        }
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

  back(){
    this.location.back()
  }

}