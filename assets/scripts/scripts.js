// NAV FUNCTIONS - Functionality 1
// Toggle mobile nav
function toggleNav() {
    document.getElementById("primary-nav").classList.toggle("nav-open");
}
function closeNav() {
    document.getElementById("primary-nav").classList.remove("nav-open");
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

// CAROUSEL FUNCTIONS - Functionality 2
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

// FORM VALIDATION - Functionality 3
// Open modal contacts form
function openContactModal() {
    let elem = document.getElementById("contact-modal");
    let body = document.getElementsByTagName("body")[0];
    elem.classList.add("modal-open");
    body.classList.add("no-scroll");
    closeNav()
}

function closeContactModal() {
    let elem = document.getElementById("contact-modal");
    let body = document.getElementsByTagName("body")[0];
    elem.classList.remove("modal-open");
    body.classList.remove("no-scroll");

}

// Form validation
// Regex constants
const patternEmpty = /^(?![\S])$/;
const patternName = /^[^<>()\[\]\\/.,;:*\s@]+(\s{1}[^<>()\[\]\\/.,;:*\s@]+)*$/;
const patternEmail = /^([^<>()\[\]\\.,;:\s@]+(\.+[^<>()\[\]\\.,;:\s@]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

function validateForm(formElem) {
    const formName = formElem.attributes.getNamedItem("name").value;
    const outputElem = formElem.getElementsByClassName("submit-output")[0];
    let isValid = true;

    clearFormErrors(formName);

    if (validateField(formName, "name", "name") == false) {
        isValid = false;
    }
    if (validateField(formName, "email", "email") == false) {
        isValid = false;
    }

    if (validateRadioCheckboxes(formName, "reason") == false) {
        isValid = false;
    }
    if (validateRadioCheckboxes(formName, "subject") == false) {
        isValid = false;
    }

    
    if (validateField(formName, "visitor-origin") == false) {
        isValid = false;
    }
    if (validateField(formName, "message") == false) {
        isValid = false;
    }

    
    outputElem.classList.remove("success", "error");
    if (isValid == true) {
        console.log("validated");
        outputElem.classList.add("success");
        outputElem.innerHTML = "Form submitted successfully";
    } else {
        console.log("invalid form")
        outputElem.classList.add("error");
        outputElem.innerHTML = "Invalid form fields";
    }

    return isValid;
}
function validateField(formName = "", fieldName = "", format = "") {
    const field = document.forms[formName][fieldName];
    const fieldWrapper = field.parentElement;
    const value = field.value;
    const required = fieldWrapper.classList.contains("required");

    if (required == true && patternEmpty.test(value) == true) {
        fieldWrapper.classList.add("field-empty");
        return false;
    }
    if (format == "name" && patternName.test(value) == false) {
        fieldWrapper.classList.add("field-invalid-chars");
        return false;
    }
    if (format == "email" && patternEmail.test(value) == false) {
        fieldWrapper.classList.add("field-invalid-email");
        return false;
    }

    return true;
}
function validateRadioCheckboxes(formName, fieldName) {
    const fieldOptions = document.forms[formName][fieldName];
    const fieldWrapper = fieldOptions[0].parentElement.parentElement;
    const required = fieldWrapper.classList.contains("required");

    if (required == true) {
        for (let i = 0; i < fieldOptions.length; i++) {
            if (fieldOptions[i].checked) {
                return true;
            }
        }
    }

    fieldWrapper.classList.add("field-empty");
    return false;
}
function clearFormErrors(formName) {
    const formInputWrappers = document.forms[formName].getElementsByClassName("input");

    for (let i = 0; i < formInputWrappers.length; i++) {
        formInputWrappers[i].classList.remove("field-empty", "field-invalid-chars", "field-invalid-email");
    }
}

// END FORM VALIDATION 

// WRAPPER EXPAND COLLAPSED - FUNCTION 4
function toggleExpand(id) {
    wrapper = document.getElementById(id);
    wrapper.classList.toggle("expanded");
    button = wrapper.getElementsByClassName("more")[0];
    if (wrapper.classList.contains("expanded") == true) {
        button.getElementsByClassName("div-icon")[0].classList.remove("icon-arrow-down");
        button.getElementsByClassName("div-icon")[0].classList.add("icon-arrow-up");
    } else { 
        button.getElementsByClassName("div-icon")[0].classList.add("icon-arrow-down");
        button.getElementsByClassName("div-icon")[0].classList.remove("icon-arrow-up");
    }
}