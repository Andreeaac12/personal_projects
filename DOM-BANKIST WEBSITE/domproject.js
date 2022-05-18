'user strict';

/// Select elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const h1 = document.querySelector('h1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const dotContainer = document.querySelector('.dots');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
////
//////////////////////////////////Modal window/////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//// Smooth scrolling✅
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  //   const s1coords = section1.getBoundingClientRect();
  //   console.log(e.target.getBoundingClientRect());
  //   console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);
  //   console.log(
  //     'height/width viewport',
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  //   );
  /// Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });
  //// More modern way✅
  section1.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////////////////////////////
///Page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//     el.addEventListener('click', function(e){
//         e.preventDefault();

//         const id = this.getAttribute('href');//this->current element
//         console.log(id);
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     });
// });

//// EVENT DELEGATION✅
//1. Add the addEvenetListener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //this->current element
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///// TABBED COMPONENT✅
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //ignoring clicks in this area
  // Guard clause
  if (!clicked) return;
  // Removing active class on all of them
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //then only added afterwards on one of them
  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///Menu fade animation✅
//refectoring function
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///NOT DRY function
// nav.addEventListener('mouseover', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

//-----------------------------------------------------
//Intersection Observer API✅ => this API let us observe changes to a way that a certain target  element interescts another element or the way interescts the viewport
// // // Sticky navigation: Intersection Observer API✅
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
//callback function
const stickyNav = function (entries) {
  //entries is an array of the threshold - because threshold can hold an array of multiple percentages
  const [entry] = entries; //destruncturing
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //target elem. intersecting the entire viewport
  threshold: 0, //the percentage of intersection at witch the obs callback will be called
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header); //the target is header
///Whenever the target(header) is intersecting the viewport(root) at 0(threshold) the function -stickyNav- is called  no matter if we are scrolling up or down
//--------------------------------------------------------
//-------------------------------------------------------------------

// Reveal sections✅
//create the logic
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //if entry is not intersecting -> return(which means nothing will happend).
  if (!entry.isIntersecting) return;
  //but if it does, then remove the hidden section
  entry.target.classList.remove('section--hidden');
  //non of the sections are observe (like when we return from bottom to top)
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src; //dataset ne lasa sa accesam atributele speciale cu data ,ca data-set
  //Load event
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//................................................
//............................................................
// Building slider component✅
//Mencanismul este asa: curent slide va fi mereu 0% previous va fi -100 si next va fi 100
const slider = function(){
  //Cum currentslide incepe de la 0, l am salvat intr o variabila pentru a putea fi updatat
let curSlide = 0;
const maxSlide = slides.length;
/// Dots✅
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
/// Activate Dots - cerculetul are o alta culoare sa se vada ca este selectat
const activateDot = function (slide) {
  //1. First we select all the dots that we want to
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
  //2. Them remove the active class and add only on the one we want
};

const goToSlide = function (slide) {
  ////Putting slides side by side
  //the width of the images is 100%, that's why we calculate 100 *
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide✅
//la inceput suntem lla 0% si ca sa ajungem la slide ul urmator
//trebuie sa crestem currentslide++
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
// Previous slide✅
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Functions
const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();
//Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Keyboard event✅
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
// Dots event✅
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // curSlide = +e.target.dataset.slide;
    const { slide } = e.target.dataset; //destructuring

    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();
//DOM content loaded event ✅
//1. html is completly parset = which means that HTML has been doawnloaded and been convertied to the DOM tree
//2. all the script must be loaded
document.addEventListener('DOMContentLoaded', function(e){
console.log('HTML parsed and DOM tree built!', e);
});

//The load event✅
//1. when the complete page has loaded then this event has fired(begins)
window.addEventListener('load', function(e){
console.log('Page fully loaded, e');
});

//Before unload event✅
//1. Thhis should be used only if the user may lose the details that he wrote like in a form, or like writing a blog post
//2. situation when data may be lost 🟥
//3. this ev is created imed before a user is about to leave a page
// window.addEventListener('beforeunload', function(e){
// e.preventDefault();
// console.log(e);
// //for historical reason
// e.returnValue = '';
// });
//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//// How to select elements📖🧸
///ex. to apply css style to the entire document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(allSections); //return a node//doesn't update itself

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //return a html collection//update automatically

console.log(document.getElementsByClassName('btn'));

// How to create and inserting elements📖🧸
// ✅.insertAdjacentHTML // great way
// const message = document.createElement('div'); //just an object that represents a dom object
// message.classList.add('cookie-message');
// // ✅message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);/✅/we inserted right into html
// //prepend ing basically adds the element as the first child of header element.
// header.append(message); //✅
//add as the last child
//can not be in 2 places simultanently //moved the el in the buttom of the header

// header.append(message.cloneNode(true));//✅clone
// header.before(message);//✅adauga inainte de header
// header.after(message);//✅adauga dupa header

// How to delete elements📖🧸
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

/// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '105%'; //inline styles

// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

//// Atributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

console.log(logo.src);
console.log(logo.getAttribute('src'));
//opposite atribute
logo.setAttribute('company', 'Bankist');

// Data attributes
console.log(logo.dataset.versionNumber); //they are allways stored in the dataset

// Classes
logo.classList.add('c');
logo.classList.remove('l');
logo.classList.toggle('a');
logo.classList.contains('s'); //

// Don't use-
//will overwrite all the existed classes and also it allows us to only put one class on any element
logo.className = 'jonas';

//// 188. Implementing Smooth scrolling

///Types of events  and event handlers
//it-s a signal that is generating by a certain dom note

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D!');
// };
//mouseenter - > hover
///new way
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
///old way
// h1.onmouseenter = function(e){
//     alert('addEventListener: Great! You are reading the heading :D!')
// };

/////EVENT PROPAGATION -BUBBILING

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min); ///generate random number
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   ///////Stop event propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target);
// });

////EVENT DELEGATION

////   DOM TRAVERSING
///Going downwards : child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);//toti copiii lui h1
// console.log(h1.children);//acttual childs of h1 only for dirrect children
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';
// ///Going upwords : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement)
// ;
// //closest parent to that child - important
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// ///Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// ///how to work with all the sibblings of an element
// console.log(h1.parentElement.children);//return html collection
// [...h1.parentElement.children].forEach(function(el){
//     if(el !== h1) el.style.transform = 'scale(0.5)';
// });
