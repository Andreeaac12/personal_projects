'use strict';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navSmooth = document.querySelector('.nav-wrap');
const links = document.querySelector('.nav-link');
const header = document.querySelector('.header');
const mainNav = document.querySelector('.main-nav');

///Smooth scrolling
btnScroll.addEventListener('click', function (e) {
  e.preventDefault();
  const scroll1 = section1.getBoundingClientRect();

  // window.scrollTo(scroll1.left + window.pageXOffset, scroll1.top + window.pageYOffset);

  //old way
  // window.scrollTo({
  //     left: scroll1.left + window.pageXOffset,
  //     top: scroll1.top + window.pageYOffset,
  //     behavior: 'smooth',
  // });

  //modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});
///Page navigation
navSmooth.addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href'); //this->current element
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///Menu fade animation
const handleHover2 = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const sibling = link.closest('.nav-wrap').querySelectorAll('.nav-link');
    const logo = link.closest('.main-nav').querySelector('p');
    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
/// Passing "arguments" into handler
navSmooth.addEventListener('mouseover', handleHover2.bind(0.5));
navSmooth.addEventListener('mouseout', handleHover2.bind(1));

// // // Sticky navigation: Intersection Observer API
const navHeight = mainNav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) mainNav.classList.add('sticky');
  else mainNav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
