document.addEventListener("DOMContentLoaded", () => {
  getAll();
});

const getAll = async () => {
  try {
    loadingData(true)
    const res = await axios.get("../js/data.json");
    const json = await res.data;
    renderCardsBordados(json);
  } catch (error) {
    let message = error.statusText || "Ocurrió un error al cargar los datos";
    console.log(error,`${message}`);
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

const renderCardsBordados = (data) => {
  const fragment = document.createDocumentFragment();
  const cards = document.getElementById("card-dinamicas-bordados");
  const templateCard = document.getElementById("template-card-bordados").content;
data.bordados.forEach((item) => {
  const clone = templateCard.cloneNode(true);
  clone.querySelector(".card-img-top").setAttribute("src",item.url);
  clone.querySelector(".card-img-top").setAttribute("alt",item.nombre);
  clone.querySelector(".card-img-top").setAttribute("title",item.title);
  fragment.appendChild(clone);
});

cards.appendChild(fragment);
}

/*  const renderCardsBordados = (data) => {
  console.log(data);
  const bordados = document.getElementById("card-bordados");
  data.bordados.forEach((item) => {
    let bordadoRenderizado = document.createElement("div");
    bordadoRenderizado.innerHTML = `
    <div class="col">
          <img src="${item.url}" class="gallery-item" title="Bordado mariposa con nombre" alt="Nombre bordado">
    </div>`;
    bordados.append(bordadoRenderizado);
  });
};  */



 