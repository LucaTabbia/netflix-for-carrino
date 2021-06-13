import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart as faHeartEmpty} from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faEdit= faEdit;
  faHeart= faHeart;
  faHeartEmpty= faHeartEmpty;
  lastFilms: any[]= [];
  bestFilms: any[]= [];
  userId: number= this.userService.loggedUser ? this.userService.loggedUser.id : 0

  constructor(
    private userService: UserService,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getLastFilms();
    this.getBestFilms();
  }


  //get the films that have the highest rating
  getBestFilms(): void{
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        
        let bestVote1: number=0;
        let bestVote2: number=0;
        let bestVote3: number=0;
        let bestVote4: number=0;
        for(let film of films){
          if(film.vote== undefined){
            continue;
          }
          if(film.vote> bestVote1){
            bestVote4= bestVote3;
            bestVote3= bestVote2;
            bestVote2= bestVote1;
            bestVote1= film.vote;
            continue;
          }
          else if(film.vote< bestVote1 && film.vote> bestVote2){
            bestVote4= bestVote3;
            bestVote3= bestVote2;
            bestVote2= film.vote;
            continue;
          }
          else if(film.vote< bestVote2 && film.vote> bestVote3){
            bestVote4= bestVote3;
            bestVote3= film.vote;
            continue;
          }
          else if(film.vote< bestVote3 && film.vote> bestVote4){
            bestVote4= film.vote;
            continue;
          }
          if(film.vote== bestVote1){
            bestVote4= bestVote3;
            bestVote3= bestVote2;
            bestVote2= film.vote;
            continue;
          }
          else if(film.vote== bestVote2){
            bestVote4= bestVote3;
            bestVote3= film.vote;
            continue;
          }
          else if(film.vote== bestVote3){
            bestVote4= film.vote;
            continue;
          }
        }
        let count=0
        for(let film of films){
          if(count==4){
            break;
          }
          if(film.vote== bestVote1 || film.vote== bestVote2 || film.vote== bestVote3 || film.vote== bestVote4){
            film= Object.assign(film, {
              isFavorite: false
            })
            this.bestFilms.push(film);
            count++
          }
        }
      }
    });
  }

// get the films that were inserted in the list most recently
  getLastFilms(): void{
    this.filmService.getFilms().subscribe(films => {
      if(films.length==0){
        alert('there are no films');
      }else{
        let lastDate1: number=new Date("2000-01-01").getTime();
        let lastDate2: number=new Date("2000-01-01").getTime();
        let lastDate3: number=new Date("2000-01-01").getTime();
        let lastDate4: number=new Date("2000-01-01").getTime();
        for(let film of films){
          let filmTime= Date.parse(film.created_at)
          if(filmTime> lastDate1){
            lastDate4= lastDate3;
            lastDate3= lastDate2;
            lastDate2= lastDate1;
            lastDate1= filmTime;
            continue;
          }
          else if(filmTime< lastDate1 && filmTime> lastDate2){
            lastDate4= lastDate3;
            lastDate3= lastDate2;
            lastDate2= filmTime;
            continue;
          }
          else if(filmTime< lastDate2 && filmTime> lastDate3){
            lastDate4= lastDate3;
            lastDate3= filmTime;
            continue;
          }
          else if(filmTime< lastDate3 && filmTime> lastDate4){
            lastDate4= filmTime;
            continue;
          }
          if(filmTime== lastDate1){
            lastDate4= lastDate3;
            lastDate3= lastDate2;
            lastDate2= filmTime;
            continue;
          }
          else if(filmTime== lastDate2){
            lastDate4= lastDate3;
            lastDate3= filmTime;
            continue;
          }
          else if(filmTime== lastDate3){
            lastDate4= filmTime;
            continue;
          }
        }
        let count= 0
        for(let film of films){
          if(count== 4){
            break;
          }
          let filmTime= Date.parse(film.created_at)
          if(filmTime== lastDate1 || filmTime== lastDate2 || filmTime== lastDate3 || filmTime== lastDate4){
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
            this.lastFilms.push(film);
            count++
          }
        }
      }
    });
  }

  
  addToFavorites(id: number, type: string){
    if(this.userService.loggedUser == null){
      alert('You must be logged!');
      return;
    }
    let chosenList;
    if(type=="last"){
      chosenList= this.lastFilms;
    }else{
      chosenList= this.bestFilms;
    }
    if(chosenList.find(x=> x.id== id).isFavorite== true){
      chosenList.find(x=> x.id== id).isFavorite= false; 
    }else{
      chosenList.find(x=> x.id== id).isFavorite= true;
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
