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
	@Output() voteChanged = new EventEmitter<number>();
  
  iconsChoice: IconDefinition[] = [faStarHalf, faStar]
  icons: IconDefinition[] = [];
  faStar= faStar;
  faStarHalf= faStarHalf;
  faStarEmpty= faStarEmpty;
  openChoise= false;
  fullVote:number= 0;

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
		if(this.openChoise== false){
			let icon= event.target as Element;
			this.fullVote= vote;
			this.openChoise= true;
			if(icon.nodeName == "path"){
				if(icon.parentElement!= null){
					if(icon.parentElement.parentElement!= null){
						if(icon.parentElement.parentElement.parentElement!= null){
							if(icon.parentElement.parentElement.parentElement.parentElement!= null){
								if(icon.parentElement.parentElement.parentElement.parentElement.lastElementChild!= null){
									let choiceContainer= icon.parentElement.parentElement.parentElement.parentElement.lastElementChild as HTMLElement;
									choiceContainer.style.display= "flex";
								}
							}
						}
					}
				}
			}else{
				if(icon.parentElement!= null){
					if(icon.parentElement.parentElement!= null){
						if(icon.parentElement.parentElement.parentElement!= null){
							if(icon.parentElement.parentElement.parentElement.lastElementChild!= null){
								let choiceContainer= icon.parentElement.parentElement.parentElement.lastElementChild as HTMLElement;
								choiceContainer.style.display= "flex";
							}
						}
					}
				}
			}
		}else{
			let icon= event.target as Element;
			this.fullVote= 0;
			this.openChoise= false;
			if(icon.nodeName == "path"){
				if(icon.parentElement!= null){
					if(icon.parentElement.parentElement!= null){
						if(icon.parentElement.parentElement.parentElement!= null){
							if(icon.parentElement.parentElement.parentElement.parentElement!= null){
								if(icon.parentElement.parentElement.parentElement.parentElement.lastElementChild!= null){
									let choiceContainer= icon.parentElement.parentElement.parentElement.parentElement.lastElementChild as HTMLElement;
									choiceContainer.style.display= "none";
								}
							}
						}
					}
				}
			}else{
				if(icon.parentElement!= null){
					if(icon.parentElement.parentElement!= null){
						if(icon.parentElement.parentElement.parentElement!= null){
							if(icon.parentElement.parentElement.parentElement.lastElementChild!= null){
								let choiceContainer= icon.parentElement.parentElement.parentElement.lastElementChild as HTMLElement;
								choiceContainer.style.display= "none";
							}
						}
					}
				}
			}
		}
	}

	setFinalVote(vote:number, event: Event){
		event.stopPropagation();
		this.openChoise= false;
		let finalVote= this.fullVote;
		if(vote== 1){
			finalVote -= 0.5;
		}
		if (this.canEdit) {
			this.voteChanged.emit(finalVote);
		}
		let icon= event.target as Element
		if(icon.nodeName == "path"){
			if(icon.parentElement!= null){
				if(icon.parentElement.parentElement!= null){
					if(icon.parentElement.parentElement.parentElement!= null){
						icon.parentElement.parentElement.parentElement.style.display= "none";
					}
				}
			}
		}else{
			if(icon.parentElement!= null){
				if(icon.parentElement.parentElement!= null){
					icon.parentElement.parentElement.style.display= "none";
				}
			}
		}
		
		this.fullVote=0;
	}
}
