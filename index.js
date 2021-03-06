const msgEl=document.getElementById("msg");

const randomNum=getRandomNumber();

console.log('Number:'+randomNum);

window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition=new window.SpeechRecognition();

//Start recognition

recognition.start();

function writeMessage(msg){
    msgEl.innerHTML=`
    <div>You said:</div>
    <span class="box">${msg}</span>`;
}

// Check msg againist number
function checkNumber(msg){
    const num=+msg;
    
    //Check if valid number
    if(Number.isNaN(num)){
        if(msg.includes("potty")){
            msgEl.innerHTML+='<div>Seriously? Not a valid number!</div>'
            return;
        }
        else if(msg.includes("Audi")){
            msgEl.innerHTML+='<div>Nice Car! Not a valid number though!</div>'
            return;
        }
        else{
            msgEl.innerHTML+='<div>Eh Bandya, this is not a valid number</div>'
            return;
        }
    }

    //Check if in range
    if(num>100 || num <1){
        msgEl.innerHTML+='<div>Number must be between 1 and 100</div>';
        return;
    }

    //Check Number
    if(num==randomNum){
        document.body.innerHTML=`
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>

        <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if(num>randomNum){
        msgEl.innerHTML+='<div>GO LOWER</div>';
    }
    else {
        msgEl.innerHTML+='<div>GO HIGHER</div>';
    }
}

function onSpeak(e){
    const msg=e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}
function getRandomNumber(){
    return Math.floor(Math.random() * 100)+1;
}

recognition.addEventListener("result",onSpeak);

// End SR Service
recognition.addEventListener("end",function(){
    recognition.start();
});


document.body.addEventListener("click",function(e){
    if(e.target.id=="play-again"){
        window.location.reload();
    }
});