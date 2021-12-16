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
    let navElem = document.getElementById("primary-nav");

    if (window.pageYOffset > lastScrollY) {
        navElem.classList.add("scroll-down");

    } else {
        navElem.classList.remove("scroll-down");
    }
    lastScrollY = window.pageYOffset;
}

// END OF NAV FUNCTIONS

// CAROUSEL FUNCTIONS
function carouselInitAll() {
    
}

// Returns elements and values of the carousel
function carouselGetProperties(elem) {
    let wrapperElem = elem.parentElement.parentElement;

    let posDataElem = wrapperElem.getElementsByClassName("carousel-pos-data")[0];
    let posElem = wrapperElem.getElementsByClassName("carousel-pos")[0];
    let imageMainElem = wrapperElem.getElementsByClassName("carousel-image")[0];
    let imagesWrapperElem = wrapperElem.getElementsByClassName("carousel-images-thumbs")[0]
    
    // Gets the size of the list of images
    let count = parseInt(imagesWrapperElem.childElementCount);

    return {
        posDataElem,
        posElem,
        imageMainElem,
        imagesWrapperElem,
        count
    };
}
// Moves to previous image in carousel
function carouselPrev(elem) {
    let {posDataElem, count} = carouselGetProperties(elem);
    
    if (posDataElem.innerHTML > 0) {
        posDataElem.innerHTML = parseInt(posDataElem.innerHTML) - 1;
    } else {
        posDataElem.innerHTML = count - 1;
    }

    carouselUpdate(elem);
}
// Moves to next image in carousel
function carouselNext(elem) {
    let {posDataElem, count} = carouselGetProperties(elem);
    
    if (posDataElem.innerHTML < count - 1) {
        posDataElem.innerHTML = parseInt(posDataElem.innerHTML) + 1;
    } else {
        posDataElem.innerHTML = 0;
    }

    carouselUpdate(elem);
}
// Sets to specified image in carousel
function carouselSetTo(elem, pos) {
    let {posDataElem} = carouselGetProperties(elem);
    
    posDataElem.innerHTML = pos

    carouselUpdate(elem);
}

// Updates the carousel with the new position
function carouselUpdate(elem) {
    let {posDataElem, posElem, imageMainElem, imagesWrapperElem, count} = carouselGetProperties(elem)
    
    let imageElems = imagesWrapperElem.getElementsByTagName("img");

    // Src and alt attributes of the current image is copied to the main image
    imageMainElem.attributes.getNamedItem("src").value = imageElems[Number(posDataElem.innerHTML)].attributes.getNamedItem("src").value;
    imageMainElem.attributes.getNamedItem("alt").value = imageElems[Number(posDataElem.innerHTML)].attributes.getNamedItem("alt").value;

    // Updates the current position label
    posElem.innerHTML = (parseInt(posDataElem.innerHTML) + 1).toString() + " / " + count.toString();

    // Sets the class of the selected image to selected
    for (let i = 0; i < count; i++) {
        imageElems[i].classList.remove("carousel-current");
    }
    imageElems[Number(posDataElem.innerHTML)].classList.add("carousel-current");
}
// END OF CAROUSEL FUNCTIONS

// FORM VALIDATION
// Open modal contacts form
function toggleContactModal() {
    let elem = document.getElementById("contact-modal");
    let body = document.getElementsByTagName("body")[0];
    elem.classList.toggle("modal-open");
    if (elem.classList.contains("modal-open")) {
        body.classList.add("no-scroll");
    } else {
        
        body.classList.remove("no-scroll");
    }
}
function validateForm() {
    return false;
}