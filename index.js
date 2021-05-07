'use strict';

console.log('hraju piskvorky');

let naTahu = 'circle';

const imgHraje = document.querySelector('#hraje');
const polickoElm = document.querySelectorAll('.policko');

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
  const field = e.target;
  const winner = isWinningMove(field);

  setTimeout(() => {
    if (winner === true && getSymbol(field) === 'circle') {
      if (confirm('Vítězí hráč s kolečky. Spustit novou hru?')) {
        open(location.reload());
      }
    } else if (winner === true && getSymbol(field) === 'cross') {
      if (confirm('Vítězí hráč s křížky. Spustit novou hru?')) {
        open(location.reload());
      }
    }
  }, 150);
};

for (let i = 0; i < polickoElm.length; i += 1) {
  polickoElm[i].addEventListener('click', circleCross);
}
//pro jednotlive symboly vrati retezec "circle" nebo "cross"
const getSymbol = (field) => {
  if (field.classList.contains('policko--cross')) {
    return 'cross';
  } else if (field.classList.contains('policko--circle')) {
    return 'circle';
  }
};

const boardSize = 10;

//ocisluje jednotliva policka
const getField = (row, column) => {
  return polickoElm[row * boardSize + column];
};

//pro jednotlive policko vraci objekt s cislem radku a sloupce
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < polickoElm.length && field !== polickoElm[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;

// pro kazdy tah urci, zda je vyherni
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
