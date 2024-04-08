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
    const li = document.createElement("li");
    li.textContent = `${movie.title}`;
    li.id = "id" + movie.id;

// Add a delete button that deletes a movie from the list and server
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", (event) => {


// Stop event from bubbling up the delete button
        event.stopPropagation();
        deleteMovie(movie.id);
    });

    li.appendChild(deleteButton);

    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add('item');
    li.addEventListener("click", () => {handleMovieClick(movie)});
}

// Function to handle the deletion of a movie
function deleteMovie(movieId) {
fetch(`${db}/${movieId}`, {
    method: "DELETE",
})
.then(response => {
    if (response.ok) {
        // Remove the movie from the list in the UI
        const movieElement = document.querySelector("#id" + movieId);
        movieElement.remove();
    } else {
        throw new Error('Failed to delete movie');
    }
})
.catch(error => {
    console.error('Error deleting movie:', error);
});
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



function handleBuyTicket(btn) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    }
    else  {
        let buyBtn = document.getElementById("buy-ticket")
        alert("No more tickets!");//output is given to the user that the tickets are sold out
        ticketDiv.textContent = 'Sold Out';
        buyBtn.textContent = 'Sold Out';
        buyBtn.disabled = true;
        a.target.classList.add("sold-out");
        a.target.classList.remove("orange");
    }
}
