import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorFilmListComponent } from './actor-film-list.component';

describe('ActorFilmListComponent', () => {
  let component: ActorFilmListComponent;
  let fixture: ComponentFixture<ActorFilmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorFilmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorFilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
