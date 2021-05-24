import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFilmListComponent } from './genre-film-list.component';

describe('GenreFilmListComponent', () => {
  let component: GenreFilmListComponent;
  let fixture: ComponentFixture<GenreFilmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreFilmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreFilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
