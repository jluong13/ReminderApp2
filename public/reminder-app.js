"use strict";

const create_reminder = document.getElementById("create-reminder");
let reminders = getSavedreminders();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

create_reminder.addEventListener("click", (e) => {
  // Prevent the default submission of the form
  e.preventDefault();

  window.location.href = "create_reminder.html";
  
})
renderreminders(reminders, filters);

document.querySelector("#create-reminder").addEventListener("click", (e) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  reminders.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  savereminders(reminders);
  location.assign(`create_reminder.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderreminders(reminders, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderreminders(reminders, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "reminders") {
    reminders = JSON.parse(e.newValue);
    renderreminders(reminders, filters);
  }
});