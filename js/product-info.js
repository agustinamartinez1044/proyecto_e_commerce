function showProductsList(info) {
    let html = "";
        html += `
            <a href="product-info.html?producto=` + info.name + `"class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-2">
                        <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ info.name + " - " + info.currency + " " + info.cost + `</h4>
                            <small class="text-muted">` + info.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + info.description + `</p>
                        
                    </div>
                </div>
            </a>`
    return html;
}

function showImagesGallery(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        htmlContentToAppend += `
        <div class="col-lg-2 col-md-2 col-3">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function showRelatedProducts(arrayRelatedProducts, productoRelated){
    let htmlContentToAppendRelated = "";
    for (let i = 0; i <arrayRelatedProducts.length; i++) {
        let info = productoRelated[i];
        htmlContentToAppendRelated += ` ` + showProductsList(info) + ``
        document.getElementById("productoRelated").innerHTML = htmlContentToAppendRelated;
    }
}

function obtenerEstrellasVacia(puntaje) {
    let estrellasVacias = "";
    for (let i = puntaje; i < 5; i++) {
        estrellasVacias += `<span class="fa fa-star"></span>`
    }
    return estrellasVacias;
}

function obtenerEstrellas(puntaje) {
    let estrellas = "";
    for (let i = 0; i < puntaje; i++) {
        estrellas += `<span class="fa fa-star checked"></span>`
    }
    return estrellas;
}

function showCommentsList(array) {
    let htmlComments = "";
    let html= "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        htmlComments += `
        <div class="row">
            <div class="list-group-item list-group-item-action">
                <div class="text-center p-4"> 
                <div class="row text-center text-lg-left pt-2 "> 
                <h5 class="text-center">`+ `<i class="fas fa-user"></i>` + ` ` + comment.user + `</h> 
            </div>  
                    <div class="row text-center text-lg-left pt-6 "> 
                        <p id="commentScore">` + comment.score + `
                            <div class="stars-outer">` + obtenerEstrellas(comment.score) + obtenerEstrellasVacia(comment.score) + ` </div>
                        </p>
                    </div>  
 
                    <div class="row text-center text-lg-left pt-2 "> 
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                    <div class="d-flex w-100 justify-content-between  pt-2">
                        <h4 class="mb-1">`+ " " + `</h4>
                        <small class="float-right">`+ `<i class="fas fa-calendar-alt"></i>` + ` `  +  comment.dateTime + `</small>
                    </div>
                </div>
            </div>  
    </div>`
    }
    html += `Comentarios (` + array.length + `) `;
    document.getElementById("comments").innerHTML = htmlComments;
    document.getElementById("cantidad").innerHTML = html;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
let nombre = getQueryVariable('producto');
let name = decodeURIComponent(nombre);

document.addEventListener("DOMContentLoaded", function (e) {
    let productoRelated;
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoRelated = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            let productoNameHTML = document.getElementById("productoName");
            let productoDescriptionHTML = document.getElementById("productoDescription");
            let productCountHTML = document.getElementById("productCount");
            let productoCostHTML = document.getElementById("productoCost");

            productoNameHTML.innerHTML = name;
            productoDescriptionHTML.innerHTML = producto.description;
            productCountHTML.innerHTML = producto.soldCount;
            productoCostHTML.innerHTML = producto.currency + " " + producto.cost;

            showImagesGallery(producto.images);
            showRelatedProducts(producto.relatedProducts, productoRelated);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCommentsList(resultObj.data);
        }
    });
});