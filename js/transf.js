const transferButtons = document.querySelectorAll('.transfer-button');

function addToHistory(description) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = description;
    historyList.appendChild(listItem);
    saveHistory();
}

function saveHistory() {
    const items = [];
    const historyList = document.getElementById('history-list');
    historyList.querySelectorAll('li').forEach(item => {
        items.push(item.textContent);
    });
    localStorage.setItem('history', JSON.stringify(items));
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    savedHistory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

loadHistory();

const clearHistoryButton = document.getElementById('clear-history');
clearHistoryButton.addEventListener('click', function() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    localStorage.removeItem('history');
});

document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
        addToHistory(`Acción: ${this.textContent} - Fecha: ${new Date().toLocaleString()}`);
    });
});

document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
        addToHistory(`Acción: ${this.textContent} - Fecha: ${new Date().toLocaleString()}`);
    });
});

transferButtons.forEach(button => {
    button.addEventListener('click', function () {
        const accountElement = this.closest('.account');
        const balance = parseFloat(accountElement.getAttribute('data-balance'));

        if (balance > 0) {
            window.location.href = 'transf.html';
        } else {
            alert('No hay saldo para transferir');
        }
    });
});

document.querySelector('.confirm-button').addEventListener('click', function () {
    const balance = 120.01;
    const amount = parseFloat(document.getElementById('amount').value);

    if (amount > 0 && amount <= balance) {
        alert('Transferencia exitosa.');
        generatePDF();
    } else if (amount > balance) {
        alert('Saldo insuficiente para realizar la transferencia.');
    } else {
        alert('El monto a transferir debe ser mayor a 0.');
    }
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(20, 20, 'Comprobante de Transferencia');
    doc.text(20, 30, `CVU/CBU o Alias: ${document.getElementById('cbu').value}`);
    doc.text(20, 40, `CUIL/CUIT: ${document.getElementById('cuit').value}`);
    doc.text(20, 50, `Monto Transferido: $${document.getElementById('amount').value}`);
    doc.text(20, 60, `Cuenta Destino: Jesus Gabriel Jorge`);
    doc.text(20, 70, 'Gracias por utilizar nuestros servicios.');

    doc.save('comprobante.pdf');
}