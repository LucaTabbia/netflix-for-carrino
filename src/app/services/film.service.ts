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

  allFilms: Film[]= [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  //get the film list
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


  //add a film
  addFilm(film:Film): Observable<Film>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<Film>(this.createUrl, film, httpOptions);
  }


  //edit the film
  editFilm(film: Film): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.updateUrl, film, httpOptions)
	}


  //remove the film
  removeFilm(id: number): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.removeUrl,{ id: id }, httpOptions)
  }
}
