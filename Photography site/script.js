'use strict'
const navSmooth = document.querySelector('.nav_links');
const links = document.querySelector('.nav_link');
const header = document.querySelector('.header');
const mainNav = document.querySelector('.nav');
const box = document.querySelector('.box');
const titleHidden = document.querySelector('.person_title');
const hidden = document.querySelector('.hidden2');
const hidden3 = document.querySelector('.hidden3');
const sectionDescription = document.querySelector('.section_3_description');


// // // Sticky navigation: Intersection Observer API
const navHeight = mainNav.getBoundingClientRect().height;

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

const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase();
}
console.log(oneWord('LOV E'));

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ')
}
// ...others = rest
// [first, ...others] = destructuring assigment 
const transformer = function(str, fn){
     
}

// const openText = function(){
//   titleHidden.classList.remove('hidden2');
// }

// const closeText = function(){
//   titleHidden.classList.add('hidden2');
// }


// // box.addEventListener('mouseenter', openText);
// box.addEventListener('mouseover', openText)
// box.addEventListener('mouseout', closeText);

