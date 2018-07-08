
function dochess(x,y,c){ //落子 c=黑0:白1
    //赋值
    chessboard[y][x]=c;
    historys.push([y,x]);
    started=true;

    //绘画
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