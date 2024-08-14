function validateLogin() {
    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const response = await fetch('./data/credentials.csv');
    const csvText = await response.text();

    const rows = csvText.split('\n');

    for (let row of rows) {
        const [csvUsername, csvPassword] = row.split(',');

        if (csvUsername === username && csvPassword.trim() === password) {
            window.location.href = 'banking.html';
            return false; 
        }
    }
    alert("Nombre de usuario o contraseña incorrectos");
    return false; 
}

if()