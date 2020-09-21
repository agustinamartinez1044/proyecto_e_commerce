const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
  if ((!localStorage.getItem("nom")) && !(window.location.href.endsWith("login.html"))) {
    window.location.href = "login.html"
  }
  else {
    let user = JSON.parse(localStorage.getItem("nom"));
    let html = document.createElement("a");
    html.innerHTML += `<div class="dropdown">
    <div class="site-header sticky-top py-1 bg-dark container d-flex flex-column flex-md-row justify-content-between"">
      <button class="btn btn-secondary dropdown-toggle" style="background-color: transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ` + user.nombre + `
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
        <a class="dropdown-item" href="./my-profile.html">Mi perfil</a>
        <a class="dropdown-item" id="logout" href="#">Cerrar sesión</a>
      </div>
      </div>
    </div>`

    let naav = document.getElementsByTagName("nav")[0];
    naav.children[0].appendChild(html);
    html.style.color = 'white';
    document.getElementById('logout').addEventListener("click", function(){
      localStorage.removeItem("nom");
      localStorage.setItem("logged", false);
      window.location.replace("./login.html");
      
    })
  }
});

