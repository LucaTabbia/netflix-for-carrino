import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';
import { faHeart, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  faList= faList;
  faPlus=faPlus;
  faEdit= faEdit;
  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;
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
        if(this.userService.loggedUser?.favorite_genres!= undefined){
          let userGenres= this.userService.loggedUser?.favorite_genres.toString().split(",").map(function(id){
            return parseInt(id);
          });
          for(let genre of genres){
            if(userGenres!= undefined){
              if(userGenres.find(x=> x== genre.id) != undefined){
                genre= Object.assign(genre, {
                  isFavorite: true
                })
              }else{
                genre= Object.assign(genre, {
                  isFavorite: false
                })
              }
            }else{
              genre= Object.assign(genre, {
                isFavorite: false
              })
            }
          }
        }else{
          for(let genre of genres){
            genre= Object.assign(genre, {
              isFavorite: false
            })
          }
        }
        this.genres = genres;
      }
    });
  }


  //add the genre to the user favorites list
  addToFavorites(id: number){
    if(this.userService.loggedUser == null){
      alert('You must be logged!');
      return;
    }
    if(this.genres.find(x=> x.id== id).isFavorite== true){
      this.genres.find(x=> x.id== id).isFavorite= false; 
    }else{
      this.genres.find(x=> x.id== id).isFavorite= true;
    }
    if(this.userService.loggedUser != null){
      if(this.userService.loggedUser?.favorite_genres!=undefined){
        let genres = this.userService.loggedUser?.favorite_genres.toString().split(",").map(function(id){
          return parseInt(id);
        });
        if(genres.find(x=> x== id)== undefined){
          genres.push(id);
          this.userService.loggedUser.favorite_genres.push(id);
          if(genres!= undefined){
            this.userService.addFavoriteGenre(genres.toString()).subscribe();
          }
        }else{
          if(genres!= undefined){
            this.userService.loggedUser.favorite_genres = genres.filter(x=> x!= id);
            this.userService.addFavoriteGenre(this.userService.loggedUser.favorite_genres.toString()).subscribe();
          }
        }
      }else{
        this.userService.loggedUser.favorite_genres= [];
        this.userService.loggedUser.favorite_genres.push(id);
        this.userService.addFavoriteGenre(this.userService.loggedUser.favorite_genres.toString()).subscribe();
      }
    }   
  }
}
