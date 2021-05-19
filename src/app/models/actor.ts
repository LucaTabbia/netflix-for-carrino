import { Film } from "./film"

export interface Actor{
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  created_by: number;
  photo_url?: string;
  selected?: boolean;
  films?: Film[];
}
