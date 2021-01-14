import { TweenMax, Power4 } from 'gsap';
import $ from 'jquery';

// needs to be the same as in the css media query.
const MOBILE_BREAKPOINT = 830;

var lerp_percent;

// need to check browser to pick proper scrolling function later
var isIE = /*@cc_on!@*/false || !!document.documentMode /* Internet Explorer 6-11 */
var isEdge = !isIE && !!window.StyleMedia; /* Edge 20+ */

class NavigationSection {


	constructor () {


		
		

		this.el = document.getElementsByClassName('section navigation')[0];
		this.tab_background_el = this.el.getElementsByClassName('mobile-tab-background')[0];

		this.mobile_menu_content_el = this.el.getElementsByClassName('mobile-menu-content')[0];
			this.mobile_menu_bg_el = this.el.getElementsByClassName('mobile-menu-bg')[0];

			this.mobile_menu_tab = this.el.getElementsByClassName('mobile-menu-tab')[0];
				this.hamburger_icon_el = this.el.getElementsByClassName('hamburger-icon')[0];
				this.hamburger_bar_top = this.hamburger_icon_el.getElementsByClassName('hamburger-top')[0];
				this.hamburger_bar_middle = this.hamburger_icon_el.getElementsByClassName('hamburger-middle')[0];
				this.cross_bar_middle = this.hamburger_icon_el.getElementsByClassName('cross-middle')[0];
				this.hamburger_bar_bottom = this.hamburger_icon_el.getElementsByClassName('hamburger-bottom')[0];


		this.mobile_menu_active = false;
		this.mobile_menu_animating = false;

		this.scroll_tween;
	}

	outerWidth(el) {
		var width = el.offsetWidth;
		var style = getComputedStyle(el);
		width += parseInt(style.marginLeft) + parseInt(style.marginRight);
		return width;
	}


	init () {

		

		this.mobile_menu_tab.addEventListener('click', this.on_MOBILE_MENU_SELECT.bind(this));

		// need class context reference for event function, since event function context needs to
		// be the triggered element.
		var _this_ = this;

		// get all the elements assigned as internal navigation links for desktop and assign event listeners
		let internal_links = document.querySelectorAll('[data-type="nav-internal-link"]');
		for (var i = 0; i < internal_links.length; i++) {
			internal_links[i].addEventListener('click', function (e) {
				_this_.on_INTERNAL_LINK_SELECTED(this.dataset.linkId);
			});
		}

		// get all the elements assigned as internal navigation links for mobile and assign event listeners
		let internal_links_mobile = document.querySelectorAll('[data-type="nav-internal-link-mobile"]');
		for (var i = 0; i < internal_links_mobile.length; i++) {
			internal_links_mobile[i].addEventListener('click', function (e) {
				_this_.on_INTERNAL_LINK_SELECTED(this.dataset.linkId);
				_this_.toggleMobileMenu();
			});
		}

		// NOTE: Temp
		this.mobile_menu_links = this.mobile_menu_content_el.getElementsByTagName('li');


		// this.location_select_el = this.el.getElementsByClassName('location-select')[0];
		// this.qualify_button_el = this.el.getElementsByClassName('nav-qualify-button-container')[0];
		// this.butt_wrap_el = this.el.getElementsByClassName('butt-wrap')[0];
	
		// this.lng_width = this.outerWidth(this.location_select_el);
		// this.qual_width = this.outerWidth(this.qualify_button_el);
		// this.butt_wrap_el.style.width = this.lng_width + this.qual_width + "px";
		// this.butt_wrap_el.style.marginLeft = "-" + parseInt(this.lng_width + this.qual_width) + "px";
		
	}


	on_INTERNAL_LINK_SELECTED (link_id) {
		this.scrollToSection(link_id);
	}


	on_MOBILE_MENU_SELECT () {

		this.toggleMobileMenu();
	}


	setActiveSection (section) {

		// desktop
		let linkToActivate = document.querySelectorAll('[data-link-id="' + section + '"]')[0];

		let bar = linkToActivate.getElementsByClassName('underline-bar')[0];

		if (this.last_active_link_bar) {
			TweenMax.fromTo(this.last_active_link_bar, 0.5, {transformOrigin:'100% 0%'}, {scaleX:0, ease:Power4.easeInOut});
		}

		TweenMax.fromTo(bar, 0.5, {transformOrigin:'0% 0%'}, {scaleX:1, ease:Power4.easeInOut});

		this.last_active_link_bar = bar;


		// mobile

	}


	animateHamburgerIn () {

		TweenMax.to(this.hamburger_icon_el, 0.25, {rotation:0, scale:1, delay:0.1, ease:Power4.easeOut});
		TweenMax.to(this.cross_bar_middle, 0.25, {scaleX:0, rotation:0, autoAlpha:1, delay:0, ease:Power4.easeInOut});

		TweenMax.to(this.hamburger_bar_top, 0.25, {scaleX:0.4, x:-12, y:8,  ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_middle, 0.25, {scaleX:0.4, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_bottom, 0.25, {scaleX:0.4, x:12, y:-8,  ease:Power4.easeInOut});

		TweenMax.to(this.hamburger_bar_top, 0.25, {scaleX:1, x:0, y:0, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_middle, 0.25, {scaleX:1, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_bottom, 0.25, {scaleX:1, x:0, y:0, ease:Power4.easeInOut});
	}

	animateHamburgerOut () {

		TweenMax.set(this.cross_bar_middle, {autoAlpha:1, scaleX:0, rotation:90});

		TweenMax.to(this.hamburger_icon_el, 0.3, {rotation:135, scale:1, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_top, 0.25, {scaleX:0.4, x:-12, y:8, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_middle, 0.25, {scaleX:0.4, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_bottom, 0.25, {scaleX:0.4, x:12, y:-8, ease:Power4.easeInOut});

		let delay = 0.1;
		TweenMax.to(this.hamburger_bar_top, 0.25, {y:14, x:0, delay:delay, ease:Power4.easeInOut});
		TweenMax.to(this.cross_bar_middle, 0.25, {scaleX:1, delay:delay, ease:Power4.easeInOut});
		TweenMax.to(this.hamburger_bar_bottom, 0.25, {y:-14, x:0, delay:delay, ease:Power4.easeInOut});
	}


	toggleMobileMenu () {

		if (this.mobile_menu_animating) return;

		if (this.mobile_menu_active) {

			this.mobile_menu_animating = true;
			this.mobile_menu_active = false;
			this.animateHamburgerIn();
			this.closeMobileMenu(() => {
				this.mobile_menu_content_el.style.display = 'none';
				this.mobile_menu_animating = false;
			});

		} else {

			this.mobile_menu_animating = true;
			this.mobile_menu_content_el.style.display = 'block';
			this.mobile_menu_active = true;
			this.animateHamburgerOut();
			this.openMobileMenu(() => {
				this.mobile_menu_animating = false;
			});
		}
	}


	openMobileMenu (callback) {

		TweenMax.to(this.tab_background_el, 0.25, {scaleY:1, ease:Power4.easeInOut});
		TweenMax.to(this.mobile_menu_bg_el, 0.25, {scaleY:1, ease:Power4.easeInOut});

		let delay = 0.25;
		for (var i = 0; i < this.mobile_menu_links.length; i++) {
			TweenMax.fromTo(this.mobile_menu_links[i], 0.25, {x:0, y:15, autoAlpha:0}, {y:0, autoAlpha:1, delay:delay, ease:Power4.easeInOut});
			delay += 0.1;
		}

		TweenMax.delayedCall(delay, callback);
	}


	closeMobileMenu (callback) {


		let delay = 0.1;

		TweenMax.to(this.tab_background_el, 0.3, {scaleY:0, delay:delay, ease:Power4.easeInOut});

		for (var i = this.mobile_menu_links.length-1; i >= 0; i--) {
			TweenMax.to(this.mobile_menu_links[i], 0.3, {x:-10, autoAlpha:0, delay:0, ease:Power4.easeInOut});
		}

		TweenMax.to(this.mobile_menu_bg_el, 0.3, {scaleY:0, ease:Power4.easeInOut, delay:delay, onComplete:callback});
	}


	scrollToSection (link_id) {
		// two different scroll functions to ensure browser support
		// QC Fix for IE/Edge and mobile browsers using Jquery variable and cross-browser supported methods
		if (isIE || isEdge || typeof window.orientation !== 'undefined') {
			// initialize jQuery element variables
			let ms_link_element = $('#' + link_id);
			let ms_element_top_padding;

			if (link_id === 'intro') {
				// accounts for the intro section putting its padding on its title element and not the section
				ms_element_top_padding = parseInt($('#intro-title').css("padding-top"));
			} else {
				// subtracts 25 to account for height of arrow graphic at the bottom of each section
				ms_element_top_padding = parseInt(ms_link_element.css("padding-top")) - 25;
			}
			// finds the scroll height of the section and includes its calculated top padding
			let ms_target_element_position = ms_link_element.offset().top - ms_element_top_padding;

			window.scrollTo(0, ms_target_element_position);

		} else {
			// this is the animated scrolling function for non-IE browsers
			let link_element = document.getElementById(link_id);

			// account for the margin reserved for the navigation menu
			let target_element_position = link_element.getBoundingClientRect().y - this.height;

			// stop current tween if it is still animating
			if (this.scroll_tween && this.scroll_tween.progress < 1) this.scroll_tween.kill();

			// need to do tween manually, since the value needs to be entered as a function argument of window.scrollBy()
			var scroll_obj = {tween_location:0};
			var last_tween_position = 0;
			// animate to target element position
			this.scroll_tween = TweenMax.to(scroll_obj, 0.5, { tween_location:target_element_position, ease:Power4.easeInOut, onUpdate:()=>{

				// Define how much -/+ growth since the last increment - then store the current
				// increment position to compare during the next iteration. Using Math.ceil to
				// get rid of the sub-pixel confusion that some browsers experience.
				let increment = Math.ceil(scroll_obj.tween_location - last_tween_position);
				last_tween_position = scroll_obj.tween_location;

				// let the DOM handle the rest
					window.scrollBy(0, increment);

			}});
		}
	}


	resize (w, h, scrollPosition) {

		this.width = w;
		this.height = this.el.getBoundingClientRect().height;

		this.mobile_mode = (this.width <= MOBILE_BREAKPOINT) ? true : false;

		// close mobile menu if it's open and user enters desktop mode
		if (!this.mobile_mode && this.mobile_menu_active) {
			this.toggleMobileMenu();
		}
	}
}


export default NavigationSection;
