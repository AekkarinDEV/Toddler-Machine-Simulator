const addressDiv = document.getElementById("address");
for(let addressNum = 0;addressNum<=99;addressNum++){
    const address = document.createElement("p");
    address.setAttribute("class","lines")
    address.innerHTML = ("["+addressNum+"]");
    addressDiv.appendChild(address)
}

const run = ()  => {
    let functionContainer = [];
    let codeContainer = [];
    let valueContainer = [];

    let userInput = document.getElementById("inputcode").value;
    let userInputRemovedSpace = userInput.split(";");
    userInputRemovedSpace.forEach(element => {
        console.log(element);
        let fandc = element.split(":")
        console.log(fandc);
        console.log(fandc[1])
        functionContainer.push(fandc[0]);
        let codeAndValue = fandc[1];
        let splitCodeFromValue = codeAndValue.split(" ");
        console.log(splitCodeFromValue);
        // console.log(splitCodeFromValue);
        codeContainer.push(splitCodeFromValue[0]);
        if(splitCodeFromValue[0]!= "RETURN" || splitCodeFromValue[0]!= "RETURN")
            {valueContainer.push(splitCodeFromValue[1]);}
        console.log(functionContainer);
        console.log(codeContainer);
        console.log(valueContainer);
    });
    

}