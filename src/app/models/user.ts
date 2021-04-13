import { Film } from './film';
import { Actor } from './actor';
import { Genre } from './genre';

export interface User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date|null;
  favorite_films: Film[]|null;
  favorite_actors: Actor[]|null;
  favorite_genres: Genre[]|null;
  token: string;
  last_login: Date;
}
