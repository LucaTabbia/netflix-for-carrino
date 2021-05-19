import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { LocalStorageService } from 'ngx-localstorage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUrl= 'https://netflix.cristiancarrino.com/user/login.php';
  updateUrl= 'https://netflix.cristiancarrino.com/user/update.php';
  addFilmUrl= 'https://netflix.cristiancarrino.com/user/favorite-films.php';
  addGenreUrl= 'https://netflix.cristiancarrino.com/user/favorite-genres.php';
  addActorUrl= 'https://netflix.cristiancarrino.com/user/favorite-actors.php';
  
  loggedUser: User|null = null;

  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }
  httpOptionUpdate= {
    headers:new HttpHeaders({'Content-Type': 'application/json'}),
    Authorization: this.loggedUser?.token
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  login(username: string, password: string, rememberMe:boolean): Observable<User|null>{
    return this.http.post<User|null>(this.loginUrl, {username: username, password: password}, this.httpOption
      ).pipe(tap(response=> {
        this.loggedUser = response;
        if(rememberMe){
        this.localStorage.set('loggedUser', response);
        }
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
  editLoggedUser(user: User): Observable<User|null>{
    return this.http.post<User|null>(this.loginUrl, user, this.httpOptionUpdate)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(null)
    }));
  }
  addFavoriteFilm(id: number): Observable<User|null>{
    return this.http.post<User|null>(this.addFilmUrl, id, this.httpOptionUpdate)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(null)
    })); 
  }
  addFavoriteGenre(id: number): Observable<User|null>{
    return this.http.post<User|null>(this.addGenreUrl, id, this.httpOptionUpdate)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(null)
    })); 
  }
  addFavoriteActor(id: number): Observable<User|null>{
    return this.http.post<User|null>(this.addActorUrl, id, this.httpOptionUpdate)
    .pipe(tap(response=> {
      this.loggedUser = response;
    }),
    catchError(error=>{
      this.loggedUser = null;
      this.logOut();
      return of(null)
    })); 
  }
  logOut(){
    this.localStorage.remove('loggedUser');
    this.loggedUser= null;
  }
}
