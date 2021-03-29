const packmanImage = document.getElementById('packman-image');
const packmanImages = {
    'ltr': ['images/ltr-open.png', 'images/ltr-closed.png'],
    'rtl': ['images/rtl-open.png', 'images/rtl-closed.png'],
}
let pos = { 'posX': 0, 'posY': 0 };
let direction = 0;
let toggle = 0;
let distance = 5

function getScreenWidth() {
    // returns the current width of the browser screen
    return window.innerWidth;
}

function getElementWidth(domElem) {

    return domElem.style.width;
}

function getElementHeight(domElem) {
    return domElem.style.height;
}

function toggleDirection(domElem, posX, direction) {
    /* determines if an object has crossed the 
       left or right border of the screen
       if it has, it reverses the direction.
       params: domElem is the element that moves accorss the screen
       posX is the position of domElement in the x axis
       direction is 0 for right to left, and 1 for the reverse */

    let screenWidth = getScreenWidth();

    let elemWidth = parseInt(getElementWidth(domElem));

    if ((posX + elemWidth) > screenWidth || (posX + elemWidth) < 0) {
        direction = (direction + 1) % 2;
    }

    if (posX == 0) {
        direction = direction;
    }

    return direction;
}

function zeroOrOneToggler(zeroOrOne) {
    /*
        takes a zero or one value and toggles it
    */
    return (zeroOrOne + 1) % 2;
}


function moveX(domElem, pos, distance, direction) {
    /*
        sets domElement position based on direction of motion
        domElem: DOM element to be moved
        pos: dictionaryu holding position X and Y
        disgtance: how much movement per setInterval fire
        direction: 0 or 1;
     */
    if (direction) {
        pos.posX -= distance;

    } else {
        pos.posX += distance;
    }
    domElem.style.left = pos.posX + 'px';
}

function setImage(packmanImage, packmanImages, direction, toggle) {
    /* determines which image to display aon each setInterval call 
    *  params: packmanImage : domElement img element that holds packman images
        packmanImages: dictionary containing all four packman images
        direction: 0 to go right to left, 1 for left to right
        toggle: 0 or 1 to display open or closed packlman oimage
    */
    if (direction) {
        packmanImage.src = packmanImages['rtl'][toggle];
    } else {
        packmanImage.src = packmanImages['ltr'][toggle];
    }
}

function initializeImage(domElement) {
    domElement.src = packmanImages.ltr[0]; // initialize to first ltr image
    domElement.style.position = 'absolute';
    domElement.style.top = '0px';
    domElement.style.left = '0px';
    domElement.style.width = '50px';
    domElement.style.height = '50px';
    console.log("initialized!")
}

initializeImage(packmanImage);

setInterval(() => {
    direction = toggleDirection(packmanImage, pos.posX, direction);
    toggle = zeroOrOneToggler(toggle);
    setImage(packmanImage, packmanImages, direction, toggle);
    moveX(packmanImage, pos, distance, direction);
    console.log(pos);
}, 100);