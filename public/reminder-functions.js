"use strict";

// Read existing reminders from localStorage
const getSavedreminders = () => {
  const remindersJSON = localStorage.getItem("reminders");

  try {
    return remindersJSON ? JSON.parse(remindersJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the reminders to localStorage
const savereminders = (reminders) => {
  localStorage.setItem("reminders", JSON.stringify(reminders));
};

// Remove a reminder from the list
const removereminder = (id) => {
  const reminderIndex = reminders.findIndex((reminder) => reminder.id === id);

  if (reminderIndex > -1) {
    reminders.splice(reminderIndex, 1);
  }
};

// Generate the DOM structure for a reminder
const generatereminderDOM = (reminder) => {
  const reminderEl = document.createElement("a");
  const titleEl = document.createElement("p");
  const contentsEl = document.createElement("p");
  const dateEl = document.createElement("span");

  // Setup the reminder title text
  if (reminder.title.length > 0) {
    titleEl.textContent = reminder.title;
  } else {
    titleEl.textContent = "Untitled reminder";
  }
  titleEl.classList.add("title");
  reminderEl.appendChild(titleEl);

  // Setup the reminder contents text
  if (reminder.body.length > 0) {
    contentsEl.textContent = reminder.body;
  } else {
    contentsEl.textContent = "Looks Empty";
  }
  contentsEl.classList.add("contents");
  reminderEl.appendChild(contentsEl);

  // Setup the link
  reminderEl.setAttribute("href", `create_reminder.html#${reminder.id}`);
  reminderEl.classList.add("list-item");

  //Setup the date status
  dateEl.textContent = generateLastEdited(reminder.updatedAt);
  dateEl.classList.add("date");
  reminderEl.appendChild(dateEl);

  return reminderEl;
};

// Sort your reminders by one of three ways
const sortreminders = (reminders, sortBy) => {
  if (sortBy === "byEdited") {
    return reminders.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return reminders.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return reminders.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return reminders;
  }
};

// Render application reminders
const renderreminders = (reminders, filters) => {
  const remindersEl = document.querySelector("#reminders");

  reminders = sortreminders(reminders, filters.sortBy);
  const filteredreminders = reminders.filter((reminder) =>
    reminder.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  remindersEl.innerHTML = "";

  if (filteredreminders.length > 0) {
    filteredreminders.forEach((reminder) => {
      const reminderEl = generatereminderDOM(reminder);
      remindersEl.appendChild(reminderEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Create your first reminder!";
    emptyMessage.classList.add("empty-message");
    remindersEl.appendChild(emptyMessage);
  }
};

// Generate the last edited message
const generateLastEdited = (timestamp) => {
  return `${moment(timestamp).fromNow()}`;
};