import EventEmitter from 'events';
import { Power4, TweenMax } from 'gsap';

import GoogleMaps from '../ui/GoogleMaps';

var list_view_partial = require('../../views/partials/list-view.mustache');
var LocationData = require('../../assets/data/approvedLocations.json');

var MARKER_TEST_DATA = LocationData;

// var lerp_percent;

class LocationsSection extends EventEmitter {
  constructor() {
    super();

    this.id = 'locations';
    this.el = document.getElementsByClassName('section locations')[0];
    this.active_section = false;

    // map
    this.map_el = this.el.getElementsByClassName('g-map')[0];
    this.googleMaps = new GoogleMaps(this.map_el);

    // toggle
    this.toggle_background_el = this.el.getElementsByClassName('button-background')[0];
    this.toggle_map_button_el = this.el.getElementsByClassName('button map')[0];
    this.toggle_list_button_el = this.el.getElementsByClassName('button list')[0];

    this.zipcode_search_button_el = document.getElementById('zipcodeSearchSubmit');

    // list view mask container and it's child content holder
    this.list_view_mask_el = this.el.getElementsByClassName('list-view-mask')[0];
    this.list_view_content_el = this.el.getElementsByClassName('list-view')[0];
  }

  init() {
    // map - TODO: Load actual json
    this.googleMaps.on('GEO_LOCATION_OBTAINED', this.on_GEO_LOCATION_OBTAINED.bind(this));
    this.googleMaps.on('GEO_LOCATION_UNAVAILABLE', this.on_GEO_LOCATION_UNAVAILABLE.bind(this));
    this.googleMaps.on('MARKER_DISTANCE_ORDER_CHANGED', this.on_MARKER_DISTANCE_ORDER_CHANGED.bind(this));
    this.googleMaps.init(MARKER_TEST_DATA);

    // Set default locations and summary list order
    let summary = 'Showing results in no specific order';
    this.list_view_content_el.innerHTML = list_view_partial.render({ summary: summary, locations: LocationData });

    // toggle
    this.toggle_state = 'map';
    this.toggle_map_button_el.addEventListener('click', this.on_VIEW_TOGGLE.bind(this));
    this.toggle_list_button_el.addEventListener('click', this.on_VIEW_TOGGLE.bind(this));

    // zip-code input and button
    this.zipcode_input_last_value = '';
    this.zipcode_search_input_el = document.getElementById('zipcodeSearchInput');
    this.zipcode_search_button_el = document.getElementById('zipcodeSearchSubmit');
    this.zipcode_search_input_el.addEventListener('input', this.on_ZIPCODE_INPUT_CHANGE.bind(this));
    this.zipcode_search_button_el.addEventListener('click', this.on_ZIPCODE_SEARCH_SUBMIT.bind(this));
  }

  on_ZIPCODE_INPUT_CHANGE(e) {
    let new_value = e.target.value;
    let is_change_valid = /^([A-Za-z0-9])/.test(new_value);
    is_change_valid = is_change_valid && new_value.length < 8 ? true : false;

    if (is_change_valid || new_value == '') {
      this.zipcode_input_last_value = new_value;
    } else {
      e.target.value = this.zipcode_input_last_value;
    }
  }



  // on_ZIPCODE_SEARCH_SUBMIT(geocoder, resultsMap) {
  //   var address = this.zipcode_search_input_el.value;
  //   this.geocoder.geocode({'address': address}, function(results, status) {
  //     if (status === 'OK') {
  //       resultsMap.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //         map: resultsMap,
  //         position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }




  on_ZIPCODE_SEARCH_SUBMIT(e) {
    
    let zipcode_input_value = this.zipcode_search_input_el.value;
    let is_valid_us_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode_input_value);

    // if (is_valid_us_zip || is_valid_canada_zip) {
      this.googleMaps.setUserLocationByZipcode(zipcode_input_value);
    // } else {
      // console.log('ON ZIPCODE SEARCH SUBMIT --- Error');
    // }
  }

  on_GEO_LOCATION_UNAVAILABLE(marker_data) {
    let summary = 'Showing results in no specific order';

    this.list_view_content_el.innerHTML = list_view_partial.render({ summary: summary, locations: marker_data });

    console.log('GEO LOCATION UNAVAILABLE');
  }

  on_GEO_LOCATION_OBTAINED() {
    console.log('GEO LOCATION OBTAINED');
  }

  on_MARKER_DISTANCE_ORDER_CHANGED(marker_data) {
    // NOTE: Might have to eventually add support for max list length from client location. All
    // depends on how many trial locations are available;

    let furthest_distance = marker_data[marker_data.length - 1].distance_from_client;

    let summary = 'Showing ' + marker_data.length + ' results within ' + furthest_distance + ' miles from your location';

    this.list_view_content_el.innerHTML = list_view_partial.render({ summary: summary, locations: marker_data });

    console.log('MARKER_DISTANCE_ORDER_CHANGED', marker_data);
  }

  on_VIEW_TOGGLE(e) {
    if (this.toggle_state === 'map') {
      this.toggle_state = 'list';

      // animate toggle to list
      TweenMax.to(this.toggle_background_el, 0.25, { x: '100%', ease: Power4.easeInOut });
      TweenMax.to(this.toggle_map_button_el, 0.25, { color: '#56acd9', fontWeight: 500, ease: Power4.easeInOut });
      TweenMax.to(this.toggle_list_button_el, 0.25, { color: '#ffffff', fontWeight: 500, ease: Power4.easeInOut });

      // enter list view
      TweenMax.set(this.list_view_mask_el, { autoAlpha: 1 });
      TweenMax.to(this.list_view_content_el, 0.25, { y: '0%', ease: Power4.easeInOut });
    } else {
      this.toggle_state = 'map';

      // animate toggle to map
      TweenMax.to(this.toggle_background_el, 0.25, { x: '0%', ease: Power4.easeInOut });
      TweenMax.to(this.toggle_list_button_el, 0.25, { color: '#56acd9', fontWeight: 500, ease: Power4.easeInOut });
      TweenMax.to(this.toggle_map_button_el, 0.25, { color: '#ffffff', fontWeight: 500, ease: Power4.easeInOut });

      // exit list view
      TweenMax.to(this.list_view_content_el, 0.25, {
        y: '100%',
        ease: Power4.easeInOut,
        onComplete: () => {
          TweenMax.set(this.list_view_mask_el, { autoAlpha: 0 });
        }
      });
    }
  }

  onScroll(scrollPosition) {
    const TARGET_SCREEN = 0.33;

    // vertical line/y-position on the screen for sections to determine if they are overlapping
    let screen_target_y = this.upperBoundary - this.screenHeight * TARGET_SCREEN;

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

  resize(w, h, scrollPosition) {
    this.width = w;
    this.screenHeight = h;
    this.rect = this.el.getBoundingClientRect();
    this.height = this.rect.height;
    this.upperBoundary = this.el.offsetTop;
    this.lowerBoundary = this.el.offsetTop + this.height;

    this.onScroll(scrollPosition);

    //this.googleMaps.resize(w, h);
  }
}

export default LocationsSection;
