"use strict";

const titleElement = document.querySelector("#reminder-title");
const bodyElement = document.querySelector("#reminder-body");
const createElement = document.querySelector("#create-reminder");
const reminderId = location.hash.substring(1);
const titleId = document.querySelector()
let reminders = getSavedreminders();
let reminder = reminders.find((reminder) => reminder.id === reminderId);

/*if (!reminder) {
  location.assign("index.html");
}
*/
titleElement.value = reminder.title;
bodyElement.value = reminder.body;

titleElement.addEventListener("input", (e) => {
  reminder.title = e.target.value;
  reminder.updatedAt = moment().valueOf();
  savereminders(reminders);
});

bodyElement.addEventListener("input", (e) => {
  reminder.body = e.target.value;
  reminder.updatedAt = moment().valueOf();
  savereminders(reminders);
});

createElement.addEventListener("click", (e) => {

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