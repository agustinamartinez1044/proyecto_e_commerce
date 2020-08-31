//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById('userinfo').addEventListener('submit', (evento) => {
        evento.preventDefault();
        location.href = "./index.html";
        let usuario = {
            nombre: document.getElementById("inputEmail").value,
            clave: document.getElementById("inputClave").value
        }
        localStorage.setItem("logged", true);
        localStorage.setItem("nom", JSON.stringify(usuario));
        return true;

    })

});