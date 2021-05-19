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
  removeUrl= 'https://netflix.cristiancarrino.com/actor/remove.php';

  httpOption= {
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  }
  httpOptions={
    headers:new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
  })}

  allActors: Actor[]= []


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

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
  addActor(actor:Actor): Observable<Actor>{
    return this.http.post<Actor>(this.createUrl, actor, this.httpOptions);
  }
  editActor(actor:Actor): Observable<any>{
    return this.http.post<any>(this.updateUrl, actor, this.httpOptions);
  }
  removeActor(id:number): Observable<any>{
    return this.http.post<any>(this.removeUrl, id, this.httpOptions);
  }
  selectActor(id: number): void{
    this.getActors()
    for(let actor of this.allActors){
      if(id== actor.id){
        actor.selected= true;
      }
    }
  }
}
