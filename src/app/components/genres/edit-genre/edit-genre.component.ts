import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  genre: Genre={
    id: 0,
    name: '',
    image_url: '',
    created_by: 0
  }
  filmId: number= 0;
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
    }
  
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
              if(genre.id== this.actRoute.snapshot.params.id && genre.created_by == this.userId){
                this.genre= genre;
              }
              if(genre.id== this.actRoute.snapshot.params.id && genre.created_by != this.userId){
                alert("You haven't the permits to edit this genre")
                this.router.navigate(['genres/genre-list'])
              }
            }
          }
        });
      }
    }
    remove(){
      this.genreService.removeGenre(this.genre.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
    }
    edit(){
      this.genreService.editGenre(this.genre).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/film-list']);
				}
			})
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
