import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-localstorage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUrl= 'https://netflix.cristiancarrino.com/user/login.php';
  editUrl= 'http://netflix.cristiancarrino.com/user/edit.php';
  addFilmUrl= 'https://netflix.cristiancarrino.com/user/favorite-films.php';
  addGenreUrl= 'https://netflix.cristiancarrino.com/user/favorite-genres.php';
  addActorUrl= 'https://netflix.cristiancarrino.com/user/favorite-actors.php';

  
  loggedUser: User|null = null;

  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  login(username: string, password: string, rememberMe:boolean): Observable<User|null>{
    return this.http.post<User|null>(this.loginUrl, {username: username, password: password}, this.httpOption
      ).pipe(tap(response=> {
        this.loggedUser = response;
        console.log(this.loggedUser?.favorite_films)
        if(rememberMe){
        this.localStorage.set('loggedUser', response);
        }
        console.log(this.loggedUser?.token)
      }),
      catchError(error=>{
        this.loggedUser = null;
        this.logOut();
        return of(null)
      }));
  }
  getLoggedUser(){
   this.loggedUser= this.localStorage.get('loggedUser');
   return this.loggedUser;
  }
  editLoggedUser(user: User): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.loggedUser ? this.loggedUser.token : ''
    })}
    return this.http.post<any>(this.editUrl, user, httpOptions)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      console.log(error)
      this.logOut();
      return of(false)
    })); 
  }
  addFavoriteFilm(id: string): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.loggedUser ? this.loggedUser.token : ''
    })}
    console.log(this.loggedUser)
    return this.http.post<any>(this.addFilmUrl,{ids: id}, httpOptions)
    .pipe(tap(response=> {
      console.log(response)
    }),
    catchError(error=>{
      this.loggedUser = null;
      console.log(error)
      this.logOut();
      return of(false)
    })); 
  }
  addFavoriteGenre(id: string): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.loggedUser ? this.loggedUser.token : ''
    })}
    return this.http.post<any>(this.addGenreUrl,{ids: id}, httpOptions)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(false)
    })); 
  }
  addFavoriteActor(id: string): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.loggedUser ? this.loggedUser.token : ''
    })}
    return this.http.post<any>(this.addActorUrl,{ids: id}, httpOptions)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(false)
    })); 
  }
  logOut(){
    this.localStorage.remove('loggedUser');
    this.loggedUser= null;
  }
}
