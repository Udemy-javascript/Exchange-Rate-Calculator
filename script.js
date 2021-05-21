let currency_array=[
    "AED", "ARS", "AUD", "BGN", "BRL", "BSD", "CAD", "CHF", 
    "CLP", "CNY", "COP", "CZK", "DKK", "DOP", "EGP", "EUR", 
    "FJD", "GBP", "GTQ", "HKD", "HRK", "HUF", "IDR", "ILS", 
    "INR", "ISK", "JPY", "KRW", "KZT", "MXN", "MYR", "NOK", 
    "NZD", "PAB", "PEN", "PHP", "PKR", "PLN", "PYG", "RON", 
    "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", 
    "USD", "UYU", "VND", "ZAR"
];
generateOptions("currency-one", "SEK");
generateOptions("currency-two", "PLN");

function generateOptions(name, selectedCurrency) {
    let select = document.getElementById(name);
    for(index in currency_array) {
        select.options[select.options.length] = new Option(currency_array[index], index);
        select.options[index].value = currency_array[index];
        if (currency_array[index] == selectedCurrency) {
            select.options[index].setAttribute('selected', true);
        }
    }
}
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  //https://cors-anywhere.herokuapp.com/
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
