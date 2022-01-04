const wheel = document.querySelector(".wheel");
const startButton = document.querySelector(".button");
const display = document.querySelector(".display");

let deg = 0;
let zoneSize = 90; // deg

const symbolSegements = {
    1: "Position: 1",
    2: "Position: 2",
    3: "Position 3",
    4: "Position 4"
}

const handleWin = (actualDeg) =>{
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = symbolSegements[winningSymbolNr]; 
}

startButton.addEventListener("click", ()=>{
    // Reset Display
    display.innerHTML = "-"
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = "all 10s ease-out";
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");
    fetchData();
});

wheel.addEventListener("transitionend", ()=>{
    // Remove blur
    wheel.classList.remove("blur");
    // Enable button when spin is over
    startButton.style.pointerEvents = "auto";
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = "none";
    // Calculate degree on a 360 degree basis to get the natural real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instanly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
});

/*For Fetching the data from the json file*/
var myInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors",
    cache: "default"
};

function fetchData(){
    let myRequest = new Request("./wheel-json.json", myInit)

    fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        JSON.stringify(data);
        console.log(data);
    })
}

