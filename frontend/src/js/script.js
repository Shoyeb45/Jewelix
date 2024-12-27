let slideIndexes = {
    "material-slideshow": 1,
    "categories-slideshow": 1
};

// Function to move to the next slide
function plusSlides(n, slideshowId) {
    showSlides(slideIndexes[slideshowId] += n, slideshowId);
}

// Function to show the current slide
function currentSlide(n, slideshowId) {
    showSlides(slideIndexes[slideshowId] = n, slideshowId);
}

// Function to display the current slide and manage the slideshow
function showSlides(n, slideshowId) {
    let slides = document.getElementById(slideshowId).getElementsByClassName("mySlides");
    let dots = document.getElementById(slideshowId).getElementsByClassName("dot");

    // Reset to the first slide if we go past the last
    if (n > slides.length) { slideIndexes[slideshowId] = 1 }
    if (n < 1) { slideIndexes[slideshowId] = slides.length }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide
    slides[slideIndexes[slideshowId] - 1].style.display = "block";
    dots[slideIndexes[slideshowId] - 1].className += " active";
}

// Automatically change the slide every 3 seconds (3000ms)
function autoSlide(slideshowId) {
    setInterval(function() {
        plusSlides(1, slideshowId); // Move to the next slide
    }, 3000); // Adjust this value for the desired speed
}

// Start auto-sliding for both slideshows when the page loads
window.onload = function() {
    autoSlide("material-slideshow");
    autoSlide("categories-slideshow");
};
