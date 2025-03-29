const amount = document.getElementById("amount");
const from = document.getElementById("from");
const changeBtn = document.getElementById("change");
const to = document.getElementById("to");
const rateValue = document.getElementById("rate-value");
const rateCurr = document.getElementById("rate-curr");
const rateText = document.getElementById("rate-text");
const convertBtn = document.getElementById("convert");

let exchange_rates = {};
const apiKey = "4e6297c2a1106ed9038cce83";

async function api() {
    try {
        // loadingIndicator.style.display = "block";
        const response = await fetch(`https://v6.exchangerate-api.com/v6/4e6297c2a1106ed9038cce83/latest/USD`);
        if(response.status === 200) {
            const data = await response.json(); // console.log(data);
            exchange_rates = data.conversion_rates;
            const rateEntries = Object.entries(data.conversion_rates);        
            populateCurrency(rateEntries);
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
    // finally {
    //     loadingIndicator.style.display = "none";
    // }
}
const populateCurrency = (rateEntries) => {
    rateEntries.forEach((key) => {
        const optionFrom = document.createElement("option");
        const optionTo = document.createElement("option");

        optionFrom.text = key[0];
        optionFrom.value = key[1];
        from.appendChild(optionFrom);

        optionTo.text = key[0];
        optionTo.value = key[1];
        to.appendChild(optionTo);
    });
};
changeBtn.addEventListener("click", () => {
    [from.value,to.value] = [to.value,from.value];
    convertBtn.addEventListener("click", calcRate());
});
const calcRate = () => {
    const amountValue = amount.value;
    const fromCurrencyValue = from.value; 
    const toCurrencyValue = to.value;
    const fromCurrencyText = from.options[from.selectedIndex].text;
    const toCurrencyText = to.options[to.selectedIndex].text;
    const fromRate = Number(fromCurrencyValue);
    const toRate = Number(toCurrencyValue);
    if(!amountValue) {
        console.log("Enter valid number!");
        return ;
    }
    const result = (amountValue / fromRate) * toRate;        
    displayRate(result,toCurrencyText,fromCurrencyText,toRate);
};
const displayRate = (convertedAmount,toCurrency,fromCurrency,toRate) => {
    rateValue.textContent = convertedAmount.toFixed(2);
    rateCurr.textContent = toCurrency;
    rateText.textContent = `1 ${fromCurrency} = ${toRate.toFixed(2)} ${toCurrency} `;
};

convertBtn.addEventListener("click", calcRate);
api();