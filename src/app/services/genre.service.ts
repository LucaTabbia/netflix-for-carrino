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
  httpOptions={
    headers:new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
  })}

  allGenres: Genre[]= []

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.genresUrl, this.httpOption
      ).pipe(tap(response=> {
        this.allGenres = response;
        console.log(response)
      }),
      catchError(error=>{
        this.allGenres = [];
        return of([])
      }));
  }
  addGenre(genre:Genre): Observable<Genre>{
    return this.http.post<Genre>(this.createUrl, genre, this.httpOptions);
  }
  editGenre(genre: Genre): Observable<Genre>{
    return this.http.post<Genre>(this.updateUrl, genre, this.httpOptions);
  }
  removeGenre(id: number): Observable<Genre>{
    return this.http.post<Genre>(this.removeUrl, id, this.httpOptions);
  }
  selectGenre(id: number): void{
    this.getGenres()
    for(let genre of this.allGenres){
      if(id== genre.id){
        genre.selected= true;
      }
    }
  }
}
