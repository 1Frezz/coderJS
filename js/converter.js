const main = document.querySelector("main");
const converterSection = document.createElement("section");
converterSection.classList.add("converter");
converterSection.innerHTML = `
    <h2>Conversor de Divisas</h2>
    <input type="number" id="amount" placeholder="Cantidad">
    <select id="fromCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ARS">ARS</option>
    </select>
    <select id="toCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ARS">ARS</option>
    </select>
    <button id="convertButton">Convertir</button>
    <p id="result"></p>
`;
converterSection.style.display = "none";
main.appendChild(converterSection);

document.getElementById("showConverter").addEventListener("click", () => {
  converterSection.style.display = "block";
  loanSection.style.display = "none";
});

const exchangeRates = {
  ARS: { ARS: 1, USD: 1 / 1500, EUR: (1 / 1500) * 0.85 },
  USD: { ARS: 1500, EUR: 0.85 },
  EUR: { USD: 1.18, ARS: 1500 / 1.18 },
};

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (amount > 0) {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;

    document.getElementById(
      "result"
    ).innerText = `${amount} ${fromCurrency} = ${result.toFixed(
      2
    )} ${toCurrency}`;

    localStorage.setItem(   
      "lastConversion",
      JSON.stringify({ amount, fromCurrency, toCurrency, result })
    );
  } else {
    alert("Error, el monto debe ser positivo");
  }
}

document
  .getElementById("convertButton")
  .addEventListener("click", convertCurrency);

const lastConversion = JSON.parse(localStorage.getItem("lastConversion"));
if (lastConversion) {
  document.getElementById("result").innerText = `${lastConversion.amount} ${
    lastConversion.fromCurrency
  } = ${lastConversion.result.toFixed(2)} ${lastConversion.toCurrency}`;
}
