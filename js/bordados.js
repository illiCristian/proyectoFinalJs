document.addEventListener("DOMContentLoaded", () => {
  getAll();
});

const getAll = async () => {
  try {
    const res = await axios.get("../js/data.json");
    const json = await res.data;
    renderCardsBordados(json);
  } catch (error) {
    let message = error.statusText || "Ocurrió un error al cargar los datos";
    console.log(message, "Error al cargar el archivo los datos");
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

// renderCardsBordados().then;
 const renderCardsBordados = (data) => {
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
}; 



 