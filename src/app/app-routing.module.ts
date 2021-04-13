import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFilmComponent } from './components/add-film/add-film.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'film-list', component: FilmListComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-film', component: AddFilmComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
