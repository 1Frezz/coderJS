document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  
    validateLogin();  
});

async function validateLogin() {
    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const response = await fetch('../data/credentials.csv');
    const csvText = await response.text();

    const rows = csvText.split('\n');
    let validCredentials = false;

    for (let row of rows) {
        const [csvUsername, csvPassword] = row.split(',');

        if (csvUsername === username && csvPassword.trim() === password) {
            validCredentials = true;
            break;
        }
    }

    if (validCredentials) {
        window.location.href = '../pages/banking.html';
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
}
