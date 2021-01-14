import { TweenMax, Power4 } from 'gsap';
import SlideShow from './SlideShow';

class ModalForm {
    

    constructor () {

        this.el = document.getElementById('formModal');
        this.bg_el = this.el.getElementsByClassName('modal-background')[0];
        this.form_container_el = this.el.getElementsByClassName('slide-show')[0];
        this.slide_elements = this.form_container_el.getElementsByClassName('slide');
        this.slide_show = new SlideShow(this.form_container_el, this.slide_elements);
    }


    init () {
        
        if (this.initialized) return;

        this.slide_show.init();
        // this.slide_show.show();
        // TweenMax.delayedCall(2, this.slide_show.next.bind(this.slide_show));

        this.initialized = true;
        this.active = false;
    }


    open () {

        this.active = true;
    }


    close () {

        this.active = false;
    }


    resize (w, h) {

        this.width = w;
        this.height = h;
    }
}


export default ModalForm;