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


{{{{{{{{}}}}}}}}
()()()()()()
// END OF NAV FUNCTIONS

// CAROUSEL FUNCTIONS
/* 
    Carousel must be in this structure:
        <div class="gallery-carousel">
            <div class="carousel">
                <a class="carousel-button carousel-prev" onclick="carouselPrev(this)">
                    <!-- left button icon -->
                </a>

                <span class="carousel-position">0</span>

                <img class="carousel-image" src="<!-- First image -->" alt="">

                <a class="carousel-button carousel-next" onclick="carouselNext(this)">
                    <!-- right button icon -->
                </a>
            </div>

            <div class="carousel-thumbs">
                <!-- Images -->
            </div>
        </div>
*/
// Previous image
function carouselPrev(elem) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-position")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-thumbs")[0];

    var carouselLength = carouselThumbs.childElementCount;


    if (carouselPos.innerHTML > 0) {
        carouselPos.innerHTML = carouselPos.innerHTML - 1;
    } else {
        carouselPos.innerHTML = carouselLength-1;
    }

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML])
}

// Next image
function carouselNext(elem) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-position")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-thumbs")[0];
    
    var carouselLength = carouselThumbs.childElementCount;

    if (carouselPos.innerHTML < carouselLength-1) {
        carouselPos.innerHTML = carouselPos.innerHTML - (-1);
    } else {
        carouselPos.innerHTML = 0;
    }

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML])
}

// Show clicked image 
function carouselDisplay(elem, pos) {
    var carouselWrapper = elem.parentElement.parentElement;

    var carouselPos = carouselWrapper.getElementsByClassName("carousel-position")[0];
    var carouselImage = carouselWrapper.getElementsByClassName("carousel-image")[0];
    var carouselThumbs = carouselWrapper.getElementsByClassName("carousel-thumbs")[0];
    
    
    carouselPos.innerHTML = pos;

    copyImageAttributes(carouselImage, carouselThumbs.getElementsByTagName("img")[carouselPos.innerHTML])
}

// Copies src and alt attributes from imgElem2 to imgElem1
function copyImageAttributes(imgElem1, imgElem2) {
    imgElem1.attributes.getNamedItem("src").value = imgElem2.attributes.getNamedItem("src").value;
    imgElem1.attributes.getNamedItem("alt").value = imgElem2.attributes.getNamedItem("alt").value;

    
}
// END OF CAROUSEL FUNCTIONS