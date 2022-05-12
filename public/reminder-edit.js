"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker
          .register('../serviceWorker.js')
          .then(res => console.log('Service worker registered'))
          .catch(err => console.log('Service worker not registered', err))
  }) 
}

const bodyElement = document.querySelector("#reminder-body");
const createElement = document.querySelector("#create-reminder");
const reminderId = location.hash.substring(1);
const submitBtn = document.querySelector("#submit");
let reminders = getSavedreminders();
let reminder = reminders.find((reminder) => reminder.id === reminderId);

/*if (!reminder) {
  location.assign("index.html");
}
*/



createElement.addEventListener("click", (e) => {

  e.preventDefault();
  //location.assign("index.html");
  window.location.href = "index.html";
});

submitBtn.addEventListener("click", (e) => {

  e.preventDefault();
  //location.assign("index.html");
  window.location.href = "index.html";
});

window.addEventListener("storage", (e) => {
  if (e.key === "reminders") {
    reminders = JSON.parse(e.newValue);
    reminder = reminders.find((reminder) => reminder.id === reminderId);

    if (!reminder) {
      location.assign("index.html");
    }

    titleElement.value = reminder.title;
    bodyElement.value = reminder.body;
  }
});