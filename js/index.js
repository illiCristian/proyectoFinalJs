const contenedorCarrito = document.getElementById("carrito-contenedor");
const borrarItemCarrito = document.getElementById("trash");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contador");
const contadorCarrito1 = document.getElementById("contador1");
const precioTotal = document.getElementById("precio-total");
const btnRestar = document.getElementById("btn-restar");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchProductos();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});
const productos = [];
class Producto {
  constructor(id, nombre, descripcion, precio, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.img = img;
    this.cantidad = cantidad;
  }
}
let producto1 = new Producto(
  1,
  "Bolsitas Cumpleaños",
  "Papel fotografico 120 gr, 17 cm x 10,5 cm x 3,5 cm",
  150,
  "https://madaradesign.netlify.app/img/disenos%20personalizados/linea1%20(3).jpeg",
  0
);
let producto2 = new Producto(
  2,
  "Pokemones de apego",
  "20 cm de alto, relleno de vellon siliconado",
  400,
  "https://i.ibb.co/v30CSMN/Whats-App-Image-2022-09-28-at-10-05-41-1.jpg",
  0
);
let producto3 = new Producto(
  3,
  "Vaso Acrilico",
  "Personalizado con vinilo holografico",
  500,
  "https://i.ibb.co/mvTRtfF/vaso.jpg",
  0
);
let producto4 = new Producto(
  4,
  "Muñecos de apego",
  "20 cm aprox, rellenos de vellon siliconado",
  400,
  "https://i.ibb.co/Lx7v4y5/Whats-App-Image-2022-09-28-at-10-05-42.jpg",
  0
);
let producto5 = new Producto(
  5,
  "Cartuchera",
  "21cm x 12cm personalizable",
  400,
  "https://i.ibb.co/fqQsVxw/Whats-App-Image-2022-09-28-at-10-05-41.jpg",
  0
);
let producto6 = new Producto(
  6,
  "Taza HellFire Club!",
  "Ceramica",
  1000,
  "https://i.ibb.co/XFQyVqQ/Whats-App-Image-2022-09-28-at-10-05-42-2.jpg",
  0
);
let producto7 = new Producto(
  7,
  "Gorra trucker",
  "Parche bordado personalizable",
  1000,
  "https://i.ibb.co/QHmBJp3/Whats-App-Image-2022-09-28-at-10-05-42-1.jpg",
  0
);
let producto8 = new Producto(
  8,
  "Leo Messi + Copa Mundial",
  "20 cm relleno de vellon siliconado",
  600,
  "https://i.ibb.co/sQYxdgd/Whats-App-Image-2022-09-28-at-10-05-40.jpg",
  0
);
let producto9 = new Producto(
  9,
  "Porta Sube",
  "Personalizados con vinilo",
  250,
  "https://i.ibb.co/cFmMk41/Whats-App-Image-2022-09-29-at-18-39-54.jpg",
  0
);
productos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9);

const loadingData = (estado) => {
  const loading = document.getElementById("loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
const fetchProductos = async () => {
  try {
    loadingData(true);
    const res = await axios.get("../js/data.json");
    const json = await res.data;
    renderIndex(json);
  } catch (error) {
    let message = error.statusText || "Ocurrió un error al cargar los datos";
    console.log(error,`${message}`);
  } finally {
    loadingData(false);
  }
};

const renderIndex = (data) => {
  let div = document.getElementById("contenedor-div");
  data.productos.forEach((el) => {
    const { id, nombre, descripcion, precio, img, cantidad, alt, title } = el;
    let productoRenderizado = document.createElement("div");
    productoRenderizado.innerHTML = `
        <div class="my-2 px-2">
            <div class="card card-index" style="width: 15rem;">
                <img src="${img}" class="card-img-top gallery-item" alt="${alt}" title="${title}"">
                <div class="card-body">
                    <h5 class="card-title text-decoration-underline text-center">${nombre}</h5>
                    <p class="card-text text-center">${descripcion}.</p>
                    <p class="card-text text-center ">Precio: $${precio}.</p>
                    <a class="btn btn-primary btn-primary btn-carrito" id="${id}">Agregar al carrito</a>
                </div>
            </div>
        </div>
        `;
    div.append(productoRenderizado);
    const boton = document.getElementById(el.id);
    boton.addEventListener("click", () => {
      let productoExiste = carrito.find((item) => item.id === el.id);
      if (productoExiste !== undefined) {
        productoExiste.precio = productoExiste.precio + el.precio;
        productoExiste.cantidad = productoExiste.cantidad + 1;
      } else {
        carrito.push({ ...el, cantidad: cantidad + 1 });
      }
      actualizarCarrito();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Agregado al carrito!!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  });
};
const actualizarCarrito = () => {
  carrito.length === 0
    ? (contenedorCarrito.innerHTML = `<p class="p-carrito_vacio">El carrito de compras esta vacio<p>`)
    : (contenedorCarrito.innerHTML = "");
  carrito.forEach((prod) => {
    const { id, nombre, descripcion, precio, cantidad, img } = prod;
    const carritoActualizado = document.createElement("div");
    carritoActualizado.innerHTML = `
    <div class="card-carrito my-1">
        <div class="carrito-div_img">
          <img src="${img}" class="carrito-img" alt="...">
        </div>
            <div class="carrito-body">
              <h5 class="card-title text-decoration-underline text-uppercase text-white">${nombre}</h5>
              <p class="card-text">${descripcion}.<br>
               Cantidad: ${cantidad}<br>
               Precio: $${precio}</p>
                 <div class="carrito-botones">
                  <button id="trash" onclick="borrarItemCarr(${id})"><i class="fas fa-trash-alt mr-3"></i></button>
                   <button class="btn btn-danger btn-sm boton-sumar" onclick="sumarItemCarr(${id})" id="${id}">
                       +
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="restarItemCarr(${id})" id="btn-restar">
                        -
                   </button>
                 </div>
             </div>
    </div>
     `;

    contenedorCarrito.appendChild(carritoActualizado);
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  contadorCarrito.innerText = carrito.length;
  contadorCarrito1.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acum, el) => acum + el.precio, 0);
};

const borrarItemCarr = (prod) => {
  const item = carrito.find((el) => el.id === prod);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
};

const sumarItemCarr = (prod) => {
  const item = carrito.find((el) => el.id === prod);
  precio = productos.find((el) => el.id === prod);
  item.cantidad = item.cantidad + 1;
  item.precio = item.precio + precio.precio;
  actualizarCarrito();
};

const restarItemCarr = (prod) => {
  const item = carrito.find((el) => el.id === prod);
  precio = productos.find((el) => el.id === prod);
  if (item.cantidad <= 1) {
    borrarItemCarr(prod);
    actualizarCarrito();
  } else {
    item.cantidad = item.cantidad - 1;
    item.precio = item.precio - precio.precio;
    actualizarCarrito();
  }
};

vaciarCarrito.addEventListener("click", () => {
  if (carrito.length > 0) {
    Swal.fire({
      title: "¿Desea borrar todo el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar todo",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.length = 0;
        Swal.fire(
          "Borrado",
          "Los items en el carrito fueron borrados",
          "success"
        );
        actualizarCarrito();
      }
    });
  }
});
