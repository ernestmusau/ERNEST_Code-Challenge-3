// Define the endpoint for movie data
const db = "http://localhost:3000/films";

// Wait for the DOM content to be loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display movies when the page loads
    getMovies();
    // Add event listener to the "Buy Ticket" button
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

// Function to fetch movies from the server
function getMovies() {
    fetch(db)
    .then(res => res.json()) // Convert the response to JSON format
    .then(movies => {
        // Render each movie in the list
        movies.forEach(movie => { renderMovieList(movie) });
        // Programmatically click the first movie in the list to show its details
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    })
}

// Function to render a movie in the list
function renderMovieList(movie) {
    // Create a list item for the movie
    const li = document.createElement("li");
    li.textContent = `${movie.title}`; // Set the text content of the list item to the movie title
    li.id = "id" + movie.id; // Set the id of the list item based on the movie id
    const ul = document.querySelector("#films"); // Get the unordered list element
    ul.appendChild(li); // Append the list item to the unordered list
    // Add CSS classes and click event listener to the movie item
    li.classList.add("film");
    li.classList.add('item');
    li.addEventListener("click", () => { handleMovieClick(movie) }); // Call handleMovieClick() when the movie item is clicked
}

// Function to handle movie click event and display movie details
function handleMovieClick(movie) {
    // Update movie details in the UI based on the clicked movie
    const poster = document.querySelector("img#poster");
    poster.src = movie.poster; // Set the poster image source
    poster.alt = movie.title; // Set the alt text for the poster image
    const info = document.querySelector("#showing"); // Get the movie info container
    // Update movie details in the container
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime + " minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}

// Function to handle "Buy Ticket" button click event
function handleBuyTicket(e) {
    // Get the remaining ticket count from the UI
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    // Check if there are available tickets
    if (tickets > 0) {
        // Decrease the remaining ticket count and update UI
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    } else if (tickets == 0) {
        // Alert the user if no more tickets are available
        alert("No more tickets!");
        // Update button style to indicate it's sold out
        e.target.classList.add("sold-out");
        e.target.classList.remove("orange");
    }
}

