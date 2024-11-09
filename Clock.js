var numberHours = document.querySelector('.number_hours');
var secondsBar = document.querySelector('.seconds_bar');
var numberElement = [];
var barElement = [];

// ------- Clock Numbers ------- //

for (let i = 1; i <= 12; i++) {
    numberElement.push(
        `<span style=" --index:${i}"><p>${i}</p></span>`
    );
}

numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));
console.log(numberHours);

var barElement = [];

// ------- Clock Seconds Bars ------- //

for (let i = 1; i <= 60; i++) {
    barElement.push(
        `<span style=" --index:${i}"><p></p></span>`
    );
}

secondsBar.insertAdjacentHTML("afterbegin", barElement.join(""));
console.log(secondsBar);

// ------- Clock Time ------- //

const handHours = document.querySelector('.hand.hour');
const handMinutes = document.querySelector('.hand.minute');
const handSeconds = document.querySelector('.hand.second');

// Create the sound object and set it up for repeated use
const sound = new Audio('./audio/audio_sound.wav');
let isAudioPlaying = false; // Track if audio is currently playing

let isClockStarted = false; // Flag to check if the clock has started

// Start the clock when the button is clicked
document.getElementById('startButton').addEventListener('click', () => {
    if (!isClockStarted) {
        isClockStarted = true;
        startClock();
        document.getElementById('startButton').disabled = true; // Disable button after starting
    }
});

const startClock = () => {
    const getCurrentTime = () => {
        let date = new Date(),
            currentHours = date.getHours(),
            currentMinutes = date.getMinutes(),
            currentSeconds = date.getSeconds();

        // Normalize 12-hour format for hours
        currentHours = currentHours % 12; // Get 12-hour format

        // Calculate rotation in degrees
        const hr_to_deg = (currentHours + currentMinutes / 60) * 30; // hours degree
        const min_to_deg = (currentMinutes + currentSeconds / 60) * 6; // minutes degree
        const sec_to_deg = currentSeconds * 6; // seconds degree

        // Apply rotation to hands
        handHours.style.transform = `rotate(${hr_to_deg}deg)`;
        handMinutes.style.transform = `rotate(${min_to_deg}deg)`;
        handSeconds.style.transform = `rotate(${sec_to_deg}deg)`;

        // Play the sound, but only if it's not already playing
        if (sound.paused || sound.currentTime >= sound.duration) {
            sound.currentTime = 0; // Reset to the beginning of the sound
            sound.play()
                .then(() => {
                    console.log("Sound played.");
                })
                .catch(error => {
                    console.log("Error playing audio:", error);
                });
        }
    };

    setInterval(getCurrentTime, 1000); // Update every second
    getCurrentTime(); // Initialize the clock immediately
};
