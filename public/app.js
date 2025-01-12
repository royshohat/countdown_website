const eventList = document.querySelector(".event-list");

var upComingEvents = [];


function addItemToList(nameOfTheEvent, dateOfTheEvent) {
    const eventContainer = document.createElement("div");
    eventContainer.className = "event-item";

    // Add the event name
    const eventTitle = document.createElement("h2");
    eventTitle.textContent = nameOfTheEvent;
    eventContainer.appendChild(eventTitle);

    // Add the deadline container (time units)
    const deadlineContainer = document.createElement("div");
    deadlineContainer.className = "deadline";

    // Create references for time elements
    const timeElements = {};

    // Array of time units
    const timeUnits = ["days", "hours", "minutes", "seconds"];

    // Generate the HTML for each time unit
    timeUnits.forEach(unit => {
        const formatDiv = document.createElement("div");
        formatDiv.className = "deadline-format";

        const valueElement = document.createElement("h4");
        valueElement.className = unit;
        valueElement.textContent = "0"; // Initial placeholder value

        const labelElement = document.createElement("span");
        labelElement.textContent = unit;

        // Append h4 and span to the formatDiv
        formatDiv.appendChild(valueElement);
        formatDiv.appendChild(labelElement);

        // Store the element reference
        timeElements[unit] = valueElement;

        // Append formatDiv to the deadline container
        deadlineContainer.appendChild(formatDiv);
    });

    // Append the deadline container to the event container
    eventContainer.appendChild(deadlineContainer);

    // Append the event container to the event-list section
    placeupcoming.appendChild(eventContainer);

    // Add the event to the list with its time elements
    upComingEvents.push({
        name: nameOfTheEvent,
        date: dateOfTheEvent,
        elements: timeElements,
    });
}

const eventForm = document.getElementById("event-form");
const placeupcoming = document.getElementById("event-list");
eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const eventDate = document.getElementById("event-date").value;

    // Convert eventDate to a timestamp
    const eventDateValue = new Date(eventDate).getTime();

    // Use addItemToList to create and append the event
    addItemToList(eventName, eventDateValue);

    // Reset the form
    eventForm.reset();
});

// one day in miliseconds = 1000 * 60 * 60 * 24 = 86400000
// one hour in miliseconds = 1000 * 60 * 60 = 3600000
// one minute in miliseconds = 1000 * 60 = 60000
// one second in miliseconds = 1000

function updateTime(event) {
    const { date, elements } = event;

    const now = new Date().getTime();
    const time = date - now;

    if (time < 0) {
        // If the event time has passed
        elements.days.textContent = "0";
        elements.hours.textContent = "0";
        elements.minutes.textContent = "0";
        elements.seconds.textContent = "0";
        return;
    }

    const days = Math.floor(time / 86400000);
    const hours = Math.floor((time % 86400000) / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    // Update the corresponding HTML elements
    elements.days.textContent = days;
    elements.hours.textContent = hours;
    elements.minutes.textContent = minutes;
    elements.seconds.textContent = seconds;
}

let countdown = setInterval(loopthrough, 1000);

function loopthrough(){
    upComingEvents.forEach(event => {
        updateTime(event)
    })
}
loopthrough();