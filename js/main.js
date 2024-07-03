let user = 0
let pass = 0

let database = ["Facundo", 
            "Malena",
            "Valentin",
            1234, 
            54321, 
            180322]

alert("Bienvenido a tu Homebanking")

login()

// Dentro del proyecto agregaría la opción de registro

function login() {
    user = prompt("Usuario:")
    pass = prompt("Contraseña:")

    let validPass = false
    let validUser = false

    for (let i = 0; i < database.length; i++) {
        if (database[i] == user) {
            validUser = true;
        }
        if (database[i] == pass) {
            validPass = true;
        }
    }

    if(validUser == true && validPass == true){

        alert("Inicio de sesión correcto")
        console.log("Bienvenido a tu cuenta " + user)
        console.log("Tu saldo es: $100")
        options()
    }else{
        alert("Datos incorrectos")
        login()
    }
}

// Dentro del proyecto haría una función para cada opción con su funcionalidad

function options(){
    if(confirm("Ingresar a Préstamos") == true){
        alert("Aún no tenes un préstamo disponible")
    }else if(confirm("Acceder a mis tarjetas") == true){
        alert("Sección mis tarjetas")
        console.log("En esta sección aparecerían todas las tarjetas del cliente")
    }
}