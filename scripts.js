//Obtengo el contenedor de los items de el carrusel
let item = document.getElementById("active");
item.innerHTML = "";

//Obtengo el contenedor de los modales
let modales = document.getElementById("modales");
modales.innerHTML = "";

//Leo la API
async function getData() {
  try {
    // URL de la API
    const apiUrl = "./pokemon.json";
    const response = await axios.get(apiUrl);
    const numero = [];
    //Recorro el resultado para insertarlos en las tarjetas
    response.data.forEach((pokemon, index) => {
      if (!numero.includes(pokemon.number)) {
        const card = document.createElement("div");
        card.classList.add("carousel-item");
        if (index === 0) {
          card.classList.add("active");
        }
        card.setAttribute('data-name', pokemon.name.toUpperCase()); 
        card.innerHTML = `<div class="card"> <img src="${
          pokemon.ThumbnailImage
        }" class="d-block card-img-top img-thumbnail" alt="${pokemon.ThumbnailAltText}" title="${pokemon.ThumbnailAltText}" />  <div class="card-body"> <h3 class="card-title">${
          pokemon.name
        }</h3> <p class="card-text"> <h5>Type</h5> <ul class="list-group list-group-flush"> ${pokemon.type
          .map((tipo) => `<li class="list-group-item">${tipo}</li>`)
          .join(
            ""
          )} </ul> </p> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${
          pokemon.number
        }">More Info.</button> </div> </div>`;
        item.appendChild(card);

        //Agrego el contenido de los modales
        const divModal = document.createElement("div");
        divModal.classList.add("modal", "fade");
        divModal.setAttribute("tabindex", "-1");
        divModal.setAttribute("aria-labelledby", "exampleModalLabel");
        divModal.setAttribute("aria-hidden", "true");
        divModal.id = pokemon.number;
        divModal.innerHTML = `   <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${pokemon.number} - ${pokemon.name} </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <h4>Abilities</h4>
          <p>${pokemon.abilities.map((abilities) => `<li>${abilities}</li>`).join("")}</p>           
           <p>Weight: ${pokemon.weight}
           height: ${pokemon.height}
           </p>
           <h4>Weakness</h4>
          <p>${pokemon.weakness.map((weakness) => `${weakness}, `).join("")}</p>   
          <p>Collectibles slug: ${pokemon.collectibles_slug}</p>
          <p>Slug: ${pokemon.slug} </p>
          <p>Featured: ${pokemon.featured}</p>
          <p>
          <a href="${pokemon.detailPageURL}" target="_blank">Details page</a>

          </p>
          </div>     
        </div>
      </div> `;
        modales.appendChild(divModal);
        numero.push(pokemon.number);
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}
//Manipuló el resultaod obtenido de la APi
async function presentData() {
  try {
    const pokemons = await getData();
    // console.log(pokemons);
  } catch (error) {
    console.error("Error al presentar datos:", error);
  }
}

// obtención de datos
presentData();

const formBuscar = document.getElementById("buscar");

formBuscar.addEventListener('submit',function(event){
  event.preventDefault();
  const nombre = formBuscar.elements['nombrePokemon'].value.toUpperCase();
  console.log(nombre);  
  const name = document.querySelector(`[data-name=${nombre}]`);
  if (name) {
    const elementosConActive = document.querySelector('.active');
    elementosConActive.classList.remove('active');
    name.classList.add('active');
  }
  else
  {
    alert("The Pokemon you are looking for does not exist");
  }

  formBuscar.elements['nombrePokemon'].value = '';
})