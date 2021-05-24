import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/genre';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {

  genre: Genre={
    id: 0,
    name: '',
    image_url: '',
    created_by: 0
  }
  filmsToAdd: any[]= [];
  films: any[]= [];

  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkUser();
    this.getFilms();
  }


  //get the list of films
  getFilms(){
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        for(let film of films){
          film= Object.assign(film, {
            selected: false
          })
        }
        this.films= films
      }
    });
  }


  //check if the user is logged in
  checkUser(){
    if(this.userService.loggedUser==null){
      alert('You must be logged!')
      this.router.navigate(['/login'])
    }
  }


  //add the genre to the list
  add(){
    if(this.userService.loggedUser!= null){
    this.genre.created_by= this.userService.loggedUser.id
    }
    for(let film of this.filmsToAdd){
      delete(film.selected)
      //commented because the genre db don't contain any films column
//      this.genre.films?.push(film)
    }
    this.editFilm()
    this.genreService.addGenre(this.genre).subscribe(response=>{
      this.genre={
        id: 0,
        name: '',
        image_url: '',
        created_by: 0
      };
      this.router.navigate(['genres/genre-list'])
    });
  }


  //add the film to the genre film list or remove it from it, based on click
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


  //edit the films inserted in the genre film list, if the creator is the user
  editFilm(){
    for(let filmOfList of this.films){
      for(let filmOfGenre of this.filmsToAdd){
        if(filmOfList.id== filmOfGenre.id && filmOfList.created_by== this.userService.loggedUser?.id){
          filmOfList.genres.push(this.genre)
          this.filmService.editFilm(filmOfList).subscribe()
        }
      }
    }
  }
}
