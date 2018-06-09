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