import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit {

  actors: any[]= [];
  constructor(
    private actorService: ActorService,
  ) { }

  ngOnInit(): void {
    this.getActors();
  }


  getActors(): void{
    this.actorService.getActors().subscribe(actors => {
      if(actors.length==0){
        alert('there are no actors');
      }else{
        this.actors = actors;
      }
    });
  }
}
