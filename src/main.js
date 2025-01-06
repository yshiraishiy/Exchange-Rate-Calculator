const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

let isCalculating = false;

// 為替レートをフェッチしDOMを更新
function calculate(baseCurrency, targetCurrency, amount, targetInput) {
  if (isCalculating) return;
  isCalculating = true;
  fetch(`https://open.exchangerate-api.com/v6/latest/${baseCurrency}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[targetCurrency];

      rateEl.innerHTML = `1 ${baseCurrency} = ${rate} ${targetCurrency}`;

      targetInput.value = (amount * rate).toFixed(2);
      isCalculating = false;
    })
    .catch(() => {
      isCalculating = false;
    });
}

// イベントリスナー
currencyEl_one.addEventListener("change", () => {
  calculate(currencyEl_one.value, currencyEl_two.value, amountEl_one.value, amountEl_two);
});

currencyEl_two.addEventListener("change", () => {
  calculate(currencyEl_two.value, currencyEl_one.value, amountEl_two.value, amountEl_one);
});

amountEl_one.addEventListener("input", () => {
  calculate(currencyEl_one.value, currencyEl_two.value, amountEl_one.value, amountEl_two);
});

amountEl_two.addEventListener("input", () => {
  calculate(currencyEl_two.value, currencyEl_one.value, amountEl_two.value, amountEl_one);
});

swap.addEventListener("click", () => {
  const tempCurrency = currencyEl_one.value;
  const tempAmount = amountEl_one.value;

  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = tempCurrency;

  amountEl_one.value = amountEl_two.value;
  amountEl_two.value = tempAmount;

  calculate(currencyEl_one.value, currencyEl_two.value, amountEl_one.value, amountEl_two);
});


calculate(
  currencyEl_one.value,
  currencyEl_two.value,
  amountEl_one.value,
  amountEl_two
);
