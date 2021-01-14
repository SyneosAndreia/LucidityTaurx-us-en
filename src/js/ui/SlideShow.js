import { TweenMax, Power4 } from 'gsap';


class SlideShow {
	

	constructor (el, slides) {

		if (!slides) {
			console.log('Error: Need to pass an array or HTMLCollection of slides(DOM elements)');
			return;
		}

		this.el = el;
		this.slides = slides;
		this.slides_length = this.slides.length;
		this.slide_index = 0;

		this.initialized = false;
	}


	init () {

		if (this.initialized) return;

		this.initialized = true;

		this.slides = this.convertHTMLCollectionToArray(this.slides);
		this.removeSlidesFromParent(this.slides);
		this.addComponentElements();

		// prep the first slide container by adding the first slide
		this.slide_container_current = this.slide_container_a;
		this.slide_container_a.appendChild(this.slides[this.slide_index]);
		// TweenMax.set(this.slide_container_a, {autoAlpha:0});
	}


	addComponentElements () {

		// The main components consist of the mask/viewable area and 
		// two containers for transitioning the slides.
		this.container_mask = document.createElement('div');
		this.container_mask.className = 'slides-mask';
		this.container_mask.style.position = 'absolute';
		this.container_mask.style.width = '100%';
		this.container_mask.style.height = '100%';
		this.container_mask.style.overflow = 'hidden';
		
		this.slide_container_a = document.createElement('div');
		this.slide_container_a.className = 'slide-container container-a';
		this.slide_container_a.style.position = 'absolute';
		this.slide_container_a.style.width = '100%';
		this.slide_container_a.style.height = '100%';

		this.slide_container_b = document.createElement('div');
		this.slide_container_b.className = 'slide-container container-b';
		this.slide_container_b.style.position = 'absolute';
		this.slide_container_b.style.width = '100%';
		this.slide_container_b.style.height = '100%';
		this.slide_container_b.style.display = 'none';

		// add to the parent element
		this.container_mask.appendChild(this.slide_container_a);
		this.container_mask.appendChild(this.slide_container_b);
		this.el.appendChild(this.container_mask);
	}


	// Need to convert HTMLCollections to regular arrays, since they automatically 
	// update themselves when list items are remove/added to the DOM. Array will
	// only reference the element regardless of it's status in the DOM.

	convertHTMLCollectionToArray (collection) {

		let slides = [];

		for (let i = 0; i < collection.length; i++) {
			slides.push(collection[i]);
		}

		return slides;
	}

	
	// The idea is that the slides are existing elements in the DOM that get 
	// referenced, and then gutted from their original location. This component
	// will now manage how the slides are viewed.
	
	removeSlidesFromParent (slides) {

		let slide;	

		for (let i = 0; i < slides.length; i++) {

			slide = slides[i];

			if (slide && slide.parentElement) {
				slide.parentElement.removeChild(slide);
			}
		}
	}


	show () {

		if (this.active) return;
		this.active = true;

		TweenMax.to(this.el, 1, {autoAlpha:1, ease:Power4.easeInOut});
	}


	hide () {

		if (!this.active) return;
		this.active = false;

		TweenMax.to(this.el, 1, {autoAlpha:0, ease:Power4.easeInOut});
	}


	next () {

		this.slide_index++;

		if (this.slide_index > this.max_index) {
			this.slide_index = 0;
		}

		this.swapSlides(this.slides[this.slide_index], -1);
	}


	previous () {

		this.slide_index--;

		if (this.slide_index < 0) {
			this.slide_index = this.max_index;
		}

		this.swapSlides(this.slides[this.slide_index], 1);
	}


	swapSlides (slide, direction) {

		// alternate slide containers
		let slide_container_next = (this.slide_container_current == this.slide_container_a) ? this.slide_container_b : this.slide_container_a;
		let slide_container_last = this.slide_container_current;

		let x_start = (direction > 0) ? '-100%' : '100%';
		let x_end = (direction > 0) ? '100%' : '-100%';

		//  animate out
		TweenMax.to(slide_container_last, 1, {x:x_end, ease:Power4.easeInOut, onComplete:()=>{

			// hide and remove slide element from container
			TweenMax.set(slide_container_last, {display:'none'});
			slide_container_last.removeChild(slide_container_last.firstChild);
		}});

		// add new slide to the slide container and then animate in
		slide_container_next.appendChild(slide);
		
		TweenMax.fromTo(slide_container_next, 1, {display:'block', x:x_start}, {x:'0%', ease:Power4.easeInOut});
		
	}


	resize (w, h) {

		this.width = w;
		this.height = h;
	}
}


export default SlideShow;