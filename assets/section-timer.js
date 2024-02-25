let timer;
let dayElement = document.getElementById("days");
let hoursElement = document.getElementById("hours");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
let compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 183); 

timer = setInterval(function() {
  timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
  let now = new Date();
  let difference = toDate.getTime() - now.getTime();

  if (difference <= 0) {
    clearInterval(timer);
  
  } else {
    
    let seconds = Math.floor(difference / 1000) % 60;
    let minutes = Math.floor(difference / (1000 * 60)) % 60;
    let hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    dayElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }
}