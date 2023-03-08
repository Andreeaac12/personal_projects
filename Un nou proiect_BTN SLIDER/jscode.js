'use strict';

const moving = document.querySelectorAll('.moving');

for (let i = 0; i < 3; i++) {
  moving[i].addEventListener('mouseover', function () {
    moving[i].style.color = '#bee1e6';
  });
  moving[i].addEventListener('mouseout', function () {
    moving[i].style.color = 'black  ';
  });
}

// Building slider component

const slider = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btn--left');
const btnRight = document.querySelector('.btn--right');

let curSlide = 0;
const maxSlide = slider.length;

const goToSlide = function (slide) {
  slider.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
