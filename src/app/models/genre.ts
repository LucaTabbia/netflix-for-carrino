import { Film } from "./film"

export interface Genre{
  id: number;
  name: string;
  created_by: number;
  image_url?: string;
  selected?: boolean;
  films?: Film[];
}
