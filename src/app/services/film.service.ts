import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Film } from '../models/film';
import { UserService } from './user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  filmsUrl= 'https://netflix.cristiancarrino.com/film/read.php';
  createUrl= 'https://netflix.cristiancarrino.com/film/create.php'
  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }
  httpOptions={
    headers:new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
  })}
  allFilms: Film[]= []

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.filmsUrl, this.httpOption
      ).pipe(tap(response=> {
        this.allFilms = response;
        console.log(response)
      }),
      catchError(error=>{
        this.allFilms = [];
        return of([])
      }));
  }
  addFilm(film:Film): Observable<Film>{
    return this.http.post<Film>(this.createUrl, film, this.httpOptions);
  }
}
