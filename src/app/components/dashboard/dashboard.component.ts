import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lastFilms: any[]= [];
  bestFilms: any[]= [];

  constructor(
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
            this.lastFilms.push(film);
            count++
          }
        }
      }
    });
  }

}
