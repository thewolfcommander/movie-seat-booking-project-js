const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const movie = document.getElementById('movie');


populateUI();
let ticketPrice = +movie.value;

const count = document.getElementById('count')
const total = document.getElementById('total')



// Setting Selected Movie information to the localstorage
const setSelectedMovie = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovie', movieIndex);
    localStorage.setItem('selectedPrice', moviePrice);
}


// Function to update count
const updateCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

// Populating UI with local storage data
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length !== 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovie');

    if (selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex
    }

}


// Function for encountering price change of ticket
movie.addEventListener('change', e => {
    ticketPrice = +e.target.value;

    setSelectedMovie(e.target.selectedIndex, e.target.value);
    updateCount();
})



// Event listener for click on seat
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateCount();
    }
})

updateCount()