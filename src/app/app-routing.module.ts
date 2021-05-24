import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmListComponent } from './components/films/film-list/film-list.component';
import { AddFilmComponent } from './components/films/add-film/add-film.component';
import { EditFilmComponent } from './components/films/edit-film/edit-film.component';
import { ActorListComponent } from './components/actors/actor-list/actor-list.component';
import { AddActorComponent } from './components/actors/add-actor/add-actor.component';
import { EditActorComponent } from './components/actors/edit-actor/edit-actor.component';
import { GenreListComponent } from './components/genres/genre-list/genre-list.component';
import { AddGenreComponent } from './components/genres/add-genre/add-genre.component';
import { EditGenreComponent } from './components/genres/edit-genre/edit-genre.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FilmViewComponent } from './components/films/film-view/film-view.component';
import { GenreFilmListComponent } from './components/genres/genre-film-list/genre-film-list.component';
import { ActorFilmListComponent } from './components/actors/actor-film-list/actor-film-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'films/film-list', component: FilmListComponent},
  {path: 'films/add-film', component: AddFilmComponent},
  {path: 'films/edit-film/:id', component: EditFilmComponent},
  {path: 'actors/actor-list', component: ActorListComponent},
  {path: 'actors/add-actor', component: AddActorComponent},
  {path: 'actors/edit-actor/:id', component: EditActorComponent},
  {path: 'genres/genre-list', component: GenreListComponent},
  {path: 'genres/add-genre', component: AddGenreComponent},
  {path: 'genres/edit-genre/:id', component: EditGenreComponent},
  {path: 'user-edit', component: UserEditComponent},
  {path: 'films/film-view/:id', component: FilmViewComponent},
  {path: 'genres/genre-film-list/:id', component: GenreFilmListComponent},
  {path: 'actors/actor-film-list/:id', component: ActorFilmListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
