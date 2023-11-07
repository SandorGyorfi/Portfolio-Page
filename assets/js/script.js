const textElement = document.querySelector(".matrix-text");
const whiteRabbit = document.querySelector(".white-rabbit");
const messages = [
  "Hi",
  "My name is Sandor Gyorfi. I'm an entry-level developer.",
  "It's likely that you've come to this page to check out my resume.",
  "You don't have to take either the red or the blue pill.",
  "Just follow the white rabbit...",
];
const rabbitImages = ["assets/images/rabbit1.png", "assets/images/rabbit2.png"];
let currentMessageIndex = 0;
let currentText = "";
let index = 0;
let typingInterval = 40;
let isDeleting = false;
let disappearSpeed = 2600;
let cursorVisible = true;

let currentRabbitImageIndex = 0;
let blinkInterval = getRandomInterval(3000, 5000);
let closedEyeTime = 20;

function type() {
  const currentMessage = messages[currentMessageIndex];
  if (isDeleting) {
    currentText = currentMessage.slice(0, --index);
  } else {
    currentText = currentMessage.slice(0, ++index);
  }
  textElement.textContent = currentText;

  if (isDeleting) {
    if (currentText === "") {
      isDeleting = false;
      currentMessageIndex++;
      if (currentMessageIndex === messages.length) {
        setTimeout(showWhiteRabbit, 2000);
        return;
      }
      setTimeout(type, 100);
      return;
    }
  } else {
    if (currentText === currentMessage) {
      isDeleting = true;
      setTimeout(type, disappearSpeed);
      return;
    }
  }

  setTimeout(type, typingInterval);
}

function toggleRabbitImage() {
  currentRabbitImageIndex = 1 - currentRabbitImageIndex;
  whiteRabbit.setAttribute("src", rabbitImages[currentRabbitImageIndex]);

  if (currentRabbitImageIndex === 1) {
    setTimeout(toggleRabbitImage, closedEyeTime);
  }
}

function showWhiteRabbit() {
  whiteRabbit.classList.add("visible");
  textElement.classList.add("hide-cursor");
  setTimeout(showMessage, 5000);
}

function showMessage() {
  const messageElement = document.querySelector(".rabbit-message");
  messageElement.style.display = "block";
}

function startBlinkInterval() {
  setInterval(() => {
    toggleRabbitImage();
    blinkInterval = getRandomInterval(3000, 5000);
  }, blinkInterval);
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1600);
  startBlinkInterval();

  whiteRabbit.addEventListener("click", () => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);
  });
});
