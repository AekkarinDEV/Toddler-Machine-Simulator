const addressDiv = document.getElementById("address");
for(let addressNum = 0;addressNum<=99;addressNum++){
    const address = document.createElement("p");
    address.setAttribute("class","lines")
    address.innerHTML = ("["+addressNum+"]");
    addressDiv.appendChild(address)
}


document.getElementById('inputcode').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });

let loopCut = 0;
const run = ()  => {
    //codereader
    let functionContainer = [];
    let codeContainer = [];
    let valueContainer = [];
    let VVcontainer = [];
    let sudoStack = [];
    let lineOfCode = 0;
    const outputdiv = document.getElementById("output");
    let userInput = document.getElementById("inputcode").value;
    let userInputRemovedSpace = userInput.split(";");
    outputdiv.innerHTML="";
    userInputRemovedSpace.forEach(element =>  {
        lineOfCode = lineOfCode+1;
        if(element.includes("/") == false){
        if(lineOfCode < userInputRemovedSpace.length){
        // console.log(element);
        let fandc = element.split(":")
        functionContainer.push(fandc[0]);
        let codeAndValue = fandc[1];
        let splitCodeFromValue = codeAndValue.split(" ");
        // console.log(splitCodeFromValue);
        // console.log(splitCodeFromValue);
        codeContainer.push(splitCodeFromValue[0]);
        if(splitCodeFromValue[0]!= "RETURN" && splitCodeFromValue[0]!= "HALT")
            {
                console.log(splitCodeFromValue[0]);
                console.log(splitCodeFromValue[1]);
                if(splitCodeFromValue[1].includes("(")){
                    let splitXXandVV = splitCodeFromValue[1].split("(");
                    splitCodeFromValue[1] = splitXXandVV[0];
                    splitXXandVV[1]= splitXXandVV[1].slice(0,-1);
                    VVcontainer.push(splitXXandVV[1])
                }else{
                    VVcontainer.push("_")
                }

                valueContainer.push(splitCodeFromValue[1]);}
        
                else{valueContainer.push("_")
                    VVcontainer.push("_");
                };
       
       
            }
        }
        let fixfunction = [];
        functionContainer.forEach(item =>{
            let arroffunc = item.split(" ");
            item = arroffunc.join('');
            if(item == "\n"){
                item = "_";
            }
            item = item.replace("\n","");
            console.log(item);
            fixfunction.push(item);
        
        })
      
        functionContainer = fixfunction;
    });
    
    console.log(codeContainer);
    console.log(valueContainer);
    console.log(VVcontainer);
    console.log(functionContainer);
        //componentofToddlerMachine
        let AC = 0;
        let XR = 0;
        let SP = 0;
        let outputque = [];
        let returnpoint = [];
        //runtime
        for(let pointer = 0;pointer<codeContainer.length;pointer++){
            let includesVV = (VVcontainer[pointer] != "_") ? true:false; 
            let indexOfValue = functionContainer.indexOf(valueContainer[pointer]);
            let indexOfVV = functionContainer.indexOf(VVcontainer[pointer]) ;
            // console.log(indexOfValue);
            // console.log(indexOfVV);
            switch(codeContainer[pointer]) {
                 case 'LOAD':
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                            AC = sudoStack[SP - Number(valueContainer[pointer])]
                        }else{
                        AC = valueContainer[Number(valueContainer[pointer]) + indexOfVV]
                        }
                        
                    }
                    else{
                        AC = Number(valueContainer[indexOfValue])
                        
                    }
                    console.log(pointer);
                    console.log(valueContainer[pointer]);
                    console.log(SP - Number(valueContainer[pointer]));
                    console.log(AC);
                     break;
     
                 case "STORE":
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                             sudoStack[SP - Number(valueContainer[pointer])] = AC
                        }else{
                      valueContainer[Number(valueContainer[pointer]) + indexOfVV] = AC;
                        }
                    }else{
                        valueContainer[indexOfValue] = AC;
                    }
                     break;
     
                 case "ADD":
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                            AC = AC + sudoStack[SP - Number(valueContainer[pointer])]
                        }else{
                        AC = AC + valueContainer[Number(valueContainer[pointer]) + indexOfVV]
                        }
                    }else{
                        AC = AC + Number(valueContainer[indexOfValue])
                    }
                     break;
     
                 case "SUB":
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                            AC = AC - sudoStack[SP - Number(valueContainer[pointer])]
                        }else{
                        AC = AC - valueContainer[Number(valueContainer[pointer]) + indexOfVV]
                        }
                    }else{
                        AC = AC - Number(valueContainer[indexOfValue])
                    }
                     break;
     
                 case "JUMP":
                    pointer = indexOfValue - 1;
                    loopCut = loopCut+1;
                    if(loopCut >= 300){
                        pointer = pointer+1000;
                        alert("แก้โค้ดครับ มีลูปนรก");
                    }
                     break;
     
                 case "JUMPN":
                    if(AC<0){
                        pointer = indexOfValue - 1;  
                      }
                     break;
     
                 case "INPUT":
                    valueContainer[indexOfValue] = prompt("Enter value of "+valueContainer[pointer]);
                    AC = Number(valueContainer[indexOfValue]);
                     break;
     
                 case "OUTPUT":
                    outputque.push(valueContainer[indexOfValue]);
                     break;
     
                 case "JUMPZ":
                    if(AC == 0 || AC == "0"){
                        pointer = indexOfValue - 1;
                      }
                     break;
     
                 case "LOADX":
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                          XR = sudoStack[SP - Number(valueContainer[pointer])];
                       }else{
                        XR = valueContainer[Number(valueContainer[pointer]) + indexOfVV]
                       }
                    }else{
                        XR = Number(valueContainer[indexOfValue])
                    }
                     break;
     
                 case "STOREX":
                    if(includesVV){
                        if(VVcontainer[pointer] == "SP"){
                            sudoStack[SP - Number(valueContainer[pointer])] = XR;
                       }else{
                        valueContainer[Number(valueContainer[pointer]) + indexOfVV] = XR;
                       }
                      }else{
                          valueContainer[indexOfValue] = XR;
                      }
                     break;
                 case "CALL":
                    returnpoint.push(pointer)
                    console.log(returnpoint)
                    pointer = indexOfValue - 1;
                     break;
     
                 case "RETURN":
                    console.log(returnpoint[returnpoint.length-1])
                    pointer = (returnpoint[returnpoint.length-1]);
                    returnpoint.pop();
                     break;
     
                 case"INCHAR":
                     valueContainer[indexOfValue] = prompt("Enter index value of "+valueContainer[pointer]).charCodeAt();
                     AC = Number(valueContainer[indexOfValue]);
                     break;
     
                 case"OUTCHAR":
                 let decimal = Number(valueContainer[indexOfValue]);
                 let outchar = String.fromCharCode(decimal);
                     outputque.push(outchar)
                     break;
                  case "PUSH":
                    sudoStack.push(Number(valueContainer[indexOfValue]));
                    SP = sudoStack.length - 1;
                    console.log(SP);
                    console.log(sudoStack[SP]);
                      break;
                  case "POP":
                    valueContainer[indexOfValue] = sudoStack[SP];
                    SP = SP-1;
                    sudoStack.length = sudoStack.length-1;
                      break;
                    case "HALT":
                        pointer = pointer + 1000;
                        break;
                }
            }
         
         
     
         for(let o = 0;o<outputque.length;o++){
             const tempo = document.createElement('p');
             tempo.innerHTML = outputque[o];
             outputdiv.appendChild(tempo);
         } 
         console.log("program end");
        
}


    
