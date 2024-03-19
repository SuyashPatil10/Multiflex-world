
export const showModal = function(data) {
    const [movie] = data;
    const HTML = renderModal(movie);
    const modal = document.querySelector('.single-modal');
    modal.classList.toggle('hidden');
    const modalBlock = document.querySelector('.single-block');
    modalBlock.textContent = '';
    modalBlock.insertAdjacentHTML('afterbegin', HTML);
    addListeners();
}

const addListeners = function() {
    document.querySelector('.single-cross').addEventListener('click', function() {
        document.querySelector(`.single-modal`).classList.toggle('hidden');
    })

    document.querySelector('.overlay-1').addEventListener('click', function() {
        document.querySelector(`.single-modal`).classList.toggle('hidden');
    })
}

const renderModal = function(data) {
    return `
        <div class="block-modal">
            <div class="modal-image">
                <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}" alt="">
            </div>
            <div class="modal-desc">
                <h1>${data.title}</h1>
                <p>Release Date: ${new Date(data.release_date).getFullYear()}</p>
                <p>
                    ${data.overview}
                </p>
                <form action="#">
                    <input type="hidden" name="movie" value="${data.title}">
                    <button type="submit">AI Review</button>
                </form>

                <i class="fa-solid single-cross fa-xmark"></i>
            </div>
        </div>
    `;
}





export const showSearchModal = function(data) {
    // console.log(data);
    const HTML = renderSearchModal(data);
    const modal = document.querySelector('.multi-modal');
    modal.classList.toggle('hidden');
    const searchModal = document.querySelector('.search-modal');
    searchModal.textContent = '';
    searchModal.insertAdjacentHTML('afterbegin', HTML);
    addSearchListeners(data);
    generateSearchListeners(data);
}

const addSearchListeners = function() {
    document.querySelector('.multi-cross').addEventListener('click', function() {
        document.querySelector(`.multi-modal`).classList.toggle('hidden');
    })

    document.querySelector('.overlay-2').addEventListener('click', function() {
        document.querySelector(`.multi-modal`).classList.toggle('hidden');
    })
}

const renderSearchModal = function(data) {
    return `
        <div class="search-image" id="first-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[0].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[0].title}</h4>
                <p>${new Date(data[0].release_date).getFullYear()}</p>
            </div>
        </div>
        <div class="search-image" id="second-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[1].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[1].title}</h4>
                <p>${new Date(data[1].release_date).getFullYear()}</p>
            </div>
        </div>
        <div class="search-image" id="third-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[2].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[2].title}</h4>
                <p>${new Date(data[2].release_date).getFullYear()}</p>
            </div>
        </div>
        <div class="search-image" id="fourth-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[3].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[3].title}</h4>
                <p>${new Date(data[3].release_date).getFullYear()}</p>
            </div>
        </div>
        <div class="search-image" id="fifth-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[4].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[4].title}</h4>
                <p>${new Date(data[4].release_date).getFullYear()}</p>
            </div>
        </div>
        <div class="search-image" id="sixth-search">
            <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${data[5].poster_path}" alt="">
            <div class="search-info">
                <h4>${data[5].title}</h4>
                <p>${new Date(data[5].release_date).getFullYear()}</p>
            </div>
        </div>

        <i class="fa-solid multi-cross fa-xmark"></i>
    `;
}


const searchClickedMovie = function(data, movieName, year) {
    console.log(data);
    const filteredMovie = data.filter(movie => {
        const release = new Date(movie.release_date).getFullYear();
        // console.log(movie.title.toLowerCase() === movieName.toLowerCase());
        // console.log(release === +year);

        if(movie.title.toLowerCase() === movieName.toLowerCase()
             && release === +year){
            return movie;
        }
    });
    return filteredMovie
}


const generateSearchListeners = function(data) {
    const searchDivs = document.querySelectorAll('.search-image');

    searchDivs.forEach(search => {
        search.addEventListener('click', function() {
            const h4Element = search.querySelector('h4');
            const para = search.querySelector('p');
            const clickedData = searchClickedMovie(data, 
                h4Element.textContent.trim(),para.textContent.trim());

            document.querySelector(`.multi-modal`).classList.toggle('hidden');
            showModal(clickedData);
        });
    });
}