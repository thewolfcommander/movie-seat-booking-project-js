const container = document.querySelector('.container');
const seat = document.querySelectorAll('.seat .seat:not(.occupied)');

const movie = document.getElementById('movie');
let ticketPrice = +movie.value;

const count = document.getElementById('count')
const total = document.getElementById('total')

// Function to update count
const updateCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}


// Function for encountering price change of ticket
movie.addEventListener('change', e => {
    ticketPrice = e.target.value;

    updateCount();
})


// Event listener for click on seat
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateCount();
    }
})