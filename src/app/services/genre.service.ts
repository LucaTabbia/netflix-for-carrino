import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genresUrl= 'https://netflix.cristiancarrino.com/genre/read.php';
  createUrl= 'https://netflix.cristiancarrino.com/genre/create.php';
  updateUrl= 'https://netflix.cristiancarrino.com/genre/update.php';
  removeUrl= 'https://netflix.cristiancarrino.com/genre/delete.php';
  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }

  allGenres: Genre[]= []

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  //get the genre list
  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.genresUrl, this.httpOption
      ).pipe(tap(response=> {
        this.allGenres = response;
      }),
      catchError(error=>{
        this.allGenres = [];
        return of([])
      }));
  }


  //add a genre
  addGenre(genre:Genre): Observable<Genre>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<Genre>(this.createUrl, genre, httpOptions);
  }


  //edit a genre
  editGenre(genre: Genre): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.updateUrl, genre, httpOptions);
  }


  //remove a genre
  removeGenre(id: number): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.removeUrl, {id: id}, httpOptions);
  }
}
