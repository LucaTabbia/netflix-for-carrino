import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genres: any[]= [];
  userId: number= this.userService.loggedUser ? this.userService.loggedUser.id : 0;

  constructor(
    private userService: UserService,
    private genreService: GenreService,
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }


  //get the list of genres
  getGenres(): void{
    this.genreService.getGenres().subscribe(genres => {
      if(genres.length==0){
        alert('there are no genres');
      }else{
        this.genres = genres;
      }
    });
  }


  //add the genre to the user favorites list
  addToFavorites(id: number){
    if(this.userService.loggedUser?.favorite_genres!= undefined){
      let favoriteGenreList= this.userService.loggedUser?.favorite_genres.toString()+ ","+id;
      this.userService.addFavoriteGenre(favoriteGenreList).subscribe()
    }
    else{
      let favoriteGenreList= id.toString();
      this.userService.addFavoriteGenre(favoriteGenreList).subscribe()
    }
  }
}
