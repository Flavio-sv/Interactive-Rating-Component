const circles = document.querySelectorAll(".background-circle");
const submitButton = document.querySelector('button[type="submit"]');
const ratingState = document.querySelector(".rating-state");
const thankYouState = document.querySelector(".thank-you-state");
const selectedRatingText = document.querySelector(".selected-rating-feedback");
const thankYouTitle = document.querySelector("#thank-you-title");
let selectedRating = null;

circles.forEach((circle) => {
  const input = circle.querySelector('input[type="radio"]');

  circle.setAttribute("tabindex", "0");
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
    thankYouTitle.focus();
    thankYouTitle.setAttribute("tabindex", "-1");
    thankYouTitle.removeAttribute("tabindex");
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

submitButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});
