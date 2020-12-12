
const cards = document.querySelectorAll(".card");
let finish = false;
let cardClicked = false;
let locked = false;
let first,second;
let pass;
let flip =0;
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
        }
        timeleft -= 1;
    }, 1000);
    let fliptimer= setInterval(() => {
        if(flip == 8){
            clearInterval(fliptimer)
            const element = document.getElementById('finish');
            element.innerHTML= "Finished";
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
    finish = true;
    flip=0;
    resetCard();
}
function StartTimer(){
    let time = 0;
    let min =0;
    let timer = setInterval(function(){
        if(finish == true){
            pass = `${min} Minutes : ${time} Seconds`;
            clearInterval(timer);
            document.getElementById("time").innerHTML =min +" Minutes :"+time+" Seconds" ;
        }
        if(time == 60 ){
            min++;
            time =0;
        }  
        if(min > 5){
            window.alert('Time up');
            clearInterval(timer);
        }
        document.getElementById("time").innerHTML =min +" Minutes :"+time+" Seconds" ;
        time++;
    }, 1000);
}

cards.forEach(function(card){
    card.addEventListener('click',flipCard);
});

