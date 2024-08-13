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
    <h3>Historial de conversiones</h3>
    <ul id="conversionHistory"></ul>
    <button id="resetHistory">Resetear Historial</button>
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

function updateHistory() {
  const conversionHistory = document.getElementById("conversionHistory");
  conversionHistory.innerHTML = "";

  const conversions = JSON.parse(localStorage.getItem("conversions")) || [];
  conversions.forEach((conversion, index) => {
    const li = document.createElement("li");
    li.innerText = `${conversion.amount} ${conversion.fromCurrency} = ${conversion.result.toFixed(2)} ${conversion.toCurrency}`;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.addEventListener("click", () => {
      deleteConversion(index);
    });
    li.appendChild(deleteButton);
    conversionHistory.appendChild(li);
  });
}

function deleteConversion(index) {
  const conversions = JSON.parse(localStorage.getItem("conversions")) || [];
  conversions.splice(index, 1);
  localStorage.setItem("conversions", JSON.stringify(conversions));
  updateHistory();
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (amount > 0) {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;

    document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;

    const conversions = JSON.parse(localStorage.getItem("conversions")) || [];
    conversions.push({ amount, fromCurrency, toCurrency, result });
    localStorage.setItem("conversions", JSON.stringify(conversions));

    updateHistory();
  } else {
    alert("Error, el monto debe ser positivo");
  }
}

document.getElementById("convertButton").addEventListener("click", convertCurrency);

document.getElementById("resetHistory").addEventListener("click", () => {
  localStorage.removeItem("conversions");
  updateHistory();
});

updateHistory();  