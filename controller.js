'strict mode'
import { slider } from "./slider.js";
import { getPopularMovies, getTopMovies, getActionMovies, getAdventureMovies,
   getScifiMovies, getTopBoxOfficeMovies, removeListeners, slideListener, navigateSections, formatString } from "./view.js";
import { getAPIData, modalCall, searchCall } from "./model.js";
import { showModal, showSearchModal } from "./modalView.js";

const renderData = async function() {
    const data = await getAPIData();
    console.log(data);
    getPopularMovies(data[0].movies);
    // apicall();
    loadResults(data);
    navigateSections(data);
}

const loadResults = function(data) {

  document.querySelector('.show-button').addEventListener('click', function() {
    document.querySelector('.show-button').style.display = 'none';

    removeListeners();
    getTopMovies(data[1].movies);
    getActionMovies(data[2].movies);
    getAdventureMovies(data[3].movies);
    getScifiMovies(data[4].movies);
    getTopBoxOfficeMovies(data[5].movies);
    slideListener();
  });
}

const searchListener = function() {
  const input = document.querySelector('.search-field');
  const inputGlass = document.querySelector('.fa-magnifying-glass');

  inputGlass.addEventListener('click', async function() {
    const movieText = input.value;
    if(movieText && movieText !== ''){
      const formattedMovie = formatString(movieText);
      input.value = '';
      const searchData  = await searchCall(formattedMovie);
      showSearchModal(searchData);
    }
  });
}

export const getMovieData = async function(movieName= [], year='') {
  const movieDetails = await modalCall(movieName,year);
  showModal(movieDetails);
}

const init = function() {
  renderData();
  slider();
  searchListener();
}

init();
