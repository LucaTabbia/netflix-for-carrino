import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Actor } from '../models/actor';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actorsUrl= 'https://netflix.cristiancarrino.com/actor/read.php';
  createUrl= 'https://netflix.cristiancarrino.com/actor/create.php';
  updateUrl= 'https://netflix.cristiancarrino.com/actor/update.php';
  removeUrl= 'https://netflix.cristiancarrino.com/actor/delete.php';

  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }

  allActors: Actor[]= []


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  //get the list of actors
  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.actorsUrl, this.httpOption
      ).pipe(tap(response=> {
        this.allActors = response;
      }),
      catchError(error=>{
        this.allActors = [];
        return of([])
      }));
  }


  //add an actor to the list
  addActor(actor:Actor): Observable<Actor>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<Actor>(this.createUrl, actor, httpOptions);
  }


  //edit an actor
  editActor(actor:Actor): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.updateUrl, actor, httpOptions);
  }


  //remove the actor
  removeActor(id:number): Observable<any>{
    let httpOptions={
      headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
    })}
    return this.http.post<any>(this.removeUrl, {id: id}, httpOptions);
  }
}
