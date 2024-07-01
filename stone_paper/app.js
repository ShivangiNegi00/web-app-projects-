let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg")
const player_score = document.querySelector("#player-score");
const comp_score = document.querySelector("#comp-score");

// computer choice 
const RcompChoice = () =>{
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];

 }

 const drawGame = () => {
    msg.innerText = "Game was Draw, Play again.";
    msg.style.backgroundColor = "rgb(58, 4, 65)";
 };

 const showWinner = (userWin,userChoice,compChoice) =>{
    if (userWin) {
        userScore++;
        player_score.innerText = userScore ;
        msg.innerText =` you win! Your ${userChoice} beats ${compChoice} `;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        comp_score.innerText = compScore;
        msg.innerText = ` you lose. ${compChoice} beats ${userChoice} `;
        msg.style.backgroundColor = "red";
    }
 }



 const playGame = (userChoice) => {
    // Call function to generate computer choice
    const compChoice = RcompChoice();
  
    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      switch (userChoice) {
        case "rock":
          userWin = compChoice !== "paper"; // Win if computer doesn't choose paper
          break;
        case "paper":
          userWin = compChoice !== "scissors"; // Win if computer doesn't choose scissors
          break;
        case "scissors":
          userWin = compChoice !== "rock"; // Win if computer doesn't choose rock
          break;
        default:
          console.error("Invalid user choice:", userChoice);
          break;
      }
  
      showWinner(userWin,userChoice,compChoice);
    }
  };

// click on your choice and get its attribute (id) which is rock paper scissors 
choices.forEach((choice) => {
      choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice)
    });
});