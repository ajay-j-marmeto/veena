// Set the target date for the countdown (140 days from now)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 140);

function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update HTML elements with the calculated values
    document.getElementById("daysDrawer").textContent = formatTime(days);
    document.getElementById("hoursDrawer").textContent = formatTime(hours);
    document.getElementById("minutesDrawer").textContent = formatTime(minutes);
    document.getElementById("secondsDrawer").textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update to avoid delay
updateCountdown();