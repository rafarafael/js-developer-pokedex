const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 10
let offset = 0
const maxRecords = 151


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}">
      <button id="${pokemon.name}" type="button">
        Select
      </button>
    <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
        <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPoke(name) {
    pokeApi.getPokemon(name).then((poke = '') => {
        pokemonList.innerHTML =
            `
      <button onclick="voltar()" id="backButton" type="button">
        Back
      </button>
    <li class="pokemon ${poke.type}">
    <span class="number">${poke.number}</span>
        <span class="name">${poke.name}</span>
        
        <div class="detail">
        <ol class="types">
        ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        
        <img src="${poke.photo}" alt="${poke.name}">
        </div>
        </li>
        `
    })
}

function voltar() {
    pokemonList.innerHTML = ''
    offset = 0
    loadPokemonItems(0, 10)
}

loadPokemonItems(offset, limit)

pokemonList.addEventListener('click', (event) => {
    const name = event.target.id
    if (name != '' && name != 'backButton') {
        offset = 0
        loadPoke(name)
    }
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newList = maxRecords - offset
        loadPokemonItems(offset, newList)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})