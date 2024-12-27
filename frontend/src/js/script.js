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
    dots[slideIndexes[slideshowId] - 1].class += " active";
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




let currentIndex = 1;
        showSlide(currentIndex);

        // Function to navigate through slides (next/previous)
        function moveSlide(step) {
            showSlide(currentIndex += step);
        }

        // Function to show the selected slide by index
        function jumpToSlide(index) {
            showSlide(currentIndex = index);
        }

        // Function to display the current slide and hide others
        function showSlide(index) {
            let i;
            let frames = document.getElementsByClassName("slideshow-frame");
            let dots = document.getElementsByClassName("slideshow-dot");

            if (index > frames.length) {currentIndex = 1}
            if (index < 1) {currentIndex = frames.length}

            // Hide all slides
            for (i = 0; i < frames.length; i++) {
                frames[i].style.display = "none";
                frames[i].style.transform = "translateX(100%)"; // Reset position
            }

            // Remove current class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" current", "");
            }

            // Display the current slide with a slide-in transition from the right
            frames[currentIndex-1].style.display = "block";
            frames[currentIndex-1].style.transform = "translateX(0)";
            dots[currentIndex-1].className += " current";
        }

        // Automatically change the slide every 5 seconds
        setInterval(function() {
            moveSlide(1);
        }, 3000); // Change slide every 3 seconds (3000 milliseconds)