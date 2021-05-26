import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Genre } from 'src/app/models/genre';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss']
})
export class EditGenreComponent implements OnInit {

  faPencil= faPencilAlt;
  faTrash= faTrashAlt;
  faBack= faArrowLeft;
  genre: Genre={
    id: 0,
    name: '',
    image_url: '',
    created_by: 0
  }
  filmsToAdd: any[]= [];
  films: any[]= [];
  userId: number=0;
  
    constructor(
      private filmService: FilmService,
      private genreService: GenreService,
      private router: Router,
      private userService: UserService,
      private actRoute: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.getGenreToEdit();
      this.getFilms()
    }
  

    //get the film list
    getFilms(){
      this.filmService.getFilms().subscribe(films => {
        if(films.length==0){
          alert('there are no films');
        }else{
          this.films= films
          for(let film of this.films){
            film= Object.assign(film, {
              selected: false
            })
          }
          for(let filmOfList of this.films){
            for(let genre of filmOfList.genres){
              if(this.genre.id== genre.id){
                filmOfList.selected= true
                this.filmsToAdd.push(filmOfList)
                break;
              }
            }
          }
        }
      });
    }


    //get the genre that is going to be edited
    getGenreToEdit(){
      if(this.userService.loggedUser==null){
        alert('You must be logged!')
        this.router.navigate(['/login'])
      }else{
        this.userId= this.userService.loggedUser.id;
        this.genreService.getGenres().subscribe(genres => {
          if(genres.length==0){
            alert('there are no genres');
          }else{
            for(let genre of genres){
              if(genre.id== this.actRoute.snapshot.params.id){
                this.genre= genre;
              }
            }
          }
        });
      }
    }

              //manca la colonna created_by nel db
              /*
              if(genre.id== this.actRoute.snapshot.params.id && genre.created_by != this.userId){
                alert("You haven't the permits to edit this genre")
                this.router.navigate(['genres/genre-list'])
              }*/

    //remove the genre from the list
    remove(){
      this.removeGenreFromFilm()
      this.genreService.removeGenre(this.genre.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }


    //edit the genre
    edit(){
      for(let film of this.filmsToAdd){
        delete(film.selected)
      }
      //commented because the genre db don't contain any films column
//      this.genre.films= this.filmsToAdd;
      this.editFilm()
      console.log(this.genre)
      this.genreService.editGenre(this.genre).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }


    //add or remove the film from the genre film list, based on click
    addFilm(id: number){
      for(let filmToAdd of this.filmsToAdd){
        if(filmToAdd.id== id){
          filmToAdd.selected= false;
          this.filmsToAdd= this.filmsToAdd.filter(film=> film.id!= filmToAdd.id);
          return;
        }
      }
      for(let film of this.films){
        if(film.id== id){
          film.selected= true;
          this.filmsToAdd.push(film)
          return;
        }
      }
    }


    //edit the films contained inside the genre film list, if created by the user
    editFilm(){
      let inserted= false;
      for(let filmOfList of this.films){
        if(this.genre.films!= undefined){
          for(let film of this.genre.films){
            if(filmOfList.id= film.id){
              for(let genre of filmOfList.genres){
                if(genre.id== this.genre.id){
                  inserted= true;
                }
              }
              if(inserted==false && filmOfList.created_by == this.userId){
                filmOfList.genres.push(this.genre)
                this.filmService.editFilm(filmOfList).subscribe()
              }
            }
          }
        }
      }
    }


    //remove genre from film genre list when genre is deleted
    removeGenreFromFilm(){
      let inserted= false;
      for(let filmOfList of this.films){
        for(let genre of filmOfList.genres){
          if(genre.id== this.genre.id){
              inserted= true;
          }
        }
        if(inserted==true && filmOfList.created_by == this.userId){
          filmOfList.genres= filmOfList.genres.filter((genre: { id: number; })=> genre.id!= this.genre.id)
          this.filmService.editFilm(filmOfList).subscribe()
        }
      }
    }
  }

