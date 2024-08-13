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
        <ul id="loanHistory"></ul>
        <button id="resetHistoryButton">Resetear Historial</button>
    `;
    loanSection.style.display = 'none';
    main.appendChild(loanSection);

    document.getElementById('showLoanCalculator').addEventListener('click', () => {
        loanSection.style.display = 'block';
    });

    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
        const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;

        const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
        document.getElementById('loanResult').innerText = `Pago mensual: $${monthlyPayment.toFixed(2)}`;

        const newCalculation = { loanAmount, interestRate, loanTerm, monthlyPayment };

        let loanHistory = JSON.parse(localStorage.getItem('loanHistory')) || [];
        loanHistory.push(newCalculation);
        localStorage.setItem('loanHistory', JSON.stringify(loanHistory));

        updateLoanHistory();
    }

    function calculateMonthlyPayment(principal, rate, term) {
        return (principal * rate) / (1 - Math.pow(1 + rate, -term));
    }

    function updateLoanHistory() {
        const loanHistory = JSON.parse(localStorage.getItem('loanHistory')) || [];
        const loanHistoryElement = document.getElementById('loanHistory');
        loanHistoryElement.innerHTML = '';

        loanHistory.forEach((calculation, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                Monto: $${calculation.loanAmount}, Tasa: ${(calculation.interestRate * 12 * 100).toFixed(2)}%, Plazo: ${calculation.loanTerm / 12} años, Pago mensual: $${calculation.monthlyPayment.toFixed(2)}
                <button class="deleteCalculation" data-index="${index}">Eliminar</button>
            `;
            loanHistoryElement.appendChild(listItem);
        });

        document.querySelectorAll('.deleteCalculation').forEach(button => {
            button.addEventListener('click', deleteCalculation);
        });
    }

    function deleteCalculation(event) {
        const index = event.target.getAttribute('data-index');
        let loanHistory = JSON.parse(localStorage.getItem('loanHistory')) || [];
        loanHistory.splice(index, 1);
        localStorage.setItem('loanHistory', JSON.stringify(loanHistory));
        updateLoanHistory();
    }

    function resetHistory() {
        localStorage.removeItem('loanHistory');
        updateLoanHistory();
    }

    document.getElementById('calculateButton').addEventListener('click', calculateLoan);
    document.getElementById('resetHistoryButton').addEventListener('click', resetHistory);

    updateLoanHistory();
});