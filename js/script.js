const API_KEY = 'c25ebaf6293a1c0f487f895e7bb10cf3';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const section = document.getElementById('movie');

// Calling getMovies to get page movies
getMovies(API_URL);

// Getting the movies results from the TMDB API
async function getMovies(url) {
	const response = await fetch(url);
	const data = await response.json();

	showMovies(data.results);
}

// Looping through the "movies" results and creating the "movie" html elements
function showMovies(movies) {
	main.innerHTML = '';

	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview, id } = movie;

		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      
      <div class="movie-info">
          <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      
      <div class="overview">
         <h3>Overview</h3>
         <a onclick="movieSelected('${id}')" target="_blank"><p>${overview}</p></a>
      </div>
    `;

		main.appendChild(movieElement);
	});
}

// Getting the ratings and returning a color name that will be used in our CSS
function getClassByRate(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

// Storing the id for the movie selected and saving it to session storage
function movieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'moviePage.html';
	return false;
}

// Event listener for the search bar
form.addEventListener('submit', (event) => {
	event.preventDefault();

	const searchTerm = search.value;

	if (searchTerm && searchTerm !== '') {
		getMovies(SEARCH_URL + searchTerm);

		search.value = '';
	} else {
		window.location.reload();
	}
});
