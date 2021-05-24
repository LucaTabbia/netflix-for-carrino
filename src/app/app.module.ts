import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxLocalStorageModule} from 'ngx-localstorage';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    FilmListComponent,
    AddFilmComponent,
    EditFilmComponent,
    ActorListComponent,
    AddActorComponent,
    EditActorComponent,
    GenreListComponent,
    AddGenreComponent,
    EditGenreComponent,
    UserEditComponent,
    FilmViewComponent,
    GenreFilmListComponent,
    ActorFilmListComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLocalStorageModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
