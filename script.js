let farray = [];
let carray = [];
let IR = [];
let AC = 0;
const command = ["LOAD","STORE","ADD","SUB","HALT"
    ,"JUMP","JUMPZ","JUMPN","INPUT","OUTPUT"
]
const run = () => {
    farray = [];
    carray = [];
    //farray
    for(let i= 1;i<=99;i++){
        toString(i);
        var f = "f"
        f = f + i;
        var func = document.getElementById(f).value;
        if(func.length != 0){
            farray.push(func);
        }else{
            farray.push(' ');
        }
    }
    for(let i= 0;i<99;i++){
            console.log('func/var '+ farray[i]);
        }
    //carray
    for(let j= 1;j<=99;j++){
        toString(j);
        var c = "c"
        c = c + j;
        var code = document.getElementById(c).value;
        if(code.length != 0){
            carray.push(code);
        }else{
            carray.push(' ');
        }
    }
    for(let i= 0;i<99;i++){
            console.log("code  " +carray[i]);
    }
    

    //runtime
    for(let i =0;i<carray.length;i++){
        let tempcode = carray[i];
        let comcode = "";
        let variable = "";
        let prevj = 0;
        for(let j = 0;j<tempcode.length;j++){
            if(tempcode[j] != ' '){
                comcode += tempcode[j];
            }
            if(command.includes(comcode)){
               prevj = j
                break;
            }
        }
        for(let k = prevj+1;k<tempcode.length;k++){
          if(tempcode[k] != ' '){
            variable += tempcode[k];    
        }
        }
        console.log(comcode);
        console.log(variable);
    }
}