// Initialisation
window.onload = function() {

};

// NAV FUNCTIONS
// Toggle mobile nav
function toggleNav() {
    document.getElementById("primary-nav").classList.toggle("nav-open");
}
// Hide desktop nav on scroll down
var lastScrollY = window.pageYOffset;
window.onscroll = function() {
    navElem = document.getElementById("primary-nav");

    if (window.pageYOffset > lastScrollY) {
        navElem.classList.add("scroll-down");

    } else {
        navElem.classList.remove("scroll-down");
    }
    lastScrollY = window.pageYOffset;
}

// END OF NAV FUNCTIONS

// CAROUSEL FUNCTIONS
// Previous image

var carouselWrapper = elem.parentElement.parentElement;

var carouselPos = carouselWrapper.getElementsByClassName("carousel-pos-data")[0];
var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-images-thumbs")[0];

var carouselLength = carouselThumbs.childElementCount;

function carouselInitAll() {
    var targetElements = document.getElementsByClassName("carousel");
    
}
function carouselGetProperties(elem) {

}
function carouselPrev(elem) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-pos-data")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-images-thumbs")[0];

    var carouselLength = carouselThumbs.childElementCount;


    if (carouselPos.innerHTML > 0) {
        carouselPos.innerHTML = carouselPos.innerHTML - 1;
    } else {
        carouselPos.innerHTML = carouselLength-1;
    }

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML]);
    for (let i = 0; i < carouselLength; i++) {
        carouselThumbs.getElementsByTagName("img")[i].classList.remove("carousel-current");  
    }
    carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML].classList.add("carousel-current");
}

// Next image
function carouselNext(elem) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-pos-data")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-images-thumbs")[0];
    
    var carouselLength = carouselThumbs.childElementCount;

    if (carouselPos.innerHTML < carouselLength-1) {
        carouselPos.innerHTML = carouselPos.innerHTML - (-1);
    } else {
        carouselPos.innerHTML = 0;
    }

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML]);
}

// Show clicked image 
function carouselDisplay(elem, pos) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-pos-data")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-images-thumbs")[0];
    
    var carouselLength = carouselThumbs.childElementCount;

    carouselPos.innerHTML = pos;

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML]);
    for (let i = 0; i < carouselLength; i++) {
        carouselThumbs.getElementsByTagName("img")[i].classList.remove("carousel-current");  
    }
    carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML].classList.add("carousel-current");
}

// Copies src and alt attributes from imgElem2 to imgElem1
function copyImageAttributes(targetImg, originImg) {
    targetImg.attributes.getNamedItem("src").value = originImg.attributes.getNamedItem("src").value;
    targetImg.attributes.getNamedItem("alt").value = originImg.attributes.getNamedItem("alt").value;
}
// END OF CAROUSEL FUNCTIONS