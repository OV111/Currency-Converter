const amount = document.getElementById("amount");
const from = document.getElementById("from");
const changeBtn = document.getElementById("change");
const to = document.getElementById("to");
const rateValue = document.getElementById("rate-value");
const rateText = document.getElementById("rate-text");
const convertBtn = document.getElementById("convert");


let apiKey = "cur_live_1bR6N58mlpIgRYSM823thcXmeNNt3s1ADQGyc5DV";

async function api() {
    let x = await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_1bR6N58mlpIgRYSM823thcXmeNNt3s1ADQGyc5DV");
    console.log(x)
}  
api();  

