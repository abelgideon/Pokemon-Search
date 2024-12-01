const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("image");
const pName = document.getElementById("pokemon-name");
const idDisplay = document.getElementById("pokemon-id");
const weightDisplay = document.getElementById("weight");
const heightDisplay = document.getElementById("height");
const typesDisplay = document.getElementById("types");
const hpDisplay = document.getElementById("hp");
const attackDisplay = document.getElementById("attack");
const defenseDisplay = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speedDisplay = document.getElementById("speed");

let pokemonData = [];

const getAllPokemon = async () => {
  try {
    const res = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
    );
    const data = await res.json();
    pokemonData = data.results;
  } catch (err) {
    console.log(err);
  }
};

const findPokemon = async (pok) => {
  try {
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pok}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const formatInput = () => {
  if (Number(searchInput.value)) {
    return searchInput.value;
  }
  let search = searchInput.value.toLowerCase();
  search = search.replace(/[^a-z ]/g, "");
  return search.split(" ").join("-");
};

const handleOutput = async () => {
  if (searchInput.value == "") {
    return;
  }
  const pokemon = await findPokemon(formatInput());
  if (!pokemon) {
    alert("Pokémon not found");
    return;
  }

  typesDisplay.innerHTML = "";

  const { name, id, weight, sprites, height, stats, types } = pokemon;

  pName.innerText = name.toUpperCase();
  idDisplay.innerText = `#${id}`;
  weightDisplay.innerText = `Weight: ${weight}`;
  heightDisplay.innerText = `Height: ${height}`;
  imageContainer.innerHTML = `
    <img id="sprite" src="${sprites.front_default}" />
  `;

  for (let i = 0; i < types.length; i++) {
    console.log(types[i].type.name);
    typesDisplay.innerHTML += `<p class="types-style">${types[
      i
    ].type.name.toUpperCase()}</p>`;
  }

  hpDisplay.innerText = stats[0].base_stat;
  attackDisplay.innerText = stats[1].base_stat;
  defenseDisplay.innerText = stats[2].base_stat;
  spAttack.innerText = stats[3].base_stat;
  spDefense.innerText = stats[4].base_stat;
  speedDisplay.innerText = stats[5].base_stat;
};

searchBtn.addEventListener("click", handleOutput);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleOutput();
  }
});
