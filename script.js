let farray = [];
let carray = [];
let outputque = [];
let returnpoint=[];
let IR = [];
let AC = 0;
let MDR = 0;
let SP = 0;
let XR =0;
const outputdiv = document.getElementById("output");
const command = ["LOAD","STORE","ADD","SUB","HALT"
                ,"JUMP","JUMPZ","JUMPN","INPUT","OUTPUT",
                "LOADX","STOREX","RETURN","CALL","PUSH",
                "PUSH","POP","INCHAR","OUTCHAR"
]

//create memline
const editor = document.getElementById("editor");
 
for(let c =1 ;c<=99;c++){
    
    const memline = document.createElement("div");
    memline.setAttribute('class',"Memline");
    memline.setAttribute('id',"m"+c.toString());
    
    const address = document.createElement("p");
    address.setAttribute('class',"address");
    address.setAttribute('id',"a"+c.toString());
    address.innerHTML = "("+c.toString()+")";
    memline.appendChild(address);
    const ir = document.createElement("p");
    ir.setAttribute('class',"ir");
    ir.setAttribute('id',"i"+c.toString());
    ir.innerHTML = "_0000";
    memline.appendChild(ir);
    
    const func = document.createElement("input");
    func.setAttribute('class',"func");
    func.setAttribute('id',"f"+c.toString());
    func.setAttribute('type',"text");
    memline.appendChild(func);
    const code = document.createElement("input");
    code.setAttribute('class',"code");
    code.setAttribute('id',"c"+c.toString());
    code.setAttribute('type',"text");
    memline.appendChild(code);

    editor.appendChild(memline);
}

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
        let isthereXR = false;
        let XRfinder = 0;
        let XRvar = ""
        let varindex = 0;
        let XRindex=0;
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

                if(comcode == "LOAD"){
                    if(tempcode[j+1] == "X"||tempcode[j+1] == "X"){
                        comcode += tempcode[j+1];
                        j++;
                    }
                }

                if(comcode == "STORE"){
                    if(tempcode[j+1] == "X"||tempcode[j+1] == "X"){
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
            if(tempcode[k] == "("){
                isthereXR = true;
                XRfinder =  k + 1;
                comcode = comcode + "wxr"
                break;
            }

            if(tempcode[k] != ' '){
                variable += tempcode[k];    
            }
       }

        if(isthereXR == true){
        
            for(let r = XRfinder;r<tempcode.length;r++){
                if(tempcode[r] ==')'){
                    break;
                }else{
                    XRvar += tempcode[r];
                }
            }

            for(let x = 0;x<farray.length;x++){
                if(XRvar == farray[x]){
                    XRindex = x;
                }
            }
        }
        
        
        // console.log(comcode);
        // console.log(variable);
        // console.log("XR var = "+ XRvar);
        // console.log("XR index = "+ XRindex);


        for(let d =0;d<carray.length;d++){
            if(farray[d] == variable){
                varindex = d;
                console.log(varindex);
            }
        }

    //    console.log(Number(carray[varindex]) + "indexvalue");
        
       
       
       //exercute
        if(comcode == "HALT"){
           i = i + carray.length
        }
        switch(comcode) {
            case "LOAD":
                AC = Number(carray[varindex]);
                console.log("AC = "+ AC);
                break;

            case "STORE":
                carray[varindex] = AC;
                console.log("STORE = "+ carray[varindex]);
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
                break;

            case "JUMPZ":
                if(AC == 0 || AC == "0"){
                    i = varindex - 1;  
                  }
                break;

            case "LOADX":
                XR = Number(carray[varindex]);
                console.log("xr = "+XR)
                break;

            case "STOREX":
                  carray[varindex] = XR
                break;

            case "LOADwxr":
                // if(XRvar == "XR"){
                //     AC = Number(carray[varindex + XR]);
                // }else{
                // AC = Number(carray[varindex + Number(carray[XRindex])]);
                // }
                break;

            case "STOREwxr":
            //     if(XRvar == "XR"){
            //         carray[varindex + XR] = AC
            //     }else{
            //     carray[varindex + Number(carray[XRindex])] = AC;
            // }


                break;

            case "ADDwxr":
                // AC = AC + Number(carray[varindex + Number(carray[XRindex])]);


                break;

            case "SUBwxr":
                // AC = AC - Number(carray[varindex + Number(carray[XRindex])]);


                break;

            case "CALL":
                returnpoint.push(i)
                 i = varindex - 1;
                break;

            case "RETURN":
                i = (returnpoint[returnpoint.length-1]);
                returnpoint.pop();
                break;

            case"INCHAR":
                carray[varindex] = prompt("Enter value of "+variable).charCodeAt();
                AC = Number(carray[varindex]);
                break;

            case"OUTCHAR":
            let decimal = Number(carray[varindex]);
            let outchar = String.fromCharCode(decimal);
                outputque.push(outchar)
                break;
            // case:
            //     break;
            // case:
            //     break;
        }
    }
    

    for(let o = 0;o<outputque.length;o++){
        const tempo = document.createElement('p');
        tempo.innerHTML = outputque[o];
        outputdiv.appendChild(tempo);
    } 

}

    //outputrender
    
    
