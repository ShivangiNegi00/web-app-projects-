const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    if (select.name === "from" && currCode === "USD"){
        newOption.selected = "selected"; // so that US flag has corresponding name 
    }
    else if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}

 select.addEventListener("change",(evt) => {
    updateFlag(evt.target); // here the country chosen is the target and hence gets passed as a argument
 });
}


// to update flags dynamically 

const updateFlag = (element) => {
    // console.log(element); // refrence to the element 
    // console.log(element.value);  // element.value prints the value of the element at the time the log statement was executed.
    let currCode = element.value;
    let countryCode = countryList[currCode]; // code at index of "currCode" 
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc ; 
};



const updateXchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
       amtval = 1;
       amount.value = "1";
    }
   
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   // fetch the information 
    let response = await fetch(URL);
   //  convert for readble json file
    let data = await response.json();
    //from the data extract the exchange rate of toCurr with respect to fromCurr 
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   //  calculate the final amount 
    let convertedAmount = amtVal*rate;
   // print the final amount on the page 
   msg.innerHTML =  `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value} `;
}

window.addEventListener("load", () => {
    updateXchangeRate();
})

btn.addEventListener("click",async (evt) =>{ 
    evt.preventDefault();// override the default behaviour of the button , we will specify the event occuring 
     updateXchangeRate();
   });
   
// [toCurr]
// [toCurr.value.toLowerCase()]