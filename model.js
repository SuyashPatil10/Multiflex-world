'strict mode';

const getURL = function() {
    return [
        ['https://moviesverse1.p.rapidapi.com/most-popular-movies', // Most popular movies
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }],

        ['https://moviesverse1.p.rapidapi.com/top-250-movies', // Top 250 Movies
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }],

        ['https://moviesverse1.p.rapidapi.com/get-by-genre?genre=action', // genre - action
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }],

        ['https://moviesverse1.p.rapidapi.com/get-by-genre?genre=adventure', // genre - advcenture
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }],

        ['https://moviesverse1.p.rapidapi.com/get-by-genre?genre=sci-fi', // Genre - Sci-Fi
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }],

        ['https://moviesverse1.p.rapidapi.com/top-box-office', // Top Box Office
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b14fa7170msh32c58dfd1efd306p15fddfjsn7322b46aa31c',
                'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
            }
        }]
            ];
}


const getJSON = async function(url, options) {
    return fetch(url, options).then(res => {
        if(!res.ok) throw new Error(`Can't find the movie`);

        return res.json();
    })
}


export const getAPIData = async function() {
    try{
    const urls = getURL();

    const promises = urls.map(([url, options]) => getJSON(url, options));
    return Promise.all(promises);
    }
    catch(err){
        console.log('Error while getting the movie details');
    }
}

// 1dabe40af3bc8d54e8fdb2fe6769ca33
// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=1dabe40af3bc8d54e8fdb2fe6769ca33

const filterMovies = function(data, movieName, year) {
    let movieDetails = data.filter(response => {
        const date = new Date(response.release_date);
        const releaseYear = date.getFullYear();
        if((response.title.trim() === movieName) && (year === releaseYear)) return response;
    });

    return movieDetails;
}

export const modalCall = async function(movieName, year) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName[0]}&api_key=1dabe40af3bc8d54e8fdb2fe6769ca33`);
        const data = await response.json();
        return filterMovies(data.results, movieName[1], year);
    }
    catch(err){
        console.log(`Sorry couldn't find search result`);
    }
}

const filterSearchResults = function(data) {
    if(data.length <= 6) return data;

    const filteredArray  = [];
    for(let i = 0; i <= 5; i++){
        filteredArray.push(data[i]);
    }

    return filteredArray;
}

export const searchCall = async function(movieName) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=1dabe40af3bc8d54e8fdb2fe6769ca33`);
        const data = await response.json();
        return filterSearchResults(data.results);
        // console.log(data);
    }
    catch(err){
        console.log(`Sorry couldn't find search result`);
    }
}