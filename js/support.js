function output(a,b,c,d,e)
{
    var aa=a;
    var bb=b;
    var cc=c;
    var dd=d;
    var ee=e;
    console.log(aa,bb,cc,dd,ee)
}


function hasNeighbor(board,i,j)
{
    //output(i.toString()+" "+j.toString(),[])
    for(var p=Math.max(i-1,0);p<=Math.min(i+1,boardsize-1);p++)
        for(var q=Math.max(j-1,0);q<=Math.min(j+1,boardsize-1);q++)
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