var board;
var score=0;
var rows=4;
var columns=4;

window.onload=function() {
    setgame();
}

function updateTile(tile,num) {
    tile.innerText="";
    tile.classList.value="";
    tile.classList.add("tile");
    if(num>0) {
        tile.innerText=num.toString();
        if(num<=4096) {
            tile.classList.add("a"+num.toString());
        }
        else {
            tile.classList.add("a8192");
        }
    }
}

// Setting our game.
function setgame() {
    board = [
        [2,2,2,2],
        [2,2,2,2],
        [2,2,2,2 ],
        [2,2,2,2],
    ]
    for(let r=0;r<rows;r++) {
        for(let c=0;c<columns;c++) {
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            let num=board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
}

// Filters out zero from the rows and columns after multiplication.
function zerofilter(row) {
    return row.filter(num =>num!=0);
}

// slides the rows and columns for multiplicaton.
function slide(row) {
    row=zerofilter(row);

    for(let i=0;i<row.length-1;i++)
    {
        if(row[i]=row[i+1])
        {
            row[i]*=2;
            row[i+1]=0;
            score +=row[i];
        }
    }

    row=zerofilter(row);
    while(row.length<columns) {
        row.push(0);
    }
    return row;
}

// Function for left shifting.
function slideleft() {
    for(let r=0;r<rows;r++) {
        let row=board[r];
        row=slide(row);
        board[r]=row;

        for(let c=0;c<columns;c++) {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num); 
        }
    }
}

//Function for right shifting.
function slideright() {
    for(let r=0;r<rows;r++) {
        let row=board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0;c<columns;c++) {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num); 
        }
    }
}

// Function for up shifting.
function slideup() {
    for(let c=0;c<columns;c++){
        let row= [board[0][c],board[1][c],board[2][c],board[3][c]];
        row=slide(row);
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}

// Function for down shifting.
function slidedown() {
    for(let c=0;c<columns;c++){
        let row= [board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row=slide(row);
        row.reverse();
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}

// Calls relevent functions as per the input.
document.addEventListener("keyup", (e) =>
{
    if(e.code=="ArrowLeft"){
        slideleft();
    }

    else if(e.code=="ArrowRight"){
        slideright();
    }
    else if(e.code=="ArrowUp"){
        slideup();
    }
    else if(e.code=="ArrowDown"){
        slidedown();
    }
})