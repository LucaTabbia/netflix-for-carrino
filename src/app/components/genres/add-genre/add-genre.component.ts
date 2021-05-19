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
  filmId: number= 0;
  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  add(){
    if(this.userService.loggedUser!= null){
    this.genre.created_by= this.userService.loggedUser.id
    }
    this.genreService.addGenre(this.genre).subscribe(response=>{
      console.log(response);
      this.genre={
        id: 0,
        name: '',
        image_url: '',
        created_by: 0
      };
      this.router.navigate(['genres/genre-list'])
    });
  }
  addFilm(){
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        for(let film of films){
          if(film.id== this.filmId){
            this.genre.films?.push(film);
          }
        }
      }
    });
  }
}
