let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false;
let count=0;
let isWon=false;

const winPatterns=[
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
    turnO = false;
    isWon = false;
    enableBoxes();
    msgContainer.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(!turnO){
            box.innerText="O";
            turnO=true;
        }else{
            box.innerHTML= "<div style='color: green'>X</div>";
            turnO=false;
        }
        box.disabled =true;
        count++;
        checkWinner();
        if(count===9 && !isWon){
            msg.innerText = "DRAW";
            msgContainer.classList.remove('hide');
        }
    });
});
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled =true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled =false;
        box.innerText = "";
        count=0;
    }
}

const showWinner=(winner=>{
    msg.innerText = `Congratulations, Winner is ${winner==='O'?"First Player":"Second Player"}`;
    msgContainer.classList.remove('hide');
});

const checkWinner =()=>{
    for ( pattern of winPatterns) {
        let pos1val =  boxes[pattern[0]].innerText;
        let pos2val =  boxes[pattern[1]].innerText;
        let pos3val =  boxes[pattern[2]].innerText;

        if (pos1val !="" && pos2val !="" && pos3val !="") {
            if(pos1val === pos2val && pos2val === pos3val){
                disableBoxes();
                showWinner(pos1val);
                isWon=true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

