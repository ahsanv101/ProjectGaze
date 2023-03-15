/**
* Template Name: HeroBiz - v2.4.0
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/

*/

// import { Utils } from '/assets/utils.js';

// import * as Utils from '/assets/utils.js';
// import Chart from 'chart.js'

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar .scrollto');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY;
      if (navbarlink.hash != '#header') position += 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Function to scroll to an element with top ofset
   */
  function scrollto(el) {
    const selectHeader = document.querySelector('#header');
    let offset = 0;

    if (selectHeader.classList.contains('sticked')) {
      offset = document.querySelector('#header.sticked').offsetHeight;
    } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
      offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
    }
    window.scrollTo({
      top: document.querySelector(el).offsetTop - offset,
      behavior: 'smooth'
    });
  }

  /**
   * Fires the scrollto function on click to links .scrollto
   */
  let selectScrollto = document.querySelectorAll('.scrollto');
  selectScrollto.forEach(el => el.addEventListener('click', function (event) {
    if (document.querySelector(this.hash)) {
      event.preventDefault();

      let mobileNavActive = document.querySelector('.mobile-nav-active');
      if (mobileNavActive) {
        mobileNavActive.classList.remove('mobile-nav-active');

        let navbarToggle = document.querySelector('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }));

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToogle) {
    mobileNavToogle.addEventListener('click', function (event) {
      event.preventDefault();

      document.querySelector('body').classList.toggle('mobile-nav-active');

      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Auto generate the hero carousel indicators
   */
  let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
  if (heroCarouselIndicators) {
    let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')

    heroCarouselItems.forEach((item, index) => {
      if (index === 0) {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
      }
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function (el) {
        el.addEventListener('click', function () {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


/** 
 * Hero eye-zoom on scroll animation
 */
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  // Defaults are used by all ScrollTriggers
  toggleActions: "restart pause resume pause", // Scoll effect Forward, Leave, Back, Back Leave
  markers: false // Easaly remove markers for production 
});

const timelineHeader = gsap.timeline({
  scrollTrigger: {
    id: "ZOOM", // Custom label to the marker
    trigger: ".header-zoom", // What element triggers the scroll
    scrub: 0.5, // Add a small delay of scrolling and animation. `true` is direct
    start: "top top", // Start at top of Trigger and at the top of the viewport
    end: "+=100% 50px", // The element is 500px hight and end 50px from the top of the viewport
    pin: true, // Pin the element true or false
  }
});

timelineHeader
  .to(".header-text", {
    scale: 0.75,
    yPercent: -150
  }, "sameTime")
  .to(".image-2", {
    scale: 0.1
  }, "sameTime")


/**
 * Sidebar eye icons 
 */

$(window).bind('scroll', function () {
  element = document.getElementsByClassName('icons-sidebar')[0]
  if ($(window).scrollTop() >= $('#hero-fullscreen').offset().top + 500) {
    element.classList.add('show-sidebar');
  }
  if ($(window).scrollTop() < $('#hero-fullscreen').offset().top + 500) {
    element.classList.remove('show-sidebar');
    element.classList.add('hide-sidebar');
  }
});

/* --- Detect section of website and change sidebar accordingly --- */
var animate = true;

function changeIcon(n) {
  animate=false;
  if(n==1) changeIcon1();
  if(n==2) changeIcon2();
  if(n==3) changeIcon3();
  if(n==4) changeIcon4();
  if(n==5) changeIcon5();
  setTimeout(()=>{animate=true;},500);
}

function changeIcon1() {
  var img1 = document.getElementById('icon1');

  var img2 = document.getElementById('icon2');
  var img3 = document.getElementById('icon3');
  var img4 = document.getElementById('icon4');

  img1.src = "assets/img/eye-nav/eye1-active.svg";

  if (img2.getAttribute('src') == 'assets/img/eye-nav/eye2-active.svg') {
    $('#icon2').attr('src', 'assets/img/eye-nav/eye2.svg')
  }
  if (img3.getAttribute('src') == 'assets/img/eye-nav/eye3-active.svg') {
    $('#icon3').attr('src', 'assets/img/eye-nav/eye3.svg')
  }
  if (img4.getAttribute('src') == 'assets/img/eye-nav/eye4-active.svg') {
    $('#icon4').attr('src', 'assets/img/eye-nav/eye4.svg')
  }
}

function changeIcon2() {
  var img2 = document.getElementById('icon2');

  var img1 = document.getElementById('icon1');
  var img3 = document.getElementById('icon3');
  var img4 = document.getElementById('icon4');

  img2.src = "assets/img/eye-nav/eye2-active.svg";

  if (img1.getAttribute('src') == 'assets/img/eye-nav/eye1-active.svg') {
    $('#icon1').attr('src', 'assets/img/eye-nav/eye1.svg')
  }
  if (img3.getAttribute('src') == 'assets/img/eye-nav/eye3-active.svg') {
    $('#icon3').attr('src', 'assets/img/eye-nav/eye3.svg')
  }
  if (img4.getAttribute('src') == 'assets/img/eye-nav/eye4-active.svg') {
    $('#icon4').attr('src', 'assets/img/eye-nav/eye4.svg')
  }
}

function changeIcon3() {
  var img3 = document.getElementById('icon3');

  var img1 = document.getElementById('icon1');
  var img2 = document.getElementById('icon2');
  var img4 = document.getElementById('icon4');

  img3.src = "assets/img/eye-nav/eye3-active.svg";

  if (img1.getAttribute('src') == 'assets/img/eye-nav/eye1-active.svg') {
    $('#icon1').attr('src', 'assets/img/eye-nav/eye1.svg')
  }
  if (img2.getAttribute('src') == 'assets/img/eye-nav/eye2-active.svg') {
    $('#icon2').attr('src', 'assets/img/eye-nav/eye2.svg')
  }
  if (img4.getAttribute('src') == 'assets/img/eye-nav/eye4-active.svg') {
    $('#icon4').attr('src', 'assets/img/eye-nav/eye4.svg')
  }
}

function changeIcon4() {
  var img4 = document.getElementById('icon4');

  var img1 = document.getElementById('icon1');
  var img2 = document.getElementById('icon2');
  var img3 = document.getElementById('icon3');

  img4.src = "assets/img/eye-nav/eye4-active.svg";

  if (img1.getAttribute('src') == 'assets/img/eye-nav/eye1-active.svg') {
    $('#icon1').attr('src', 'assets/img/eye-nav/eye1.svg')
  }
  if (img2.getAttribute('src') == 'assets/img/eye-nav/eye2-active.svg') {
    $('#icon2').attr('src', 'assets/img/eye-nav/eye2.svg')
  }
  if (img3.getAttribute('src') == 'assets/img/eye-nav/eye3-active.svg') {
    $('#icon3').attr('src', 'assets/img/eye-nav/eye3.svg')
  }
}

function changeIcon5() {
  var img1 = document.getElementById('icon1');
  var img2 = document.getElementById('icon2');
  var img3 = document.getElementById('icon3');
  var img4 = document.getElementById('icon4');

  if (img1.getAttribute('src') == 'assets/img/eye-nav/eye1-active.svg') {
    $('#icon1').attr('src', 'assets/img/eye-nav/eye1.svg')
  }
  if (img2.getAttribute('src') == 'assets/img/eye-nav/eye2-active.svg') {
    $('#icon2').attr('src', 'assets/img/eye-nav/eye2.svg')
  }
  if (img3.getAttribute('src') == 'assets/img/eye-nav/eye3-active.svg') {
    $('#icon3').attr('src', 'assets/img/eye-nav/eye3.svg')
  }
  if (img4.getAttribute('src') == 'assets/img/eye-nav/eye4-active.svg') {
    $('#icon4').attr('src', 'assets/img/eye-nav/eye4.svg')
  }
}

const targets = document.querySelectorAll("#about, #project, #data, #viz, #further");

function callback(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting == false || animate == false){
      return
    }
    console.log(entry)
    console.log("this is " + entry.target.id);

    if (entry.target.id == 'about'){
      changeIcon1();
    }
    if (entry.target.id == 'project'){
      changeIcon2();
    }
    if (entry.target.id == 'data'){
      changeIcon3();
    }
    if (entry.target.id == 'viz'){
      changeIcon4();
    }
    if (entry.target.id == 'further'){
      changeIcon5();
    }
  });
}

targets.forEach((target) => {
  if (target.id == 'data') {
    new IntersectionObserver(callback,{'threshold':0.3}).observe(target);
  }
  else if (target.id == 'viz') {
    new IntersectionObserver(callback,{'threshold':0.1}).observe(target);
  }
  else {
    new IntersectionObserver(callback,{'threshold':0.7}).observe(target);
  }
});

/* --- Highlight animation --- */

$(window).scroll(function () {
  reveal(300);
  revealBG(300);
  revealBG_gray(300);
})

function reveal(delay) {
  var reveals = document.querySelectorAll('.underlined');
  let position = window.scrollY;
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      setTimeout((function () {
        this.classList.add('active');
      }).bind(reveals[i]), delay);
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

function revealBG(delay) {
  var reveals = document.querySelectorAll('.underlined--bg');
  let position = window.scrollY;
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      setTimeout((function () {
        this.classList.add('active--bg');
      }).bind(reveals[i]), delay);
    } else {
      reveals[i].classList.remove('active--bg');
    }
  }
}

function revealBG_gray(delay) {
  var reveals = document.querySelectorAll('.underlined--bg-g');
  let position = window.scrollY;
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      setTimeout((function () {
        this.classList.add('active--bg-g');
      }).bind(reveals[i]), delay);
    } else {
      reveals[i].classList.remove('active--bg-g');
    }
  }
}


/**
 * Letter-board cinema
 */

$(function () {
  initLetters();

  function onHover(event) {
    $target = $(event.target).parents('a').first();
    textAnimation = setInterval(function () {
      animateTitle($target);
    }, 600);
    return textAnimation;
  }
  var intervalHandle;
  $('.letter-board a').hover(function (event) {
    intervalHandle = onHover(event);
  }, function (event) {
    clearInterval(intervalHandle);
  })

  function initLetters() {
    $.each($('.letter-board :not(:has(*))'), function () {
      $title = $(this);
      //text = $.trim($title.text());
      text = $title.text();
      //alert(text)
      newtext = "";
      $.each(text.split(''), function (i, v) {
        v = v.trim();
        className = Math.round(Math.random()) == 1 ? 'flip' : '';
        newtext += (className !== '') ? "<span class='" + className + "'>" + v + "</span>" : "<span>" + v + "</span>";
      })
      $title.html(newtext);
    });
  }
  function animateTitle($title) {
    $.each($title.find('span'), function (i, v) {
      Math.round(Math.random()) == 1 ? $(this).toggleClass('flip') : '';
    })
  }

});


/**
 * Dark-light mode button
 */

$('.dayNight input').change(function () {
  var heroH2 = document.querySelector(".hero-fullscreen h2");
  var heroP = document.querySelector(".hero-fullscreen p");
  /* var body = document.querySelector("body"); */
  if ($(this).is(':checked')) {
    document.getElementById('cssmode').setAttribute('href', 'assets/css/dark-variables.css');
    document.getElementById('eye-img').setAttribute('src', 'assets/img/eye-drawing-2006-white.svg');
    heroH2.classList.remove('hero-fullscreen-text');
    heroP.classList.remove('hero-fullscreen-text');
    /* body.style.backgroundImage='url(../img/backgroundnoise-dark.png)'; */
  }
  else {
    document.getElementById('cssmode').setAttribute('href', 'assets/css/light-variables.css');
    document.getElementById('eye-img').setAttribute('src', 'assets/img/eye-drawing-2006.svg');
    heroH2.classList.add('hero-fullscreen-text');
    heroP.classList.add('hero-fullscreen-text');
    /* body.style.backgroundImage='url(../img/backgroundnoise.png)'; */
  }
});



// Bechdel test
const ctx = document.getElementById('myChart');

const DATA_COUNT = 2;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

// const labels = 'Bechdel';

d3.csv("https://raw.githubusercontent.com/ahsanv101/ProjectGaze/main/Data/bechdel/bechdel_passed.csv")
.then((d) => {

  // failed.push(d.length);
  d3.csv("https://raw.githubusercontent.com/ahsanv101/ProjectGaze/main/Data/bechdel/bechdel_failed_0.csv")
        .then((d0) => {

          d3.csv("https://raw.githubusercontent.com/ahsanv101/ProjectGaze/main/Data/bechdel/bechdel_failed_1.csv")
          .then((d1) => {
           
            d3.csv("https://raw.githubusercontent.com/ahsanv101/ProjectGaze/main/Data/bechdel/bechdel_failed_2.csv")
          .then((d2) => {
             makeChart([d.length,d0.length,d1.length,d2.length])
          
          });
        });
        
        
      });

});

        // makeChart
function makeChart(ddata){

  var passed = ddata[0];
  var failed = ddata[1]+ddata[2]+ddata[3];


  // console.log(a);
  const data = {
    labels: ['Top 10 Grossing movies per decade'],
    datasets: [
      {
        label: 'Passed',
        data: [passed],
        borderColor: [
          'rgb(255, 99, 132)'],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'],
      },
      {
        label: 'Failed',
        data:[failed],
        borderColor: [
         'rgb(255, 159, 64)'],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'],
      }
    ]
  };
  
  // import Chart from 'chart.js/auto';
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Bechdel test: Pass or Fail'
        }
      }
    },
  });

}        

