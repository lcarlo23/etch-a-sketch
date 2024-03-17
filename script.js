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

//Random Color

function randomColor() {
    let rndMath = Math.floor(Math.random() * 256);
    return rndMath;
}

//Function for darkening

function layer(element) {
    let shadow = element.style.boxShadow;
    let opacity = shadow.slice(14, 17);
    let oNum = +opacity;
    if (oNum < 1) {
        oNum += 0.1;
    } else {
        return;
    }
    let oStr = oNum.toString();
    shadow = `inset 0 0 0 1000px rgba(0, 0, 0, ${oStr})`;
    element.style.boxShadow = shadow;
}

//write effect

container.addEventListener('mouseover', e => {
    const targetStyle = e.target.style;
    if (e.target.classList.contains('cell')) {
        targetStyle.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        layer(e.target);
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
        removeGrid();
        createGrid();
        cellStyle.style.width = 100/input + '%';
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