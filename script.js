let farray = [];
let carray = [];
const run = () => {
    //farray
    for(let i= 1;i<=99;i++){
        toString(i);
        var f = "f"
        f = f + i;
        var func = document.getElementById(f).value;
        if(func.length != 0){
            farray.push(func);
        }else{
            farray.push('_0_');
        }
    }
    for(let i= 0;i<99;i++){
            console.log(farray[i]);
        }
    //carray
    for(let j= 1;j<=99;j++){
        toString(j);
        var c = "c"
        c = c + j;
        var code = document.getElementById(f).value;
        if(code.length != 0){
            carray.push(func);
        }else{
            carray.push('_1_');
        }
    }
    for(let i= 0;i<99;i++){
            console.log(carray[i]);
        }

        //runtime
    }    