let trackDisplayArray = [];
let albumDisplayArray = [];
let songList = [];
let currentSongIndex = 0;
let songDataArr = [];
let likedArr = []


const sideRecs = document.querySelectorAll(".sideRec");
const playerButtons   = document.querySelector(".playerButtons");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const nextTrackBtn = document.querySelector(".nextTrackBtn");
const backTrackBtn = document.querySelector(".backTrackBtn");
const repeatBtn  = document.querySelector(".repeatBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const progressBarBack = document.querySelector(".progressBarBack");
const progressBarFront = document.querySelector(".progressBarFront");
const playerTimes = document.querySelector(".playerTimes");
const playerArt = document.querySelector(".playerArt");
const elapsedTime = document.querySelector(".elapsedTime");
const remainingTime = document.querySelector(".remainingTime");
const volumeContainer = document.querySelector(".volumeContainer");
const volumeBarFront = document.querySelector(".volumeBarFront");
const faVolumeOff = document.querySelector(".fa-volume-off");
const searchField  = document.querySelector(".searchField");
const searchFieldContainer = document.querySelector(".searchFieldContainer");
const searchBtn = document.querySelector(".searchBtn");
const header01 = document.querySelectorAll(".section-header")[0];
const userDataContainer = document.querySelector(".userDataContainer");
const userName = document.querySelector(".userName");
const albumInfoTitle = document.querySelector(".albumInfoTitle");
const albumInfoArtist = document.querySelector(".albumInfoArtist");
const likeBtn = document.querySelector(".likeBtn");
const likeBtnF = document.querySelector(".likeBtnF");

//for testing
//const queenSong = new Audio("./queen-another-one-bites-the-dust.mp3");
//const rickRoll = new Audio("./rick-astley-never-gonna-give-you-up.mp3");
//songList.push(rickRoll);
//songList.push(queenSong);
//////


const showUser = (user)=>{
    userName.innerText = user; 
}
const playerClick = ()=> {
    playBtn.classList.toggle("d-none");
        pauseBtn.classList.toggle("d-none");
    if(!playBtn.classList.contains("d-none")){
        pauseSong();
        console.log('pause');
    }else{
        console.log('play');        
        playMusic();
    }
}
const addSongs = (data) =>{    
    songList[currentSongIndex].pause()
    songList =[];    
    for(element of data.data){
        const newSong = new Audio(element.preview); 
        songList.push(newSong);
    }
    playBtn.classList.add("d-none");
    pauseBtn.classList.remove("d-none");
    playMusic();
}
const addSongInfo = (data) =>{
    console.log('addsonginfo', data)
    for(element of data.data){songDataArr.push(element)};
    console.log(songDataArr);
}

const nextSong = () =>{
    songList[currentSongIndex].pause();
    songList[currentSongIndex].currentTime = 0;
    currentSongIndex++;
    if(currentSongIndex > songList.length-1){currentSongIndex = 0;}
    playMusic()
}
const prevSong = () =>{
    songList[currentSongIndex].pause();
    songList[currentSongIndex].currentTime = 0;
    currentSongIndex--;
    if(currentSongIndex < 0){currentSongIndex = songList.length-1}
    playMusic()
}
const pauseSong = () =>{
    songList[currentSongIndex].pause()
}
const like = () =>{
    likeBtn.classList.toggle("d-none");
    likeBtnF.classList.toggle("d-none");
    likedArr.push(songDataArr[currentSongIndex]);
    localStorage.setItem("liked", JSON.stringify(likedArr)) 
    
}
const clearLikes = () =>{
    localStorage.setItem("liked", []);
}
const playMusic = () => {
    songList[currentSongIndex].addEventListener('timeupdate', updateProgress);
    songList[currentSongIndex].addEventListener('timeupdate', durTime);
    songList[currentSongIndex].play();
    console.log(songList[currentSongIndex]);
    changePlayerInfo()
}
const changePlayerInfo = () =>{
    playerArt.setAttribute('src', songDataArr[currentSongIndex].album.cover);
    albumInfoTitle.innerText = songDataArr[currentSongIndex].album.title;
    albumInfoArtist.innerText = songDataArr[currentSongIndex].artist.name;
}
const updateProgress = (e) => {   
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBarFront.style.width = `${progressPercent}%`;
    if(progressPercent === 100){
        nextSong()
    }

      
}

const setProgress = (e) => {
    const widthF = progressBarFront.offsetWidth;
    const widthB = progressBarBack.offsetWidth;
    const clickX = e.offsetX;
    const percentage = (clickX/widthB);    
    const duration = songList[currentSongIndex].duration;
  
    songList[currentSongIndex].currentTime = percentage * duration;
  }
  
const playRick = () => {
    rickRoll.play();
}
const playSong = (input)=>{
    console.log("playSong input:", input);
    const song = new Audio(input);
    song.play();
    console.log("music");
}
const volumeChange = (e) => {
    const widthF = volumeBarFront.offsetWidth;
    const widthB = volumeContainer.offsetWidth;
    const clickX = e.offsetX;
    const percentage = (clickX/widthB);    
    const volume = songList[currentSongIndex].volume;
  
    songList[currentSongIndex].volume = percentage;
}


const durTime = (e) => {
	const {duration,currentTime} = e.srcElement;
	let sec;
	let sec_d;

	
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	elapsedTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 
    
	
	get_sec_d (duration);

	// change duration DOM
	remainingTime.innerHTML = min_d +':'+ sec_d;
}

const cardContainerTop = document.querySelectorAll(".cardContainer")

const showHideSearch = () =>{
    searchBtn.classList.toggle("d-none");
    searchBtn.classList.toggle("d-flex");
    searchFieldContainer.classList.toggle("d-none");
    searchFieldContainer.classList.toggle("d-flex");
    if(!searchField.classList.contains("d-none")){
        searchField.focus();
    }    
}
const changeHeader = (newText)=>{
    header01.innerText = newText;

}
const enterSearch = (e)=>{
    if(e.key === 'Enter'){
        
        showHideSearch()
        loadTracks(searchField.value)
    }
    changeHeader("Search Results");
}
const linkSearch = (e)=>{
    changeHeader(e.target.innerText);
    loadTracks(e.target.innerText);
}

const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '71976e22femshc59a0991cc2347cp1afa84jsnf21821e7ac7a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const loadTracks = (input) => {    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`, options)
    .then(response => response.json())
    .then(response => makeCards(response))
    .catch(err => console.error(err));  
}

const loadSmallTracks = (input) => {    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`, options)
    .then(response => response.json())
    .then(response => makeSmallCards(response))
    .catch(err => console.error(err));  
}
const makeCards = function (r,n=16) {
    document.querySelector(".spinnerContainer").classList.add("d-none");
    const oldCards = document.querySelectorAll(".cardBack");
    for(card of oldCards){card.remove()};
    console.log(r);   
    for(let i=0; i<n; i++){        
        const newCard = document.createElement("div");
        const hoverBtn = document.createElement("div");
        hoverBtn.classList.add("hoverPlayButton");
        const hoverTri = document.createElement("div");
        hoverTri.classList.add("buttonTriangle");
        newCard.setAttribute("class", ' mb-4 mx-2 cardBack')
        newCard.innerHTML = `
        <div class="card spotify-light-bg p-3" style="width: 12rem; height: 18rem;">        
        <img src="${r.data[i].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body p-0  bg-black">
        
        <h5 class="card-title text-truncate mb-1 pt-2"><a href="./album-page.html?album-id=${r.data[i].album.id}">${r.data[i].title}</a></h5>
        <p class="card-text"><a href="./artist-page.html?album-id=${r.data[i].artist.id}">${r.data[i].artist.name}</a></p>                                              
        </div>`;
        
        newCard.querySelector(".card").prepend(hoverBtn);  
        hoverBtn.append(hoverTri);
        
        hoverBtn.addEventListener("click", () => {playSong(r.data[i].preview)});
        if(i<n/2){document.querySelector(".row.my-4.cardContainer1").append(newCard);}else{document.querySelector(".row.my-4.cardContainer2").append(newCard);};
    }    
}
const makeSmallCards = (r,n=14) => {
    const container1 = document.querySelector(".smallCardsContainer1")
    const container2 = document.querySelector(".smallCardsContainer2")    
    console.log(r)
    for (let i = 0; i <n; i++) {
        const album = r.data[i];
        const newCard = document.createElement("div")
        //newCard.setAttribute("class", 'col')
        newCard.innerHTML = ` <div class="tamplet ">
        <div class="row">
            <div class="col-4">
                <img src=${album.album.cover_medium} height="80px" width="150%" alt="">

            </div>
            <div class="col-8 d-flex">
              <p class=".text-light align-self-center text-white my-0"> <a href="album-page.html?album-id=${album.id}"> ${album.title}</a></p>
            </div>
        </div>
    </div>`   
    if(i<n/2){container1.append(newCard)}else{container2.append(newCard)};
    }
}
const musicOnLoad = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=rick astley`, options)
    .then(response => response.json())
    .then(response => {(response) => {
        console.log(response.data[0]);
    }})
    .catch(err => console.error(err)); 
    console.log  
    //pauseSong();
}
const loadInitialContent = () =>{
    let cardButtons = document.querySelectorAll(".hoverPlayButton");
    while(true){
        break
        if(cardButtons.length){

        }
    }
    musicOnLoad();
    loadSmallTracks("busta");
    loadTracks("queen");
}

window.onload = () => {
    
    playBtn.addEventListener("click", playerClick);
    pauseBtn.addEventListener("click", playerClick);
    searchBtn.addEventListener("click", showHideSearch);
    searchField.addEventListener("keypress", enterSearch);
    for(link of sideRecs){link.addEventListener("click", (e)=>{linkSearch(e)})}
    nextTrackBtn.addEventListener("click", nextSong);
    backTrackBtn.addEventListener("click", prevSong);
    progressBarBack.addEventListener("click", setProgress);
    likeBtn.addEventListener("click", like);
    likeBtnF.addEventListener("click", like);
    volumeContainer.addEventListener("click", volumeChange);
    likedArr = JSON.parse(localStorage.getItem("liked"));
    loadInitialContent()
    
}



//card example:
//<div class="col-6 col-sm-4 col-md-3 col-lg-2">
//<div class="card spotify-light-bg p-3" style="width: 12rem; height: 18rem;">
//<div class="hoverPlayButton"><div class="buttonTriangle"></div></div>
//<img src="https://cdns-images.dzcdn.net/images/cover/9a20f8b2547cbb74635539c219de3a84/500x500.jpg" class="card-img-top" alt="...">
//<div class="card-body p-0  bg-black">
//    
//    <h5 class="card-title text-truncate mb-1 pt-2">Playlist name</h5>
//    <p class="card-text">Some quick example of text that is too long.</p>                                              
//</div>