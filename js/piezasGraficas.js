
document.addEventListener("DOMContentLoaded", () => {
  getAll();
});

const getAll = async () => {
  try {
    const res = await axios.get("../js/data.json");
    const json = await res.data;
    renderCardPiezasGraficas(json);
  } catch (error) {
    let message = error.statusText || "Ocurrió un error al cargar el json";
    console.log(message, "Error al cargar el archivo json");
  } finally {
    loadingData(false);
  }
};
const loadingData = (estado) => {
  const loading = document.getElementById("loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};

const renderCardPiezasGraficas = (data) => {
    const fragment = document.createDocumentFragment();
    const cards = document.getElementById("card-dinamicas");
    const templateCard = document.getElementById("template-card").content;
  data.piezasGraficas.forEach((item) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".card-img-top").setAttribute("src",item.url);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
}


/* const renderCardPiezasGraficas = (data) => {
  const $piezasGraficas = document.getElementById("card-piezasGraficas");
  data.piezasGraficas.forEach((item) => {
    let piezaGraficaRender = document.createElement("div");
    piezaGraficaRender.innerHTML = `
      <div class="col">
            <img src="${item.url}" class="gallery-item" title="Piezas graficas personalizadas" alt="Diseño personalizado">
      </div>`;
    $piezasGraficas.append(piezaGraficaRender);
  });
}; */



