import { TweenMax, Power4 } from 'gsap';
import EventEmitter from 'events';

class IntroSection extends EventEmitter {
	

	constructor () {

		super();

		this.id = 'intro';
		this.el = document.getElementsByClassName('section intro')[0];

		this.active_section = false;		
	}


	init () {

		
	}


	onScroll (scrollPosition) {

		const TARGET_SCREEN = 0.33;

		// vertical line/y-position on the screen for sections to determine if they are overlapping
		let screen_target_y = this.upperBoundary - (this.screenHeight * TARGET_SCREEN);


		// is the screen target within an elements upper and lower boundaries?
		if (scrollPosition > screen_target_y && scrollPosition < screen_target_y + this.height) {

			// emit only once per section activation
			if (!this.active_section) {
				this.emit('SECTION_ACTIVE', this.id);
				this.active_section = true;
			}

		} else {

			// reset
			this.active_section = false;
		}
	}



	resize (w, h, scrollPosition) {

		this.width = w;
		this.screenHeight = h;
		this.rect = this.el.getBoundingClientRect();
		this.height = this.rect.height;
		this.upperBoundary = this.el.offsetTop;
		this.lowerBoundary = this.el.offsetTop + this.height;

		this.onScroll(scrollPosition);

	}
}


export default IntroSection;