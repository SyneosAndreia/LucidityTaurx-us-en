import EventEmitter from 'events';
import { Power4, TweenMax } from 'gsap';

var expanses_partial = require('../../views/partials/faq-expandables.mustache');

const FAQ_DATA = {
  expanses: [
    {
      question: 'Why do people take part in clinical research studies?',
      answer: [
        {
          p: 'Some of the reasons to join a clinical research study include:'
        },
        {
          p: '<strong>Access to potential future therapies</strong> – participants receive investigational drugs that would otherwise be unavailable to the general public. There is no charge for any study-related treatment.'
        },
        {
          p: '<strong>Advance understanding</strong> – participants are contributing to medical research that may help other people with early Alzheimer’s disease (AD) in the future.'
        },
        {
          p: '<strong>Medical care</strong> – participants are provided with information about their health through regular examinations and tests, which may help to uncover undiagnosed medical conditions and monitor diagnosed early Alzheimer’s.'
        }
      ]
    },
    {
      question: 'How long will the LUCIDITY Study last?',
      answer: [
        {
          p: 'The study is expected to last up to 120 weeks (approx. 2 years), during which participants will be asked to attend the study center for 9 scheduled visits to undergo medical tests and assessments. The study is made up of three phases:'
        },
        {
          p: '<span class="bullet"></span><strong>Part 1: Screening Phase</strong> – up to 16 weeks before the start of Part 2, participants will be invited to attend a Screening visit at which the study team will carry out cognitive and physical assessments to determine suitability.'
        },
        {
          p: '<span class="bullet"></span><strong>Part 2: Double-Blind Treatment Phase</strong> – if eligible, participants will take two tablets twice a day for 52 weeks. Some participants will receive the investigational drug, others will receive a placebo.'
        },
        {
          p: '<span class="bullet"></span><strong>Part 3: Open-Label Treatment Phase</strong> – participants will take two tablets of the investigational drug twice a day for an additional 52 weeks.'
        },
        {
          p: 'After completing the study, participants may be able to join the TauRx Expanded Access Program, during which only the investigational drug will be provided to participants. Study doctors will provide further details to participants.'
        }
      ]
    },
    {
      question: 'Who is involved in clinical research studies?',
      answer: [
        {
          p: 'Every participant in a clinical research study is supported by a dedicated team that includes doctors, nurses and other healthcare professionals. The commitment of each participant and the study team is important to help meet the objectives of the study. All clinical research studies are performed according to strict ethical and governmental guidelines, to ensure that participants’ rights are protected while the information is being collected.'
        }
      ]
    },
    {
      question: 'What are tau tangles?',
      answer: [
        {
          p:
          'Recent evidence suggests that tau tangles are a potential driver in the progressive dementia that characterizes AD. Tau is a protein that forms part of a brain cell’s structure called a ‘microtubule’. The microtubule helps transport nutrients within the brain cell and stabilizes the axons that connect one brain cell to another. In people with AD, tau proteins do not function properly and form tangles inside the brain cells. This leads to a breakdown in the brain cell’s ability to communicate with other brain cells, which causes the symptoms of AD.'
        },
        {
          p:
          'Currently, a limited number of approved treatments help with the symptoms of AD, but do not stop the disease from progressing. By reducing the build-up of ‘tau tangles’, researchers believe that the investigational drug in this study could help slow disease progression and enhance quality of life for people with AD. The results of the LUCIDITY Study will help determine whether the investigational drug can progress to the final stages of clinical development.'
        },
        { p: "<span class='prescreener-button blue-button' style='cursor: pointer;'>SEE IF YOU OR A LOVED ONE PRE-QUALIFIES</span>" }
      ]
    },
    {
      question: 'Has the drug being tested in the LUCIDITY study been tried before safely?',
      answer: [
        {
          p:
          'The investigational drug being tested in the LUCIDITY study has already been assessed in three Phase 3 studies involving over 1,900 subjects around the world with treatment durations of 12-18 months.  Most of these subjects used the investigational drug at substantially higher doses than those to be used in the LUCIDITY study.  There were no consistent or substantial safety concerns arising from these studies, which indicated that low doses of the drug have the same potential as high doses to provide treatment benefit and are likely to be better tolerated by elderly patients over time.  This drug is taken in tablet form twice a day – once in the morning and once in the evening.'
        },
        { p: "<span class='prescreener-button blue-button' style='cursor: pointer;'>SEE IF YOU OR A LOVED ONE PRE-QUALIFIES</span>" }
      ]
    }
  ]
};

var _this_;

class FaqSection extends EventEmitter {
  constructor() {
    super();

    _this_ = this;

    this.id = 'faq';
    this.el = document.getElementsByClassName('section faq')[0];
    this.expandables_container = document.getElementsByClassName('expandables-container')[0];
    this.expandable_titles = this.el.getElementsByClassName('expanse-title');
  }

  init() {
    // render Q&A template
    this.expandables_container.innerHTML = expanses_partial.render(FAQ_DATA);

    for (var i = 0; i < this.expandable_titles.length; i++) {
      this.expandable_titles[i].addEventListener('click', this.on_EXPANSION_SELECT);
    }
  }

  on_EXPANSION_SELECT() {
    var expanse = this.parentElement.getElementsByClassName('expanse')[0];

    if (expanse.className.indexOf('active') > -1) {
      _this_.closeExpansion(this.parentElement, expanse);
    } else {
      _this_.openExpansion(this.parentElement, expanse);
    }
  }

  openExpansion(el, expanse) {
    var height = this.getAllHeights(expanse.getElementsByClassName('expanse-p'));
    TweenMax.to(expanse, 0.5, { height: height, ease: Power4.easeInOut });

    expanse.classList.add('active');

    // animate cross
    let horizontal = el.getElementsByClassName('horizontal-bar')[0];
    let vertical = el.getElementsByClassName('vertical-bar')[0];

    TweenMax.to(horizontal, 0.5, { scaleY: 1, rotation: 180, ease: Power4.easeInOut });
    TweenMax.to(vertical, 0.5, { scaleY: 1, rotation: 270, ease: Power4.easeInOut });
  }

  updateHeightsOnResize() {
    var expandParent = document.getElementsByClassName('expandables-container')[0];
    var expanse = document.getElementsByClassName('expanse');
    var that = this;
    Array.prototype.forEach.call(expanse, function(el) {
      console.log("foo: " + that.getAllHeights(el.getElementsByClassName('expanse-p')));
      var height = that.getAllHeights(el.getElementsByClassName('expanse-p'));
      if (el.className.indexOf('active') > -1) {
        TweenMax.to(el, 0.5, { height: height, ease: Power4.easeInOut });
      }
  });
  }

  getAllHeights(arr) {
    let totalHeight = 0;
    for (let i = 0; i < arr.length; i++) {
      totalHeight += arr[i].getBoundingClientRect().height;
    }
    return totalHeight;
  }

  closeExpansion(el, expanse) {
    TweenMax.to(expanse, 0.5, { height: 0, ease: Power4.easeInOut });
    expanse.classList.remove('active');

    let horizontal = el.getElementsByClassName('horizontal-bar')[0];
    let vertical = el.getElementsByClassName('vertical-bar')[0];
    TweenMax.to(vertical, 0.5, { scaleY: 1, rotation: 0, ease: Power4.easeInOut });
    TweenMax.to(horizontal, 0.5, { scaleY: 1, rotation: 0, ease: Power4.easeInOut });
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
    this.updateHeightsOnResize();
  }
}

export default FaqSection;
