'use strict';

console.log('hraju piskvorky');

let naTahu = 'circle';

const poleElm = document.querySelector('.hra__pole');
const imgHraje = document.querySelector('#hraje');

const circleCross = (e) => {
  if (naTahu === 'circle') {
    e.target.classList.add('policko--circle');
    imgHraje.src = 'obrazky/cross.svg';
    e.target.disabled = true;
    naTahu = 'cross';
  } else {
    e.target.classList.add('policko--cross');
    imgHraje.src = 'obrazky/circle.svg';
    e.target.disabled = true;
    naTahu = 'circle';
  }
};

poleElm.addEventListener('click', circleCross);
