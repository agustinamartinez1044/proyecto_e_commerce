document.getElementById("editarPerfil").addEventListener("click", function(e){
    var user = JSON.parse(localStorage.getItem("datos"));
    document.getElementById("nombreform").value = user.nombre;
    document.getElementById("apellidoform").value = user.apellido;
    document.getElementById("emailform").value = user.email;
    document.getElementById("edadform").value = user.edad;
    document.getElementById("telefonoform").value = user.telefono;
})

function guardarDatos() {
    document.getElementById("infoperfil").addEventListener("click", function (e) { 
        let datosperfil = {
            nombre: document.getElementById("nombreform").value,
            apellido: document.getElementById("apellidoform").value,
            email: document.getElementById("emailform").value,
            edad: document.getElementById("edadform").value,
            telefono: document.getElementById("telefonoform").value
        }
        localStorage.setItem("datos", JSON.stringify(datosperfil));
        mostrarDatos();
    })
}

function mostrarDatos(){
    var infos = JSON.parse(localStorage.getItem("datos"));
        document.getElementById("nombreinfo").innerHTML = infos.nombre
        document.getElementById("apellidoinfo").innerHTML = infos.apellido;
        document.getElementById("emailinfo").innerHTML = infos.email;
        document.getElementById("edadinfo").innerHTML = infos.edad;
        document.getElementById("celularinfo").innerHTML = infos.telefono;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    guardarDatos();
    mostrarDatos();
    // mostrarDatos();
});
