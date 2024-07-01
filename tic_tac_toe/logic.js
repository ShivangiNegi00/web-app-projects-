//access al the boxes
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
// for draw condition;
let count = 0; //count number of click till 9;
const winPatterns = [
     [0,1,2],
     [0,3,6],
     [0,4,8],
     [1,4,7],
     [2,5,8],
     [2,4,6],
     [3,4,5],
     [6,7,8]
    ];


    const resetGame = () =>{
        // reset all the values 
        turnO = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        count=0;

    };
  
    //check for draw 
    const checkDraw =(count) =>{
        if(count === 9){
            msgContainer.classList.remove("hide");
            msg.innerText =" OOPS looks like we are struck try new game";
            count = 0;
        }
    }

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.classList.add("disabled");
        checkwinner();
        count++;
        checkDraw(count);
       
    });
});

const enableBoxes = () =>{
    for(let box of boxes ) {
        box.classList.remove("disabled");
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes ) {
        box.classList.add("disabled");
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congrats ,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
};

const checkwinner = () => {
    for(let pattern of winPatterns) {
        let posVal1 =   boxes[pattern[0]].innerText;
        let posVal2 =   boxes[pattern[1]].innerText;
        let posVal3 =   boxes[pattern[2]].innerText;
        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                //disable all buttons since we have got our winner 
                showWinner(posVal1);
            }
        }
    }
};
   
newBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);