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
  logOut(){
  this.localStorage.remove('loggedUser');
  this.loggedUser= null;
  }
}
