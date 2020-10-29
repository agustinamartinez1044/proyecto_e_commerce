let porcentajeEnvio = 0.15;
var cont = 0;
var subTotal = 0;
let tipoMoneda = "";
var costoUnitario = 0;
var Total = 0;
var USDaUYU = 40;
let metodoPagoSelec = false;
let faltaInfo = true;
const tarjetaCredito = "Tarjeta de crédito";
const transferencia = "Transferencia bancaria";
let msgError = "Se ha producido un error con el proceso de compra";

function cambiarSubTotal(i) {
    var cambiar = document.getElementById('precio' + i);
    cambiar.innerHTML = tipoMoneda + " " + subTotal;
}

function actualizar() {
    var articulosCarrito = document.querySelectorAll('.costoUnitario');
    var totalarticulos = 0;
    cont = document.getElementsByName("cantidad");

    for (let i = 0; i < articulosCarrito.length; i++) {
        var articuloI = articulosCarrito[i];
        let caant = cont[i];
        var price = parseInt(articuloI.innerText);

        totalarticulos = totalarticulos + (price * caant.value);
        Total = totalarticulos;
        cambiarCostosTotales();
    }
}

function cambiarCostosTotales() {
    let subTotalFinalHTML = document.getElementById("SubtotalFinal");
    let costoEnvioHTML = document.getElementById("CostoEnvio");
    let costoTotalHTML = document.getElementById("costoTotalFinal");
    let costoEnvio = porcentajeEnvio * Total;
    subTotalFinalHTML.innerHTML = Total;
    costoEnvioHTML.innerHTML = costoEnvio;
    costoTotalHTML.innerHTML = (Total + costoEnvio);
}

function mostrarMetodoDePago() {
    document.getElementById("formaPago").style.display = "block";
}

function ocultarMetodoDePago() {
    document.getElementById("formaPago").style.display = "none";
}

function showCartsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        if (articulo.currency === "USD") {
            tipoMoneda = "UYU";
            costoUnitario = articulo.unitCost * USDaUYU;
        }
        else if (articulo.currency === "UYU") {
            tipoMoneda = articulo.currency;
            costoUnitario = articulo.unitCost;
        }

        htmlContentToAppend += `
        <tr id="parrafo`+ i + `">
            <td><img src=`+ articulo.src + ` width="150px"></td>
            <td>`+ articulo.name + `</td>
            <td class="costoUnitario" id="costoU`+ i + `">` + costoUnitario + `</td>
            <td><input class="form-control" name="cantidad" style="width:60px;" id="cant`+ i + `" type="number" value="` + articulo.count + `" min="1"></td>
            <td><span id="precio`+ i + `" style="font-weight: bold">` + tipoMoneda + " " + costoUnitario * articulo.count + `</span></td>
            <td><button type="button" class="btn btn-dark" id="borrar`+ i + `" >Quitar</button></td>
    </tr>`;
    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;

    actualizar();
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];
        document.getElementById('cant' + i).addEventListener("change", event => {
            if (articulo.currency === "USD") {
                tipoMoneda = "UYU";
                costoUnitario = (articulo.unitCost * USDaUYU);
            } else if (articulo.currency === "UYU") {
                tipoMoneda = articulo.currency;
                costoUnitario = articulo.unitCost;
            }
            cont = parseInt(document.getElementById('cant' + i).value);
            subTotal = cont * costoUnitario;
            cambiarSubTotal(i);
            actualizar();
        });
    }
    eliminarArticulo(array);
}

function eliminarArticulo(array) {
    var arrayBorrado = [];
    for (let i = 0; i < array.length; i++) {
        document.getElementById(`borrar` + i).addEventListener("click", event => {
            var precioI = parseInt(document.getElementById(`costoU` + i).innerText);
            cont = parseInt(document.getElementById('cant' + i).value);
            Total = Total - (precioI * cont);
            document.getElementById(`parrafo` + i).innerHTML = "";
            cambiarCostosTotales();
            arrayBorrado.push(array[i]);
            array.splice(i);
        });
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {

        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            arrayCart = productsArray.articles;
            //Muestro los productos
            showCartsList(arrayCart);
            cambiarCostosTotales();
        }
    });

    document.getElementById("envioPremium").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        cambiarCostosTotales();
    });

    document.getElementById("envioExpress").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        cambiarCostosTotales();
    });

    document.getElementById("envioStandard").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        cambiarCostosTotales();
    });

    document.getElementById("tarjetaCredito").addEventListener("change", function () {
        document.getElementById("numTarjeta").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("numCuenta").disabled = true;
        document.getElementById("tipoPago").innerHTML = tarjetaCredito;
        metodoPagoSelec = true;
        ocultarMetodoDePago();


        document.getElementById("numTarjeta").addEventListener("keyup", event => {
            let numT = document.getElementById("numTarjeta").value;
            if (numT.length < 14) {
                faltaInfo = true;
                document.getElementById("numTarjeta").classList.add('is-invalid');
            } else if (numT.length >= 14) {
                faltaInfo = false;
                document.getElementById("numTarjeta").classList.remove('is-invalid');
            }
        });

        document.getElementById("codSeg").addEventListener("keyup", event => {
            let codS = document.getElementById("codSeg").value;
            if (codS.length < 3) {
                faltaInfo = true;
                document.getElementById("codSeg").classList.add('is-invalid');
            } else if (codS.length >= 3) {
                faltaInfo = false;
                document.getElementById("codSeg").classList.remove('is-invalid');
            }
        });

        document.getElementById("vencimiento").addEventListener("keyup", event => {
            let vence = document.getElementById("vencimiento").value;
            if (vencimiento(vence) === false) {
                faltaInfo = true;
                document.getElementById("vencimiento").classList.add('is-invalid');
            } else if (vencimiento(vence) === true) {
                faltaInfo = false;
                document.getElementById("vencimiento").classList.remove('is-invalid');
            }
        });
    });

    document.getElementById("transferencia").addEventListener("change", function () {
        document.getElementById("numCuenta").disabled = false;
        document.getElementById("numTarjeta").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("tipoPago").innerHTML = transferencia;
        metodoPagoSelec = true;
        ocultarMetodoDePago();

        document.getElementById("numCuenta").addEventListener("keyup", event => {
            let numC = document.getElementById("numCuenta").value;
            if (numC.length < 14 || textoVacio(numC) === false) {
                faltaInfo = true;
                numc.classList.add('is-invalid');
            } else if (numC.length >= 14 || textoVacio(numC) === true) {
                numC.classList.remove('is-invalid');
                faltaInfo = false;
            }
        });
    });

    var formEnvio = document.getElementById("formEnvio");

    formEnvio.addEventListener("submit", function (e) {
        let calleEnvio = document.getElementById("calleEnvio");
        let numeroCalleEnvio = document.getElementById("numeroCalleEnvio");
        let esquinaCalleEnvio = document.getElementById("esquinaCalleEnvio");
        faltaInfo = false;
        ocultarMetodoDePago();

        calleEnvio.classList.remove('is-invalid');
        numeroCalleEnvio.classList.remove('is-invalid');
        esquinaCalleEnvio.classList.remove('is-invalid');

        if (calleEnvio.value === "" || calleConEspacios(calleEnvio) === true) {
            calleEnvio.classList.add('is-invalid');
            faltaInfo = true;
            alert("Ingrese una calle válida");
        }
        else if (calleEnvio.value != "") {
            calleEnvio.classList.remove('is-invalid');
            faltaInfo = false;
        }

        if (numeroCalleEnvio.value === "" || shippingStreetNumberInput.value.length < 4
            || soloNum(shippingStreetNumberInput.value) === false) {
            numeroCalleEnvio.classList.add('is-invalid');
            faltaInfo = true;
            alert("Ingrese un número de puerta válido, este debe tener al menos 4 digitos");
        }
        else if (numeroCalleEnvio.value.length > 4 && numeroCalleEnvio != "" && soloNum(shippingStreetNumberInput.value) === true) {
            numeroCalleEnvio.classList.remove('is-invalid');
            faltaInfo = false;
        }

        if (esquinaCalleEnvio.value === "" || calleConEspacios(shippingCornerStreetInput) === true) {
            esquinaCalleEnvio.classList.add('is-invalid');
            faltaInfo = true;
            alert("Ingrese un cruce de calles válido");
        }
        else {
            esquinaCalleEnvio.classList.remove('is-invalid');
            faltaInfo = false;
        }

        if (!metodoPagoSelec) {
            mostrarMetodoDePago();
            faltaInfo = true;
        }


        obtenerJSONData("https://japdevdep.github.io/ecommerce-api/cart/buy.json").then(result => {
            let msgHTML = document.getElementById("ModalLongTitle");
            let mostrarMsg = "";
            if (faltaInfo === true) {
                mostrarMsg = msgError;
                msgHTML.innerHTML = mostrarMsg;
                document.getElementById("modalCuerpo").innerHTML = "Por favor ingrese los datos requeridos...";
            } else if(faltaInfo === false){
                mostrarMsg = result.all.msg;
                msgHTML.innerHTML = mostrarMsg;
                document.getElementById("modalCuerpo").innerHTML = "¡Has comprado con éxito!";
            }
        });
        if (e.preventDefault) e.preventDefault();
        return false;
    });

}); 

var obtenerJSONData = async function(url) {
    var respuesta = {};
    showSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        if(!res.ok) {
            hideSpinner();
            throw new Error(`Error Http! status: ${res.status}`);
        } else {
            hideSpinner();
            respuesta.all = data;
            return respuesta;
        }
    } 
    catch(err) {
        console.log(err);
        hideSpinner();
    }
}

var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
  }
  
  var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
  }

function contieneNum(textoIngresado) {
    var regConNum = new RegExp('\d');
    return regConNum.test(textoIngresado);
}

function soloNum(Num) {
    var regNum = new RegExp('^[0-9]+$');
    return regNum.test(Num);
}

function vencimiento(textVencimiento) {
    var regVenc = new RegExp('^(\d{1,2})(\/)(\d{1,2})\/(\d{4})$');
    return regVenc.test(textVencimiento);
}

function textoVacio(textoIngresado) {
    var regVacio = new RegExp('^-?\d+\.?\d*$')
    return regVacio.test(textoIngresado); 
}

function calleConEspacios(tectoIngresado) {
    var regCalle = new RegExp('^[a-zA-Z_\s]+$')
    return regCalle.test(tectoIngresado);
}