import AboutSection from 'sections/AboutSection';
import FaqSection from 'sections/FaqSection';
import IntroSection from 'sections/IntroSection';
import LocationsSection from 'sections/LocationsSection';
import NavigationSection from 'sections/NavigationSection';
import PurposeSection from 'sections/PurposeSection';
import DismissibleBanner from 'ui/DismissibleBanner';
import LanguageSelector from 'ui/LanguageSelector';

import $ from 'jquery';

// import ModalForm from 'ui/ModalForm';

var scrollPosition = 0;
var sectionsCount = 0;
var sections;

$(document).ready(function () {
  let prescreenerOpeners = document.getElementsByClassName('prescreener-button');
  let modalForm = document.getElementById('formModal');
  /*let modalOpeners = document.getElementsByClassName('modal-button');
  let modalClose = document.getElementById('modal-close-btn');
 */
  /*
  function revertHTMLBody() {
    $("body").css("position", "static");
    $("html").css("position", "static");
    $("body").css("overflow", "visible");
    $("html").css("overflow", "visible");
    $(".modal-form-container").css("display", "none");
  }
 */
  /*$("#close-modal-btn").click(function(event) {
    revertHTMLBody();
  });
 */
  /*
  $(document).click(function(event) {
    //modal closes on click events outside the modal
    if ($(event.target).closest(".modal-background").length) {
      revertHTMLBody();
    }
  });

  // Detects mobile devices
  function detectMobile() {
   if(window.innerWidth <= 830 && window.innerHeight <= 830) {
     return true;
   } else {
     return false;
   }
  }
 */
  //var isMobile = detectMobile();

  // Checks for Safari browser and shows cookie warning if true
  // Safari 3.0+ "[object HTMLElementConstructor]"
  /* var isSafari1 = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  var isSafari2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
 */
  // Opera 8.0+
  //var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  //var isFirefox = typeof InstallTrigger !== 'undefined';
  // Internet Explorer 6-11
  //var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  //var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1 - 71
  //var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  /*
    function renderSafariContent() {

      var safariWarning = "<div class='safari-warning-div'><h2>Safari Cookie Warning</h2><p>Due to Apple Safari's cookie policy, we are unable to show you the embedded questionnaire in the current settings. Please try using a different browser or follow the directions below to disable the cookie blocker and view the questionnaire.</p><p class='mobile-directions'><span>For mobile users (iPhone/iPad):</span><br/> Go to Settings > Safari > Prevent Cross-Site Tracking (turn off). Also be sure that 'Block All Cookies' is disabled as well (you can change these back later to your security preferences). Exit Settings app and refresh Safari page to see questionnaire.</p><p class='desktop-directions'><span>For desktop users (Mac laptop or desktop):</span><br/> At the top bar Safari menu, click on Safari > Preferences > Privacy. Next to 'Cookies and website data', select 'Always allow' (you can change this back later to your security preferences). Then close the Preferences window and refresh the Safari page to see the questionnaire.</p></div>"
      $(".form-content").html(safariHTML);
    }
  */
  //add prescreener-opening functionality to all modal buttons
  var params = location.search;
  console.log(params);

  for (var i = 0; i < prescreenerOpeners.length; i++) {
    var exitLink = 'https://prequalify.luciditytrial.com/us/en/screener';

    if (params) {
      exitLink = exitLink + params;
    }
    console.log(exitLink);

    prescreenerOpeners[i].addEventListener("click", function () {

      window.open(exitLink, '_self');
    });
  }



  //add modal-opening functionality to all modal buttons
  /*for (var i = 0; i < modalOpeners.length; i++) {
    if (isMobile) {
      modalOpeners[i].addEventListener("click", function() {
        window.open('');
      });
    } else {
      modalOpeners[i].addEventListener("click", function() {
        $("#formModal").css("display", "flex");
        $("body").css("overflow", "visible");
        $("body").css("position", "fixed");
        $("html").css("overflow", "visible");
        $("html").css("position", "fixed");
        // renderSafariContent();
      });
    }
  }*/
  // for (var i = 0; i < modalOpeners.length; i++) {
  //   modalOpeners[i].addEventListener("click", function() {
  //     console.log('modal button clicked');
  //     // Checks if Safari is browser and redirects to survey page if true
  //     if ((isSafari1 || isSafari2) && !navigator.userAgent.match('CriOS')) {
  //       console.log('Safari detected');
  //       window.open('https://revscreener.mmgct.com/pfzrjvnlaa', '_blank');
  //     } else {
  //       $("#formModal").css("display", "flex");
  //       $("body").css("overflow", "visible");
  //       $("body").css("position", "fixed");
  //       $("html").css("overflow", "visible");
  //       $("html").css("position", "fixed");
  //       console.log('not Safari');
  //       // renderSafariContent();
  //     }
  //   });
  // }
  // for (var i = 0; i < modalOpeners.length; i++) {
  //   modalOpeners[i].addEventListener("click", function() {
  //     console.log('modal button clicked');
  //     // Checks if Safari is browser and redirects to survey page if true
  //     if (isOpera || isChrome || isEdge || isIE || isFirefox || navigator.userAgent.match('CriOS')) {
  //       $("#formModal").css("display", "flex");
  //       $("body").css("overflow", "visible");
  //       $("body").css("position", "fixed");
  //       $("html").css("overflow", "visible");
  //       $("html").css("position", "fixed");
  //       console.log('not Safari');
  //     } else if (isSafari1 || isSafari2) {
  //       console.log('Safari detected');
  //       window.open('https://revscreener.mmgct.com/pfzrjvnlaa?browser=safari', '_blank');
  //       // renderSafariContent();
  //     }
  //   });
  // }

  $('.close-banner').on(click, function() {
    console.log('Hello');
  })


  $('.tau-link').click(function () {
    var expandable = $(".expandable:nth-of-type(5)")[0];
    var expanse = $(".expandable:nth-of-type(5) .expanse")[0];

    var height = 300
    TweenMax.to(expanse, 0.5, {
      height: height,
      ease: Power4.easeInOut
    });

    expanse.classList.add('active');

    // animate cross
    let horizontal = expandable.getElementsByClassName('horizontal-bar')[0];
    let vertical = expandable.getElementsByClassName('vertical-bar')[0];

    TweenMax.to(horizontal, 0.5, {
      scaleY: 1,
      rotation: 180,
      ease: Power4.easeInOut
    });
    TweenMax.to(vertical, 0.5, {
      scaleY: 1,
      rotation: 270,
      ease: Power4.easeInOut
    });
  });

});

class App {
  constructor() {
    // scrolling element
    this.wrapper = document.getElementsByClassName('wrapper')[0];

    // sections
    this.navigationSection = new NavigationSection();
    this.introSection = new IntroSection();
    this.aboutSection = new AboutSection();
    this.purposeSection = new PurposeSection();
    this.locationsSection = new LocationsSection();
    this.faqSection = new FaqSection();
    this.dismissibleBanner = new DismissibleBanner();
    this.languageselector = new LanguageSelector();
  

    // global ui

    // scroll-aware sections
    sections = [
      this.navigationSection,
      this.introSection,
      this.aboutSection,
      this.purposeSection,
      this.locationsSection,
      this.faqSection
    ];
    sectionsCount = sections.length;
    scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  }

  init() {
    // batch initialization for bow. maybe change to lazy initialization
    // sometime if it seems like performance is dragging.
    for (var i = 0; i < sectionsCount; i++) {
      sections[i].init();

      // checks to see which section is most visible on the screen
      if (sections[i].on) sections[i].on('SECTION_ACTIVE', this.on_SECTION_ACTIVE.bind(this));
    }

    this.dismissibleBanner.init();
    this.languageselector.init('us', 'English');

    // this.modalForm.init();
    // this.modalForm.open();

    // initial javascript layout
    this.resize();

    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('scroll', this.on_SCROLL);
  }

  on_SCROLL(e) {
    scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    for (var i = 0; i < sectionsCount; i++) {
      if (sections[i].onScroll) sections[i].onScroll(scrollPosition);
    }
  }

  on_SECTION_ACTIVE(section) {
    this.navigationSection.setActiveSection(section);
  }


  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    for (var i = 0; i < sectionsCount; i++) {
      sections[i].resize(this.width, this.height, scrollPosition);
    }

    // this.modalForm.resize(this.width, this.height);
  }


}

var app = new App();
app.init();