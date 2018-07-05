//绘制落子
function drawchess(x,y,c)
{
    var color;
    if (c)
        color="white";
    else
        color="black";
    var cxt=document.getElementById("background").getContext("2d");
    cxt.beginPath();
    cxt.arc(x*35+22,y*35+22,12,0,360);
    cxt.fillStyle=color;
    cxt.fill();
    cxt.closePath();
}

function dochess(x,y,c){ //落子 c=黑0:白1
    chessboard[y][x]=c;
    mainz.cal(y,x,c);
    historys.push([y,x]);
    chessupdate=true;
}

function hasNeighbor(board,i,j,x,y)
{
    for(var p=Math.max(i-x,0);p<=Math.min(i+x,boardsize-1);p++)
        for(var q=Math.max(j-y,0);q<=Math.min(j+y,boardsize-1);q++)
            if(board[p][q]>=0)
                return true
    return false
}

function deepcopy(obj) {
    var out = [],i = 0,len = obj.length;
    for (; i < len; i++)
    {
        if (obj[i] instanceof Array)
        {
            out[i] = deepcopy(obj[i]);
        }
        else
        	out[i] = obj[i];
    }
    return out;
}

var Zobrist = function()
{
    this.size=boardsize;
    this.zero = [];
    this.one = [];
    for(var i=0;i<this.size*this.size;i++) {
        this.zero.push(Math.floor(Math.random() * 1000000000));
        this.one.push(Math.floor(Math.random() * 1000000000));
    }
    this.code = Math.floor(Math.random() * 1000000000);
}

Zobrist.prototype.cal = function(x,y,color)
{
    var index = this.size*x+y;
    this.code ^= (color == 0 ? this.zero[index] : this.one[index]);
    return this.code;
}