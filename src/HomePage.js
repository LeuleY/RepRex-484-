document.addEventListener('DOMContentLoaded', function() {

const container = document.querySelector('.muscle-groups-container');
const muscleGroupsWrapper = document.querySelector('.muscle-groups');
const muscles = document.querySelectorAll('.muscle');
const leftButton = document.querySelector('.scroll-button.left');
const rightButton = document.querySelector('.scroll-button.right');

const muscleWidth = muscles[0].offsetWidth + parseInt(getComputedStyle(muscles[0]).marginLeft) + parseInt(getComputedStyle(muscles[0]).marginRight);

let currentPosition = 0;

// Calculate max scroll position
const maxScroll = muscles.length - 4;

// Function to update scroll position
function updatePosition() {
   muscleGroupsWrapper.style.transform = `translateX(-${currentPosition * muscleWidth}px)`;

    // Update button states
    leftButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
    leftButton.style.cursor = currentPosition === 0 ? 'not-allowed' : 'pointer';

    rightButton.style.opacity = currentPosition >= maxScroll ? '0.5' : '1';
    rightButton.style.cursor = currentPosition >= maxScroll ? 'not-allowed' : 'pointer';
}

// Add click event listeners directly to the buttons
leftButton.addEventListener('click', function() {
    if (currentPosition > 0) {
        currentPosition--;
        updatePosition();
    }
});

rightButton.addEventListener('click', function() {
    if (currentPosition < maxScroll) {
        currentPosition++;
        updatePosition();
    }
});

updatePosition();
});