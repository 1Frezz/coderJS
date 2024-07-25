document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const loanSection = document.createElement('section');
    loanSection.classList.add('loan-calculator');
    loanSection.innerHTML = `
        <h2>Calculadora de Préstamos</h2>
        <input type="number" id="loanAmount" placeholder="Monto del Préstamo">
        <input type="number" id="interestRate" placeholder="Tasa de Interés (%)">
        <input type="number" id="loanTerm" placeholder="Plazo del Préstamo (años)">
        <button id="calculateButton">Calcular</button>
        <p id="loanResult"></p>
    `;
    loanSection.style.display = 'none';
    main.appendChild(loanSection);

    document.getElementById('showLoanCalculator').addEventListener('click', () => {
        loanSection.style.display = 'block';
        converterSection.style.display = 'none';
    });

    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
        const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;

        const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
        document.getElementById('loanResult').innerText = `Pago mensual: $${monthlyPayment.toFixed(2)}`;

        localStorage.setItem('lastLoanCalculation', JSON.stringify({ loanAmount, interestRate, loanTerm, monthlyPayment }));
    }

    function calculateMonthlyPayment(principal, rate, term) {
        return (principal * rate) / (1 - Math.pow(1 + rate, -term));
    }

    function applyToEach(arr, func) {
        arr.forEach(func);
    }

    function logCalculation(calculation) {
        console.log(`Monto: ${calculation.loanAmount}, Tasa: ${calculation.interestRate}, Plazo: ${calculation.loanTerm}, Pago mensual: $${calculation.monthlyPayment}`);
    }

    document.getElementById('calculateButton').addEventListener('click', calculateLoan);

    const lastCalculation = JSON.parse(localStorage.getItem('lastLoanCalculation'));
    if (lastCalculation) {
        document.getElementById('loanResult').innerText = `Pago mensual: $ ${lastCalculation.monthlyPayment.toFixed(2)}`;
        applyToEach([lastCalculation], logCalculation);
    }
});
