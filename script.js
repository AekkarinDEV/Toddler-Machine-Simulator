let farray = [];
let carray = [];
let outputque = [];
let IR = [];
let AC = 0;
const outputdiv = document.getElementById("output");
const command = ["LOAD","STORE","ADD","SUB","HALT"
    ,"JUMP","JUMPZ","JUMPN","INPUT","OUTPUT"
]
const run = () => {
    outputdiv.innerHTML = null;
    farray = [];
    carray = [];
    AC = 0;
    outputque = [];

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
        let varindex = 0;
        let prevj = 0;
        for(let j = 0;j<tempcode.length;j++){
            if(tempcode[j] != ' '){
                comcode += tempcode[j];
                
                }
                if(comcode == "JUMP"){
                    if(tempcode[j+1] == "Z"||tempcode[j+1] == "N"){
                        comcode += tempcode[j+1];
                        j++;
                    }
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

        for(let d =0;d<carray.length;d++){
            if(farray[d] == variable){
                varindex = d;
                console.log(varindex);
            }
        }
       console.log(Number(carray[varindex]) + "indexvalue")
        //exercute
        if(comcode == "HALT"){
           i = i + carray.length
        }
        switch(comcode) {
            case "LOAD":
                AC = Number(carray[varindex]);
                break;
            case "STORE":
                carray[varindex] = AC;
                break;
            case "ADD":
                AC = AC + Number(carray[varindex]);
                console.log("afterSUB"+ AC);
                break;
            case "SUB":
                AC = AC - Number(carray[varindex]);
                console.log("afterSUB"+ AC);
                break;
            case "JUMP":
                 i = varindex - 1;
                break;
            case "JUMPN":
                if(AC<0){
                  i = varindex - 1;  
                }
                break;
            case "INPUT":
                carray[varindex] = prompt("Enter value of "+variable);
                AC = Number(carray[varindex]);
                break;
            case "OUTPUT":
                outputque.push(carray[varindex])
                // console.log(carray[varindex]+"outputja")
                break;
            case "JUMPZ":
                if(AC == 0 || AC == "0"){
                    i = varindex - 1;  
                  }
                break;
        }
    }
    for(let o = 0;o<outputque.length;o++){
        const tempo = document.createElement('p');
        tempo.innerHTML = outputque[o];
        outputdiv.appendChild(tempo);
    }
    
}