import { getMovieData } from "./controller.js";

const renderHTML = function(movieData, type, id, no = 0) {
    const slidesHTML = movieData.map(movie => slide(movie)).join('');
    // console.log(slidesHTML);
    return `
        <div class="slide-container" ${no === 1 ? `id="${id}"` : ''}>    
            ${no === 1 ? `
                <div class="head">
                    <h2>${type}</h2>
                </div>
                ` : ''}
                <div class="movies-container">
                    ${slidesHTML}
                </div>
        </div>
    `;
}


const renderButton = function() {
    return `
        <div class="show-button">
            <hr>
            <button>show More</button>
        </div>
    `;
}

const slide = function(movie) {
    let ratingText = '';
    if(movie.rating){
        const ratings = movie.rating.match(/[\d.]+|\([^)]+\)/g);
        ratingText = ratings ? `${ratings[0]}/10` : 'N/A';
    }else{
        const ratings = movie.imdbRating.match(/[\d.]+|\([^)]+\)/g);
        ratingText = ratings ? `${ratings[0]}/10` : 'N/A'; 
    }

    const image = movie.image ? movie.image : movie.posterImage;
    return `
        <div class="slides">
            <div class="movie-image">
                <img src="${image}" alt="">
            </div>
            <div class="movie-desc">
                <h4 class="title">&nbsp;&nbsp;&nbsp;${movie.title}</h4>
                <div class="more-info">
                    ${movie.year ? `<p class="release">${movie.year}</p>` :''}
                    ${movie.timeline ? `<p>${movie.timeline}</p>` :''}
                    <p>${ratingText}</p>
                </div>
            </div>
        </div>
    `;   
}


const getDataFive = function(data, start, end = start + 5) {
    return data.slice(start, end);
};

const movies = document.querySelector('.movies');

const render = function(data, type ,id) {
    const firstFive = getDataFive(data, 0);
    const nextFive = getDataFive(data, 5);
    
    const renderedFirst = renderHTML(firstFive, type, id, 1);
    const renderedNext = renderHTML(nextFive, type, id);

    return [renderedFirst, renderedNext];
}

export const removeListeners = function() {
    const elements = document.querySelectorAll('.slides');

    elements.forEach(element => {
        const clone = element.cloneNode(true); // Create a deep clone of the element

        // Replace the original element with the clone
        element.parentNode.replaceChild(clone, element);
    });
}

const insertHTML = function(renderedMoviesHTML) {
    movies.insertAdjacentHTML('beforeend', renderedMoviesHTML[0]);
    movies.insertAdjacentHTML('beforeend', renderedMoviesHTML[1]);
}

export const getPopularMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Most Popular', 'popular');
    insertHTML(renderedMoviesHTML);
    movies.insertAdjacentHTML('beforeend', renderButton());
    slideListener();
}


export const getTopMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Top 10', 'top-ten-movies');
    insertHTML(renderedMoviesHTML);
}

export const getActionMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Action', 'action');
    insertHTML(renderedMoviesHTML);
}

export const getAdventureMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Adventure', 'Adventure');
    insertHTML(renderedMoviesHTML);
}

export const getScifiMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Science Fiction', 'scifi');
    insertHTML(renderedMoviesHTML);
}

export const getTopBoxOfficeMovies = function(data) {
    const filteredData = data.filter((movie, i) => i < 10);
    const renderedMoviesHTML = render(filteredData, 'Top Box Office', 'top-box-office');
    insertHTML(renderedMoviesHTML);
}

const settle = function(data) {
    document.querySelector('.show-button').style.display = 'none';
    getTopMovies(data[1].movies);
    getActionMovies(data[2].movies);
    getAdventureMovies(data[3].movies);
    getScifiMovies(data[4].movies);
    getTopBoxOfficeMovies(data[5].movies);
    slideListener();
}

export const navigateSections = function(data) {
    const lists = document.querySelectorAll('.list');

    let settled = false;
    const callSettleOnce = () => {
        if (!settled) {
            settle(data);
            settled = true;
        }
    };

    lists.forEach((list) => {
        list.addEventListener('click', function(event,) {

            const id = event.target.id;
            let section;

            lists.forEach(list => {
                list.classList.remove('active-list');
            });

            list.classList.add('active-list');
            callSettleOnce();

            const settleAndScroll = (targetSectionId) => {
                section = document.getElementById(targetSectionId);
                section.scrollIntoView({ behavior: 'smooth' });
            };

            if (id === 'most-popular') {
                settleAndScroll('popular');
            } else if (id === 'top-ten') {
                settleAndScroll('top-ten-movies');
            } else if (id === 'genres') {
                settleAndScroll('action');
            } else if (id === 'box-office') {
                settleAndScroll('top-box-office');
            }
        });
    });
}

export const slideListener = function() {
    const slides = document.querySelectorAll('.slides');
    let movieName;
  
    slides.forEach(slide => {
      slide.addEventListener('click', function(event) {
        const h4Element = slide.querySelector('.title');
        const para = slide.querySelector('.release');

        // console.log(h4Element, para);

        if (h4Element && para) {
            const movieTitle = h4Element.textContent;
            const year = para.textContent;
            movieName =  formatString(movieTitle);
            getMovieData([movieName.trim(), movieTitle.trim()], +year);
        }
        // else if(h4Element) {
        //     const movieTitle = h4Element.textContent;
        //     movieName =  formatString(movieTitle);
        //     getSearchMovieData(movieName);
        // }
      });
    });

    return movieName;
}

export function formatString(input) {
    const words = input.trim().split(/\s+/);
    
    if (words.length > 1) {
        return words.join('+');
    } else {
        return input;
    }
}