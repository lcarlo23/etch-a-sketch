//Create grid

const body = document.querySelector('body');
const container = document.querySelector('#container');

let squares = 16**2;

function createGrid() {
    for (let i = 0; i < squares; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        container.appendChild(div);
    }    
}

createGrid();

//write effect

container.addEventListener('mouseover', e => {
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = 'black';
    }
})

//Remove grid

function removeGrid() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.parentNode.removeChild(cell);
    }
}

//Function to modify css

const styleRules = document.styleSheets[0].cssRules;

function getSelector(selector) {
    for (let i = 0; i < styleRules.length; i++) {
        if (styleRules[i].selectorText === selector) {
            return styleRules[i];
        }
    };
}

//Change resolution

const resBtn = document.querySelector('#resolution');
let cellStyle = getSelector('.cell');

resBtn.addEventListener('click', () => {
    let input = prompt('how many squares per side do you want?');
    if (input > 100) {
        alert('Sorry, but the maximum size is 100');
    } else {
        squares = input**2;
        console.log(squares);
        removeGrid();
        createGrid();
        cellStyle.style.width = 100/input + '%';
        console.log(squares);
    }
});

//Make grid always square

let gridStyle = getSelector('#container');

function resizeGrid() {
    if (window.innerWidth > window.innerHeight) {
        gridStyle.style.width = '60vh';
        gridStyle.style.height = '60vh';
    } else if (window.innerWidth < window.innerHeight) {
        gridStyle.style.width = '60vw';
        gridStyle.style.height = '60vw';
    }
}

resizeGrid();

window.addEventListener('resize', resizeGrid);