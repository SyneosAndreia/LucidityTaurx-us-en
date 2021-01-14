import { TweenMax, Power4 } from 'gsap';
import { EventEmitter } from 'events';

var GoogleMapsLoader = require('google-maps');
var marker_box_partial = require('../../views/partials/locations-marker-textbox.mustache');

// Google map tile origin dimensions are 256x256 on a 96dpi display, meaning that
const ZOOM_SCALES = [
	1128.497220,
	2256.994440,
	4513.988880,
	9027.977761,
	18055.955520,
	36111.911040,
	72223.822090,
	144447.644200,
	288895.288400,
	577790.576700,
	1155581.153000,
	2311162.307000,
	4622324.614000,
	9244649.227000,
	18489298.450000,
	36978596.910000,
	73957193.820000,
	147914387.600000,
	295828775.300000,
	591657550.500000
];


// constants


// const API_KEY = 'AIzaSyBIO6qmDVcH6JfVplIVWEmvI0C1li8oyBE';

const API_KEY = 'AIzaSyAvs4iv36PrFc-cTQtVYdS061xh_7c6wRE';
const CENTER_OF_USA = { lat: 39.8283, lng: -98.5795 };
const USER_MARKER_ICON_URL = 'assets/images/sections/locations/user-location-marker.png';
const TARGET_MARKER_ICON_URL = 'assets/images/sections/locations/target-location-marker.png';


class GoogleMaps extends EventEmitter {


	constructor(el) {

		super();

		// element to embed the map
		this.el = el;
	}


	init(data) {

		this.marker_data = data;

		// Load the Google Maps API wrapper: dynamically appends script tag to
		// index.html and sets global callback - before calling it's own. Much
		// cleaner and modular this way.

		GoogleMapsLoader.KEY = API_KEY;
		GoogleMapsLoader.load(this.on_GOOGLE_HANDSHAKE_COMPLETE.bind(this));
	}


	on_GOOGLE_HANDSHAKE_COMPLETE() {

		// create the actual map element and necessary API classes
		this.map = new window.google.maps.Map(this.el, { zoom: 4, center: CENTER_OF_USA, mapTypeControl: false });
		this.geocoder = new google.maps.Geocoder();

		// add markers to the map element now that
		this.marker_data = this.setLocationMarkers(this.map, this.marker_data);

		// check if client location is accessible through the browser API
		this.getGeoLocationByBrowser((position) => {

			if (position) {
				this.centerMapToCoordinates(position);
				this.setUserLocationMarker(position);
				this.marker_data = this.sortMarkersByDistanceFromClientLocation(position, this.marker_data);
			} else {
				// lets the caller know that it needs to create a fall back
				// option for obtaining client location information.
				this.emit('GEO_LOCATION_UNAVAILABLE', this.marker_data);
			}
		});
	}


	setUserLocationMarker(position) {

		this.user_location_marker = new google.maps.Marker({
			map: this.map,
			position: position,
			animation: google.maps.Animation.DROP,
			icon: USER_MARKER_ICON_URL
		});
	}


	sortMarkersByDistanceFromClientLocation(user_location, marker_data) {

		let marker;
		for (var i = 0; i < marker_data.length; i++) {
			marker = marker_data[i];
			marker.distance_from_client = Math.round(this.calcuateDistanceBetweenLatLongCoordiantes(user_location, marker.coordinates));
		}

		// orders marker locations by distance from the user location
		marker_data.sort(function (a, b) {

			let distance_a = a.distance_from_client;
			let distance_b = b.distance_from_client;

			if (distance_a < distance_b) return -1;
			if (distance_a > distance_b) return 1;

			return 0;

		}.bind(this));

		this.emit('MARKER_DISTANCE_ORDER_CHANGED', marker_data);

		return marker_data;
	}


	centerMapToCoordinates(coords) {

		// animate centering of map to user position
		this.map.panTo(coords);

		// wait to zoom, since it will cancel the centering animation
		TweenMax.delayedCall(0.3, () => {
			this.map.setZoom(Math.max(6, this.map.getZoom() + 1));
		});
	}


	setLocationMarkers(map, marker_data) {

		let temp = [];
		let node_clone, marker;

		for (var i = 0; i < marker_data.length; i++) {
			node_clone = Object.assign({}, marker_data[i]);
			marker = new google.maps.Marker({
				map: map,
				position: node_clone.coordinates,
				animation: google.maps.Animation.DROP,
				icon: TARGET_MARKER_ICON_URL
			});

			this.setInfoWindow(marker, node_clone);

			node_clone.marker = marker;
			temp.push(node_clone);
		}

		return temp;
	}


	setInfoWindow(marker, node) {

		var infoWindow = new google.maps.InfoWindow({
			content: this.setContentWindow(node)
		});

		marker.addListener('click', function () {
			infoWindow.open(this.map, this);
		});
	}


	setContentWindow(data) {

		return marker_box_partial.render(data);
	}


	setCoordinatesByAddressConversion(marker_data, index = 0, callback = null) {

		let mark = marker_data[index].info.address;
		let address = mark.street + ', ' + mark.city + ', ' + mark.state + ' ' + mark.zip;

		this.geocoder.geocode({ 'address': address }, (results, status) => {

			marker_data[index].coordinates = {
				lat: results[0].geometry.location.lat(),
				lng: results[0].geometry.location.lng()
			};

			let next_index = index + 1;

			if (next_index < marker_data.length) {
				this.setCoordinatesByAddressConversion(marker_data, next_index, callback);
			} else {
				if (callback) callback(marker_data);
			}
		});
	}


	calcuateDistanceBetweenLatLongCoordiantes(point_one, point_two, unit = 'miles') {

		let radlat1 = Math.PI * point_one.lat / 180;
		let radlat2 = Math.PI * point_two.lat / 180;
		let theta = point_one.lng - point_two.lng;
		let radtheta = Math.PI * theta / 180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

		if (dist > 1) {
			dist = 1;
		}

		dist = Math.acos(dist)
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;

		// convert to kilometers
		dist = (unit == "kilometers") ? dist * 1.609344 : dist;

		return dist;
	}


	getGeoLocationByBrowser(callback) {

		if (window.navigator.geolocation) {

			window.navigator.geolocation.getCurrentPosition((position) => {
				callback({ lat: position.coords.latitude, lng: position.coords.longitude });
			}, () => {
				callback(null);
			});

		} else {

			callback(null);
		}
	}


	setUserLocationByZipcode(zip_code) {
		

		this.geocoder.geocode({ 'address': zip_code }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK) {

				let user_location = {
					lat: results[0].geometry.location.lat(),
					lng: results[0].geometry.location.lng()
				};

				this.centerMapToCoordinates(user_location);
				this.setUserLocationMarker(user_location);
				this.sortMarkersByDistanceFromClientLocation(user_location, this.marker_data);

			} else {

				console.log("Geocode was not successful for the following reason: " + status);
			}
		});
	}


	resize(w, h, scrollPosition) {

		this.width = w;
		this.height = h;
	}
}


export default GoogleMaps;
