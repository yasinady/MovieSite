 const API_KEY = 'api_key=b19cac73f683e80396ab9c220b4167c5';
 const URL = 'https://api.themoviedb.org/3/';
 const API_URL = URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY; 
 const IMG_URL = 'https://image.tmdb.org/t/p/w500';
 const SEARCH_URL = URL + '/search/movie?' + API_KEY;

 const genres = [


{
  "id": 28,
  "name": "Action"
},
{
  "id": 12,
  "name": "Adventure"
},
{
  "id": 16,
  "name": "Animation"
},
{
  "id": 35,
  "name": "Comedy"
},
{
  "id": 80,
  "name": "Crime"
},
{
  "id": 99,
  "name": "Documentary"
},
{
  "id": 18,
  "name": "Drama"
},
{
  "id": 10751,
  "name": "Family"
},
{
  "id": 14,
  "name": "Fantasy"
},
{
  "id": 36,
  "name": "History"
},
{
  "id": 27,
  "name": "Horror"
},
{
  "id": 10402,
  "name": "Music"
},
{
  "id": 9648,
  "name": "Mystery"
},
{
  "id": 10749,
  "name": "Romance"
},
{
  "id": 878,
  "name": "Science Fiction"
},
{
  "id": 10770,
  "name": "TV Movie"
},
{
  "id": 53,
  "name": "Thriller"
},
{
  "id": 10752,
  "name": "War"
},
{
  "id": 37,
  "name": "Western"
}
] 
const tags = document.getElementById('tags')
var selectedGenre = []


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');




genre()
function genre(){
  tags.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag')
    t.id=genre.id;
    t.innerText = genre.name;
    t.addEventListener('click',() => {
     if(selectedGenre.length == 0){
      selectedGenre.push(genre.id);
     }else{
        if(selectedGenre.includes(genre.id)){
          selectedGenre.forEach((id, index) => {
            if(id == genre.id){
              selectedGenre.splice(index, 1);
            }
          })
        } else {
          selectedGenre.includes(genre.id);
        }
      }
      getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
      highlight()
      
    })
    tags.append(t);
  })
}
function highlight(){
  const tagsElements = document.querySelectorAll('.tag');
  tagsElements.forEach(tag => {
    tag.classList.remove('highlight')
  })
  removeBtn()
  if(selectedGenre.length !=0){
    selectedGenre.forEach(id => {
      const highlighted = document.getElementById(id)
      highlighted.classList.add('highlight')
    })
  }
}


function removeBtn(){
  const removeBtn = document.getElementById('remove')
  if(removeBtn) {
    removeBtn.classList.add('highlight');
  }else {
    const remove = document.createElement('div');
    remove.classList.add('tag', 'highlight');
    remove.id = 'remove';
    remove.innerText = 'Clear';
    remove.addEventListener('click', () => {
      selectedGenre = []
      genre()
      getMovies(API_URL)

    })
    tags.append(remove);
  }
} 


 getMovies(API_URL)
 function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
          showMovies(data.results);
        } else { 
          main.innerHTML = `<h1>No results found.</h1>`
        }
    })
 }

 function showMovies(data) {
     main.innerHTML = '';

     data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =  `
        <img
          src="${poster_path? IMG_URL+poster_path: 'http://via.placeholder.com/1080x1580'}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average )}">'${vote_average}'</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
            ${overview}
        </div>
        
        
        
        
        `
        main.appendChild(movieEl)
    })
 }

 function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    } else{
        return 'red'
    }
 }


 form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    selectedGenre = [];
    highlight()
    if(searchTerm){
      getMovies(SEARCH_URL+'&query='+searchTerm)
  } else {
    getMovies(API_URL)
  }

 })