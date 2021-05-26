import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.scss']
})
export class EditActorComponent implements OnInit {

  faPencil= faPencilAlt;
  faTrash= faTrashAlt;
  faBack= faArrowLeft;
  actor: Actor={
    id: 0,
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: new Date(),
    films: [],
    created_by: 0,
  }
    filmsToAdd: any[]= [];
    films: any[]= [];
    userId: number=0;
  
    constructor(
      private filmService: FilmService,
      private actorService: ActorService,
      private router: Router,
      private userService: UserService,
      private actRoute: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.getActorToEdit();
      this.getFilms()
    }
  
  //get the list of films and assign them a selected value based on the actor film list
    getFilms(){
      this.filmService.getFilms().subscribe(films => {
        if(films.length==0){
          alert('there are no films');
        }else{
          this.films= films
          for(let film of this.films){
            film= Object.assign(film, {
              selected: false
            })
          }
          for(let filmOfList of this.films){
            for(let actor of filmOfList.actors){
              if(this.actor.id== actor.id){
                filmOfList.selected= true
                this.filmsToAdd.push(filmOfList)
                break;
              }
            }
          }
        }
      });
    }
    //get the actor that needs to be edited
    getActorToEdit(){
      if(this.userService.loggedUser==null){
        alert('You must be logged!')
        this.router.navigate(['/login'])
      }else{
        this.userId= this.userService.loggedUser.id;
        this.actorService.getActors().subscribe(actors => {
          if(actors.length==0){
            alert('there are no actors');
          }else{
            for(let actor of actors){
              if(actor.id== this.actRoute.snapshot.params.id && actor.created_by == this.userId){
                this.actor= actor;
              }
              if(actor.id== this.actRoute.snapshot.params.id && actor.created_by != this.userId){
                alert("You haven't the permits to edit this actor")
                this.router.navigate(['actors/actor-list'])
              }
            }
          }
        });
      }
    }
    //delete the actor from the list
    remove(){
      this.removeActorFromFilm()
      this.actorService.removeActor(this.actor.id).subscribe(response => {
				if (response.success) {
					this.router.navigate(['actors/actor-list']);
				}
			})
    }
    //edit the actor
    edit(){
      for(let film of this.filmsToAdd){
        delete(film.selected)
      }
      //commented because the actor db don't contains any films col
//      this.actor.films= this.filmsToAdd;
      this.editFilm()
      this.actorService.editActor(this.actor).subscribe(response => {
				if (response.success) {
					this.router.navigate(['actors/actor-list']);
				}
			})
    }
    //add the film to the actor film list based on click
    addFilm(id: number){
      for(let filmToAdd of this.filmsToAdd){
        if(filmToAdd.id== id){
          filmToAdd.selected= false;
          this.filmsToAdd= this.filmsToAdd.filter(film=> film.id!= filmToAdd.id);
          return;
        }
      }
      for(let film of this.films){
        if(film.id== id){
          film.selected= true;
          this.filmsToAdd.push(film)
          return;
        }
      }
    }
    //edit the films in the actor film list if they're made by the same user that is editing
    editFilm(){
      let inserted= false;
      for(let filmOfList of this.films){
        if(this.actor.films!=undefined){
          for(let film of this.actor.films){
            if(filmOfList.id= film.id){
              for(let actor of filmOfList.actors){
                if(actor.id== this.actor.id){
                  inserted= true;
                }
              }
              if(inserted==false && filmOfList.created_by == this.userId){
                filmOfList.actors.push(this.actor)
                this.filmService.editFilm(filmOfList).subscribe()
              }
            }
          }
        }
      }
    }
    

    //remove actor from film when actor is deleted
    removeActorFromFilm(){
      let inserted= false;
      for(let filmOfList of this.films){
        for(let actor of filmOfList.actors){
          if(actor.id== this.actor.id){
              inserted= true;
          }
        }
        if(inserted==true && filmOfList.created_by == this.userId){
          filmOfList.actors= filmOfList.actors.filter((actor: { id: number; })=> actor.id!= this.actor.id)
          this.filmService.editFilm(filmOfList).subscribe()
        }
      }
    }
  }

