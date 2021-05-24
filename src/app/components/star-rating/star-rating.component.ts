import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { faStar, faStarHalf, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const starsTotal = 5;

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnChanges {
  @Input() vote: number = 0;
	@Input() canEdit: boolean = false;
	@Output() voteChanged = new EventEmitter();
  
  
  icons: IconDefinition[] = [];
  faStar= faStar;
  faStarHalf= faStarHalf;
  faStarEmpty= faStarEmpty;

  constructor() { }

  ngOnChanges(): void {
		this.icons = [];
		for (var i = 1; i <= starsTotal; i++) {
			if (this.vote >= i) {
				this.icons.push(this.faStar);
			} else if (this.vote >= (i - 0.5)) {
				this.icons.push(this.faStarHalf);
			} else {
				this.icons.push(this.faStarEmpty);
			}
		}
	}

	setVote(vote: number, event: Event) {
		event.stopPropagation();

		if (this.canEdit) {
			this.voteChanged.emit(vote);
		}
	}
}
