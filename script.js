// import { fetchCurrencyData } from "./currscript.js";
const amount = document.getElementById("amount");
const from = document.getElementById("from");
const changeBtn = document.getElementById("change");
const to = document.getElementById("to");
const rateValue = document.getElementById("rate-value");
const rateText = document.getElementById("rate-text");
const convertBtn = document.getElementById("convert");


let apiKey = "4e6297c2a1106ed9038cce83";

async function api() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/4e6297c2a1106ed9038cce83/latest/USD`);
        if(response.status === 200) {
            const data = await response.json();
            // console.log(data);
            const rateEntries = Object.entries(data.conversion_rates);        
            rateEntries.forEach((key) => {
                const optionFrom = document.createElement("option");
                optionFrom.text = key[0];
                optionFrom.value = key[1];
                from.appendChild(optionFrom);
    
                const optionTo = document.createElement("option");
                optionTo.text = key[0];
                optionTo.value = key[1];
                to.appendChild(optionTo);
            });
        } else if(response.status === 400) {
            throw new Error("The exchange rates data could not be found (404).");
        } else if(response.status === 500) {
            throw new Error("There was a problem with the server (500). Please try again later.");
        } else {
            throw new Error(`Unexpected error with status code: ${response.status}`);
        }
    } catch(error) {
        console.error("Error fetching data!",error);
    }
}  
api();

