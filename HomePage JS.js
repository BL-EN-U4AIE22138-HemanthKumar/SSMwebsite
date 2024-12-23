let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let slideInterval; // Declare a variable to hold the interval ID

function showSlide(index) {
  slideIndex = (index + totalSlides) % totalSlides; // Ensure circular navigation
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function changeSlide(direction) {
  showSlide(slideIndex + direction);
  resetAutoSlide(); // Reset auto-slide when user manually changes the slide
}

// Optional: Auto-slide functionality
function startAutoSlide() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 3000); // Change slide every 3 seconds
}

function resetAutoSlide() {
  clearInterval(slideInterval); // Clear the existing interval
  startAutoSlide(); // Restart auto-slide
}

startAutoSlide(); // Start the auto-slide functionality when the page loads
