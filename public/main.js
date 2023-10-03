let regreso = localStorage.getItem("inputValueEntradaEdad");
let regresoOn = parseInt(regreso);

const socket = io();
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "idmail" });
const messageSchema = new schema.Entity("texts", {
  author: authorSchema,
});

const messageSchemaOk = [messageSchema];
const mostrarRegreso = () => {
  if (regresoOn >= 18) {
    document.getElementById("acceso").remove();
  } else if (regresoOn <= 17) {
    bloquearAcceso();
  } else if (regresoOn == " ") {
    document.getElementById("acceso");
  }
};
const respuesta = () => {
  let inputValue = document.getElementById("entradaEdad").value;
  localStorage.setItem("inputValueEntradaEdad", inputValue);
  if (inputValue >= 18) {
    document.getElementById("acceso").remove();
  } else if (inputValue < 17) {
    bloquearAcceso();
  }
};
const bloquearAcceso = () => {
  Swal.fire({
    title: "<h5> Al parecer eres menor de edad</h5>",
    icon: "warning",
    html:
      " NO tomes antes de los 18 te recomendamos visitar este sitio web " +
      "<a href=https://www.clinicaalemana.cl/centro-de-extension/material-educativo/no-tomes-antes-de-los-18> VISITAR </a> ",
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    showConfirmButton: false,
    confirmButtonText: false,
    confirmButtonAriaLabel: false,
    allowOutsideClick: false,
  });
};

// Renderiza formulario para subir un nuevo producto
const renderPostNewProducto = () => {
  let htmlUpdate = "";
  htmlUpdate += `
  <div class="row p-5 ps-2">
        <div class="col text-white ms-5 text-center">
          <h1>Agregar Un Nuevo Producto</h1>
        </div>
      </div>
      <form enctype="multipart/form-data" method="POST" class="row p-5 formNewProduct" onsubmit="newProduct();return false;">
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">Nombre del Licor</p>
          <input id="newIngProduct" type="text" name="product"  maxlength="27" placeholder="Ingresa nombre del producto " class="w-75" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa tipo de licor</p>
        <input id="newTypeLicor" type="text" maxlength="27" name="typeOfLiquor" class="w-100" required="true" />
      </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">precio del producto</p>
          <input id="newIngPrecio" type="number" min="10" max="100000" placeholder="ingresa el precio del producto" name="price" class="w-50" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">ingresa URL de imagen</p>
          <input id="newIngImage" type="text" name="image" class="w-100" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa stock disponible</p>
        <input id="newIngStock" type="number" min="1" max="500" name="stockItems" class="w-100" required="true" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa CodeItem</p>
        <input id="newIngCodeItem" type="number" min="1" max="100000" name="codeItem" class="w-100" required="true" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa Descripcion del producto</p>
        <input id="newIngDescription" type="text" maxlength="50" name="description" class="w-100" required="true" />
      </div>
        <div class="containerButtonUpdate col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center">
          <button class="buttonUpdateProduct" type="submit" > Actualizar Producto </button>
        </div>
      </form>`;
  document.getElementById("renderPostProducts").innerHTML = htmlUpdate;
};
///////////////////////////////FETCH POST PARA NUEVOS PRODUCTOS
const newProduct = () => {
  const nameProductNew = document.getElementById("newIngProduct").value;
  const typeOfLicor = document.getElementById("newTypeLicor").value;
  const newPriceProduct = document.getElementById("newIngPrecio").value;
  const newImageProduct = document.getElementById("newIngImage").value;
  const newDescriptionProduct = document.getElementById("newIngDescription").value;
  const newStockProduct = document.getElementById("newIngStock").value;
  const newCodeItem = document.getElementById("newIngCodeItem").value;
  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: nameProductNew,
      typeOfLiquor: typeOfLicor,
      price: newPriceProduct,
      image: newImageProduct,
      description: newDescriptionProduct,
      stockItems: newStockProduct,
      codeItem: newCodeItem,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.blockToAdmin) {
        alert("reservado solo para administradores");
      }
      if (res.idAsignado) {
        alert("ProductoagregadoCorrectamente");
        window.location.href = window.location.href;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
/////////////////////////////////  Renderiza rpara hacer put a un producto
const renderFormActProduct = (number) => {
  let x = number;
  const p = JSON.parse(x);
  let htmlFormActProduct = "";
  htmlFormActProduct += `
  <div id="formUpdateProduct"class="container-fluid mt-5">
    <div class="row p-5 ps-2">
      <div class="col text-white ms-5 text-center">
      <h1>Editar Un Producto</h1>
      </div>
    </div>
    <div  class="formNewProduct row p-5"> 
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">Nombre del Licor</p>
      <input id="updateProduct" type="text" maxlength="27  placeholder="${p.product}" class="w-75"
      value="${p.product}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2"> tipo de licor</p>
      <input id="updatetypeOfLiquor" maxlength="27 type="text" placeholder="${p.typeOfLiquor}" class="w-75"
      value="${p.typeOfLiquor}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">precio del producto</p>
        <input id="updatePrecio" type="number" min="10" max="100000" placeholder="${p.price}"  class="w-50"
        value="${p.price}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa URL de imagen</p>
        <input id="updateImagen" type="text" placeholder="${p.image}" class="w-100" value="${p.image}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa Descripcion del producto</p>
        <input id="updateDescription" maxlength="50" type="text" placeholder="${p.description}" class="w-100" value="${p.description}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa stock disponible</p>
        <input id="updateStock" min="1" max="1000" type="number" placeholder="${p.stockItems}" class="w-100"value="${p.stockItems}"  />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa CodeItem</p>
        <input id="updateCodeItem" min="10" max="100000" type="number" placeholder="${p.codeItem}" class="w-100"value="${p.codeItem}"  />
      </div>
      <div class="containerButtonUpdate col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center ps-5 ms-5">
        <button class="buttonUpdateProduct" type="submit" onclick="updateOneProduct('${p.id || p._id}')" > Actualizar Producto</button>
      </div>   
    </div>  
  </div>
      `;
  document.getElementById("formuToActulisedOneItem").innerHTML = htmlFormActProduct;
};
///////////////////////////////////////Fetch Para hacer update a un producto
const updateOneProduct = (idParameter) => {
  const idToEdit = idParameter;
  const updateProduct = document.getElementById("updateProduct").value;
  const updatePrecio = document.getElementById("updatePrecio").value;
  const updateImagen = document.getElementById("updateImagen").value;
  const updateDescription = document.getElementById("updateDescription").value;
  const updateStock = document.getElementById("updateStock").value;
  const updateCodeItem = document.getElementById("updateCodeItem").value;
  const updatetypeOfLiquor = document.getElementById("updatetypeOfLiquor").value;
  let url = "http://localhost:8080/api/productos/";
  fetch(url + idToEdit, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: updateProduct,
      typeOfLiquor: updatetypeOfLiquor,
      price: updatePrecio,
      image: updateImagen,
      description: updateDescription,
      stockItems: updateStock,
      codeItem: updateCodeItem,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.blockToAdmin) {
        alert("Reservado solo para administradores");
      }
      window.location.href = window.location.href;
      console.log(res);
    });
};
//////////Fetch Post agregar articulo al carrito
const addArticleTrolley = (idAdd) => {
  let amountToBuy = document.getElementById("inputAmoutToBuy").value;
  let endopintToAddTrolley = "http://localhost:8080/api/carrito?cantidad=";
  let z = "";
  document.getElementById("renderCantItems").innerHTML = z;
  fetch(endopintToAddTrolley + amountToBuy, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: idAdd }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
//Fetch Delete a un  producto
const deleteElement = (idAb) => {
  let url = "http://localhost:8080/api/productos/";
  fetch(url + idAb, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.itemDelete) {
        window.location.href = window.location.href;
      }
      if (res.blockToAdmin) {
        alert("Reservado solo para administradores");
      }
    });
};
///////////////Renderiza un input para cantidad de productos a comprar
const renderCantItemsF = (idproduct) => {
  let impDomC = "";
  impDomC += `
  <div>
  <h3> Elige la cantidad que agregaras </h3>
  <input id="inputAmoutToBuy" min="1" max="20" type="number" placeholder="cantidad" />
  <div class="containerButtonLoggin">
  <button onclick="addArticleTrolley('${idproduct}')" class="butonLogin bEnv" type="submit"> Agregar </button>
  </div>
  </div>
  `;
  document.getElementById("renderCantItems").innerHTML = impDomC;
};

/////////////////////////////////Fetch Get buscador Por Nombre y renderiza items
const buscadorItems = () => {
  let entradaAbuscar = document.getElementById("inputSearch").value;

  fetch("http://localhost:8080/api/productos/busqueda?product=" + entradaAbuscar)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("inputSearch").value = "";
      const inventarioVinateria = json;
      let html1 = "";
      if (inventarioVinateria.length == 0) {
        html1 += `
        <div>
        <h5 class="fs-1" >sin Resultados por el momento</h5>
        </div>`;
      }
      inventarioVinateria.forEach((el) => {
        html1 += `
        <div id="cardOneItem">
        <img class="rounded mt-3" src="${el.image}" alt="">
          <p >  ${el.product}  </p>
          <p> $ ${el.price} </p>
          <span  onclick=addArticleTrolley("${el._id || el.id}");> agregar al 🛒 </span>
          <span  onclick=deleteElement("${el._id || el.id}");>borrar 🗑️ </span>
        </div>
        `;
      });
      document.getElementById("interfaceRenderItems").innerHTML = html1;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
if (window.location.pathname == "/api/productos") {
  document.getElementById("inputSearch").focus();
}
document.getElementById("inputSearch").addEventListener("click", () => {
  if (window.location.pathname == "/api/productos") {
    document.getElementById("inputSearch").focus();
    return;
  }
  window.location.pathname = "/api/productos";
});

document.getElementById("inputSearch").addEventListener("keypress", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    buscadorItems();
  }
});
//////////////////////////Fetch DELETE ITEMS TROLLEY
const deleteItemTrolley = (idItem) => {
  let url = "http://localhost:8080/api/carritodelete/";
  fetch(url + idItem, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.msge == "producto eliminido de tu carrtio correctamente") {
        window.location.href = "/perfil/login";
      }
    });
};
////////////////////////////////////Sockets
//funcion para enviar mensaje
const enviarMsg = () => {
  const msgeParaEnviar = document.getElementById("inputMsg").value;
  socket.emit("msg", {
    text: msgeParaEnviar,
  });
};
socket.on("connect", () => {
  console.log("socket Connect");
});
socket.emit("on", {});
socket.on("notLogin", (messageNotOLogin) => {
  Swal.fire({
    text: `${messageNotOLogin}`,
    background: "#151514",
    showConfirmButton: false,
    timer: 550,
  });
});
socket.on("listaMsgs", (data) => {
  let html = "";
  const normalizedCount = document.getElementById("normalizados");
  const denormalizedCount = document.getElementById("desnormalizados");
  //////DESNORMALIZAMOS
  const denormalized = denormalize(data.result, messageSchemaOk, data.entities);
  denormalized.forEach((el) => {
    html += `
    <div>
      <p class="user"> <img class="imgchat" src="${el.author.avatar}" alt=""> ${el.author.idmail} dice: </p>
      <p class="mensaje"> ${el.text} </p>
    </div>
    `;
  });
  document.getElementById("boxMsges").innerHTML = html;
});
////
///

var inputFile = document.getElementById("fileImg");
inputFile.addEventListener("change", mostrarImagen, false);
let file;
function mostrarImagen(event) {
  file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    const img = document.getElementById("pruebaImg");
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}
