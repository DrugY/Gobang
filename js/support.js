//二维棋盘一维化
function flat(board)
{
    var rows = new Array()
    var i,j;
    //横
    for(i=0;i<boardsize;i++)
    {
        rows.push(board[i])
    }
    //竖
    for(i=0;i<boardsize;i++)//第i列
    {
        var arow = new Array()
        for(j=0;j<boardsize;j++)
            arow.push(board[j][i])
        rows.push(arow)
    }
    //斜
    rows.push(getarow(board,0,0,1,1))//右下对角线
    rows.push(getarow(board,0,boardsize-1,1,-1))//左下对角线
    i=1;
    while(i<boardsize)
    {
        var row1 = getarow(board,i,0,1,1)
        if(row1.length>4)
            rows.push(row1)
        else
            break //一个不够，其它的肯定都不够，之后的也不可能够

        var row2 = getarow(board,0,i,1,1)
        if (row2.length>4)
            rows.push(row2)

        var row3 = getarow(board,0,boardsize-1-i,1,-1)
        if (row3.length>4)
            rows.push(row3)

        var row4 = getarow(board,i,boardsize-1,1,-1)
        if (row4.length>4)
            rows.push(row4)

        i++;
    }
    return rows;

}




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
    if(historys.length==10)
        maxdepth=8;
    if(historys.length==20)
        maxdepth=10;
    if(historys.length==30)
        maxdepth=12;

    chessupdate=true;
    started=true;
    //胜利判定
    var rows = flat(chessboard);
    var len=0;
    for(var j=0;j<rows.length;j++)
    {
        for(var k=0;k<rows[j].length;k++)
        {
            if(rows[j][k]!=c)
                continue
            len=0;
            for(;k<rows[j].length;k++)
            {
                if(rows[j][k]==c)
                    len++;
                else
                    break;
            }
            if(len>=5)
            {
                finished=true;
                return;
            }
        }
    }
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
        this.zero.push(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        this.one.push(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    }
    this.code = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

Zobrist.prototype.cal = function(x,y,color)
{
    var index = this.size*x+y;
    this.code ^= (color == 0 ? this.zero[index] : this.one[index]);
    return this.code;
}