const timelineCircles = document.querySelectorAll(".timeline-circle");
const contentItems = document.querySelectorAll(".content-item");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentIndex = 0;

function updateTimeline(direction = null) {
  const currentContent = document.querySelector(".content-item.active");
  if (currentContent) {
    currentContent.classList.remove("active");
    if (direction === "next") {
      currentContent.classList.add("exit-left");
    } else if (direction === "prev") {
      currentContent.classList.add("exit-right");
    }
    setTimeout(() => {
      currentContent.classList.remove("exit-left", "exit-right");
      currentContent.style.display = "none";
    }, 500);
  }

  timelineCircles.forEach((circle, index) => {
    circle.classList.toggle("active", index === currentIndex);
  });

  const newContent = contentItems[currentIndex];
  if (newContent) {
    newContent.style.display = "block";
    setTimeout(() => {
      newContent.classList.add("active");
    }, 10);
  }

  const progress = (currentIndex / (timelineCircles.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === timelineCircles.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateTimeline("prev");
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < timelineCircles.length - 1) {
    currentIndex++;
    updateTimeline("next");
  }
});

timelineCircles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    const direction = index > currentIndex ? "next" : "prev";
    currentIndex = index;
    updateTimeline(direction);
  });
});

// Swipe functionality for mobile
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  const delta = endX - startX;

  if (delta > 50 && currentIndex > 0) {
    currentIndex--;
    updateTimeline("prev");
  } else if (delta < -50 && currentIndex < timelineCircles.length - 1) {
    currentIndex++;
    updateTimeline("next");
  }
});
