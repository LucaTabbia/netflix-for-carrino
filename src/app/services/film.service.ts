import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Film } from '../models/film';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  filmsUrl= 'https://netflix.cristiancarrino.com/film/read.php';
  createUrl= 'https://netflix.cristiancarrino.com/film/create.php';
  updateUrl= 'https://netflix.cristiancarrino.com/film/update.php';
  removeUrl= 'https://netflix.cristiancarrino.com/film/delete.php';

  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }
  httpOptions={
    headers:new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
  })}
  allFilms: Film[]= [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.filmsUrl, this.httpOption
      ).pipe(tap(response=> {
        this.allFilms = response;
      }),
      catchError(error=>{
        this.allFilms = [];
        return of([])
      }));
  }
  addFilm(film:Film): Observable<Film>{
    return this.http.post<Film>(this.createUrl, film, this.httpOptions);
  }
  voteFilm(id: number, vote: number): void{
    this.getFilms()
    for(let film of this.allFilms){
      if(id== film.id){
        film.votes.push(vote)
        this.editFilm(film);
      }
    }
  }
  editFilm(film: Film): Observable<any>{
    return this.http.post<any>(this.updateUrl, film, this.httpOptions)
	}
  removeFilm(id: number): Observable<any>{
    return this.http.post<any>(this.removeUrl,{ id: id }, this.httpOptions)
  }
}
