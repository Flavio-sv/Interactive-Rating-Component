const circles = document.querySelectorAll(".background-circle");
const submitButton = document.querySelector('button[type="submit"]');
const ratingState = document.querySelector(".rating-state");
const thankYouState = document.querySelector(".thank-you-state");
const selectedRatingText = document.querySelector(".selected-rating-feedback");
const thankYouTitle = document.querySelector("#thank-you-title");

let selectedRating = null;

// Add keyboard navigation and accessibility features to rating circles
circles.forEach((circle) => {
  const input = circle.querySelector('input[type="radio"]');
  
  // Make circles keyboard focusable
  circle.setAttribute("tabindex", "0");
  
  // Click event handler
  circle.addEventListener("click", () => {
    selectedRating = input.value;

    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }

    circles.forEach((c) => c.classList.remove("active"));
    circle.classList.add("active");
    input.checked = true;
  });
  
  // Keyboard event handler for accessibility
  circle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      circle.click();
    }
  });
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (selectedRating) {
    selectedRatingText.textContent = `You selected ${selectedRating} out of 5`;
    selectedRatingText.setAttribute("aria-live", "polite");

    ratingState.style.display = "none";
    thankYouState.style.display = "flex";
    ratingState.setAttribute("aria-hidden", "true");
    thankYouState.setAttribute("aria-hidden", "false");

    // Focus management for screen readers
    thankYouTitle.focus();
    thankYouTitle.setAttribute("tabindex", "-1");
    thankYouTitle.removeAttribute("tabindex"); // Remove tabindex after focus
  } else {
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please select a rating before submitting!";
    errorMessage.classList.add("error-message");
    errorMessage.setAttribute("role", "alert");
    errorMessage.setAttribute("aria-live", "assertive");

    // Append error message inside the form for better semantic structure
    const form = document.querySelector("form");
    form.appendChild(errorMessage);

    setTimeout(() => {
      errorMessage.classList.add("fade-out");

      setTimeout(() => {
        if (errorMessage.parentNode) {
          errorMessage.remove();
        }
      }, 300);
    }, 3000);
  }
});

// Add accessibility support for the submit button
submitButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});