
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//Search by song or artist 
async function searchSong(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);
} 

// function to show data artist and song 
function showData(data){

result.innerHTML = `
   <ul class = "songs">
    ${data.data
     .map(
      song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title} </span>
      <button class="btn" data-artist = "${song.artist.name}"
      data-songtitle = "${song.title}">Get Lyrics</button>
      </li>`

     )
     .join('')
    
    
    }
   
   </ul>
`;

if(data.prev || data.next){
    more.innerHTML= `
    ${data.prev ? `<button class="btn"  onclick = "getmoresongs('${data.prev}')">Prev</button>` : ''}
    ${data.next ? `<button class="btn" onclick = "getmoresongs('${data.prev}')" >Next</button>` : ''}
    
`;

}

else{
    more.innerHTML = '';
}
}
// get prev ans next
async function getmoresongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);

}
// Event Listener
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();  
    console.log(searchTerm)

    if(!searchTerm){
       alert('Please type something to search')
    }
    else{
          searchSong(searchTerm);
    }

});