
const cards = document.querySelectorAll(".card");
let finish = false;
let cardClicked = false;
let locked = false;
let first,second;
let pass;
let flip;
// overlay
(function on(){
    document.getElementById("overlay1").style.display = "block";
    document.getElementById("overlay2").style.display = "none";
})();

function flipCard(){
    if(locked) return;
    if(this == first) return;
    this.classList.add('flip');
    if(!cardClicked){
        cardClicked = true;
        first=this;
        return;
    }
    cardClicked =false;
    second = this;
    matchCheck();

}
function matchCheck(){
    if(first.dataset.name === second.dataset.name){
        disableCards();
        flip++;
    }else{
       unflipCards();
    }
}

function disableCards(){
    first.removeEventListener('click',flipCard);
    second.removeEventListener('click',flipCard);
    resetCard();
}
function unflipCards(){
    locked =true;
    setTimeout(()=>{
        first.classList.remove('flip');
        second.classList.remove('flip');
        resetCard();
    },700);
}

function resetCard(){
    locked = false;
    cardClicked = false;
    first = null;
    second = null;
}

(function shuffle(){
    cards.forEach(function(card){
        let shuffleNo = Math.floor(Math.random()*16);
        card.style.order = shuffleNo;
    });
})();
function shuffle(){
    cards.forEach(function(card){
        let shuffleNo = Math.floor(Math.random()*16);
        card.style.order = shuffleNo;
    });
}

function Start(){
    document.getElementById("overlay1").style.display = "none";
    document.getElementById("overlay2").style.display = "none";
    finish = false;
    flip=0;
    shuffle();
    let timeleft = 3;
    let timer = setInterval(function(){
        if(timeleft < 0){
          clearInterval(timer);
          document.getElementById("time").innerHTML = "";
            StartTimer();
        } else {
          document.getElementById("time").innerHTML = timeleft + " seconds remaining";
          timeleft -= 1;
        }
    }, 1000);
    let fliptimer= setInterval(() => {
        if(flip == 8){
            clearInterval(fliptimer);
            finished();
        }
    }, 1000);
    cards.forEach((card)=>{
        card.classList.add('flip');
    });
    
    setTimeout(()=>{
        cards.forEach((card)=>{
            card.classList.remove('flip');
        });
    },4000);
}
function finished(){
    document.getElementById('overlay2').style.display = "block";
    finish = true;
    flip=0;
    resetCard();
}
function StartTimer(){
    let time = 0;
    let timer = setInterval(function(){
        if(finish == true ){
            pass = `${time} Seconds`;
            clearInterval(timer);
            return document.getElementById("msg").innerHTML =time +" Seconds"; 
        }
        if(time > 59){
            clearInterval(timer);
            finished();
            return document.getElementById("msg").innerHTML ="Time Out" ;
        }
        document.getElementById("time").innerHTML =time+" Seconds" ;
        time++;
    }, 1000);
}

cards.forEach(function(card){
    card.addEventListener('click',flipCard);
});





