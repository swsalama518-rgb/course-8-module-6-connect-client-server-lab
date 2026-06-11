const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const eventList = document.querySelector("#event-list");

// Load events on page load
function loadEvents() {
    fetch("http://127.0.0.1:5000/events")
        .then(res => res.json())
        .then(events => {
            eventList.innerHTML = "";
            events.forEach(renderEvent);
        });
}

// Render one event
function renderEvent(event) {
    const li = document.createElement("li");
    li.textContent = event.title;
    eventList.appendChild(li);
}

// Handle form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter an event title");
        return;
    }

    fetch("http://127.0.0.1:5000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(newEvent => {
        loadEvents();
        titleInput.value = "";
    });
});

// initial load
loadEvents();