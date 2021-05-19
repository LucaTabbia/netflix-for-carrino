import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genres: any[]= [];
  constructor(
    private genreService: GenreService,
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void{
    this.genreService.getGenres().subscribe(genres => {
      if(genres.length==0){
        alert('there are no genres');
      }else{
        this.genres = genres;
      }
    });
  }
}
