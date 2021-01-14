import { TweenMax, Power4 } from 'gsap';
import EventEmitter from 'events';
import $ from 'jquery';

class PurposeSection extends EventEmitter {


	constructor () {

		super();

		this.id = 'purpose';
		this.el = document.getElementsByClassName('section purpose')[0];
		this.active_section = false;
		this.scroll_tween;
	}


	init () {
		let learnMoreButton = document.getElementById("learn-more");
		learnMoreButton.onclick = function scrollToFaq() {
			let faq_section = $('#faq');
			let ms_element_top_padding;
			// subtracts 25 to account for height of arrow graphic at the bottom of the section
			ms_element_top_padding = parseInt(faq_section.css("padding-top")) - 25;

			// finds the scroll height of the section and includes its calculated top padding
			let ms_target_element_position = faq_section.offset().top - ms_element_top_padding;

			window.scrollTo(0, ms_target_element_position);

		}
		$('#phaseTitle1').on('click', function() {
			$('#phaseTitle1').addClass('active');
			$('#phaseTitle2').removeClass('active');
			$('#phaseTitle3').removeClass('active');
			$('#phaseText1').addClass('active');
			$('#phaseText2').removeClass('active');
			$('#phaseText3').removeClass('active');
		});
		$('#phaseTitle2').on('click', function() {
			$('#phaseTitle2').addClass('active');
			$('#phaseTitle1').removeClass('active');
			$('#phaseTitle3').removeClass('active');
			$('#phaseText2').addClass('active');
			$('#phaseText1').removeClass('active');
			$('#phaseText3').removeClass('active');
		});
		$('#phaseTitle3').on('click', function() {
			$('#phaseTitle3').addClass('active');
			$('#phaseTitle2').removeClass('active');
			$('#phaseTitle1').removeClass('active');
			$('#phaseText3').addClass('active');
			$('#phaseText2').removeClass('active');
			$('#phaseText1').removeClass('active');
		});
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


export default PurposeSection;
