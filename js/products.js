//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
getJSONData(PRODUCTS_URL)
    .then(function (resultado) {

        let datos = resultado.data;
        console.log(datos);

        let html = "";
        for (let i = 0; i < datos.length; i++) {
            let dat = datos[i];
            html += `
            <a href="products-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + dat.imgSrc + `" alt="` + dat.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ dat.name + " - " + dat.currency + " "+ dat.cost +`</h4>
                            <small class="text-muted">` + dat.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + dat.description  +`</p>
                        
                    </div>
                </div>
            </a>`
        document.getElementById("contenedor").innerHTML = html;
    }
})

        
document.addEventListener("DOMContentLoaded", function (e) {
});


//OTRA FORMA
/*fetch(url)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        for (let i = 0; i < datos.all.leght; i++) {
            document.getElementById("contenedor").innerHTML += '<p>' + datos.all[i].text + '</p>';
        }
    })
*/