const optionWrap = document.querySelector('.option-top');
const colValue = optionWrap.querySelector('#grid-col-value');
const rowValue = optionWrap.querySelector('#grid-row-value');
const menuWrap = document.querySelector('menu');
const container = document.querySelector('.container');

let currentColor = menuWrap.querySelector('#btn-color').value;
let erase = false;
let paint = true;
let mouseDown = false;

const checker = (event) => {
  const currId = document.elementFromPoint(event.clientX, event.clientY).id;
  const columns = Array.from(container.querySelectorAll('.gridCol'));

  columns.forEach((column) => {
    if (column.id !== currId) return;

    if (!(paint || erase)) return;

    column.style.backgroundColor = paint ? currentColor : 'transparent';
  });
};

const handleColumColor = () => {
  container.addEventListener('mousedown', (e) => {
    const current = e.target;
    mouseDown = true;

    if (current.className !== 'gridCol') return;

    current.style.backgroundColor = paint ? currentColor : 'transparent';
  });

  container.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;
    if (e.target.className !== 'gridCol') return;
    checker(e);
  });
};

const createGrid = (col, row) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  let count = 0;

  for (let i = 0; i < row; i += 1) {
    count += 2;
    const rowEl = document.createElement('div');
    rowEl.className = 'gridRow';

    for (let j = 0; j < col; j += 1) {
      count += 2;
      const colEl = document.createElement('div');

      colEl.className = `gridCol`;
      colEl.id = `gridCol${count}`;
      rowEl.appendChild(colEl);
    }
    fragment.appendChild(rowEl);
  }

  container.appendChild(fragment);
  handleColumColor();
};

const clearGrid = () => {
  container.innerHTML = '';
};

menuWrap.addEventListener('click', (e) => {
  const menu = e.target;
  const menus = {
    'btn-create': (col, row) => createGrid(col, row),
    'btn-clear': clearGrid,
    'btn-erase': () => {
      erase = true;
      paint = false;
    },
    'btn-paint': () => {
      erase = false;
      paint = true;
    },
  };

  menus[menu.id]?.(optionWrap.querySelector('#col').value, optionWrap.querySelector('#row').value);
});

menuWrap.querySelector('#btn-color').addEventListener('input', (e) => {
  currentColor = e.target.value;
});

optionWrap.addEventListener('input', (e) => {
  const current = e.target;

  optionWrap.querySelector(`#grid-${current.id}-value`).innerHTML = current.value;
});
