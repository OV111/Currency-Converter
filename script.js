// import { fetchCurrencyData } from "./currscript.js";
const amount = document.getElementById("amount");
let from = document.getElementById("from");
const changeBtn = document.getElementById("change");
const to = document.getElementById("to");
const rateValue = document.getElementById("rate-value");
const rateText = document.getElementById("rate-text");
const convertBtn = document.getElementById("convert");


let apiKey = "4e6297c2a1106ed9038cce83";

async function api() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/4e6297c2a1106ed9038cce83/latest/USD`);
        const data = await response.json();
        console.log(data);
        const rateEntries = Object.entries(data.conversion_rates);        
        rateEntries.forEach((key) => {
            const option = document.createElement("option");
            option.text = key[0];
            option.value = key[1];
            from.appendChild(option);
        });
    } catch(error) {
        console.log("Error fetching data!",error);
    }
}  
api()
