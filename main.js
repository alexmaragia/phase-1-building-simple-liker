// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      // Check if the heart is empty
      if (heart.innerText === EMPTY_HEART) {
        // Try to 'like' the heart
        mimicServerCall()
          .then(() => {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          })
          .catch((error) => {
            // Show the error modal
            modalMessage.innerText = error;
            errorModal.classList.remove("hidden");

            // Hide the error modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add("hidden");
            }, 3000);
          });
      } else {
        // Unlike the heart
        heart.innerText = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
