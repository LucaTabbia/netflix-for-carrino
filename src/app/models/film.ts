import { Time } from '@angular/common';
import {Genre} from './genre';
import {Actor} from './actor';

export interface Film {
  id: number;
  title: string;
  description: string;
  plot: string;
  director: string;
  duration: Time;
  vote?: number;
  release_year: number;
  cover_url?: string;
  tags: string;
  created_by: number;
  created_at: string;
  actors: Actor[];
  genres: Genre[];
  votes: number[];
}
