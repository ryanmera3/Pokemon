import { ProxyState } from "../AppState.js"
import { pokemonsService } from "../Services/PokemonsService.js"


function _drawPokeApiPokemon() {
  const pokemon = ProxyState.pokeApiPokemon
  let template = ''
  console.log(pokemon)
  pokemon.forEach(p => template += ` <p class="m-1 selectable" onclick="app.pokemonsController.getPokeApiPokemonByName('${p.name}')"> ${p.name} </p>`)
  document.getElementById('poke-api-pokemon').innerHTML = template
}

function _drawMyPokemon() {
  const pokemon = ProxyState.sandboxPokemon
  let template = ''
  pokemon.forEach(p => template += `<p class="m-1 selectable" onclick="app.pokemonsController.setActive('${p.id}')">
  ${p.name} </p>`)
  if (!template) {
    template = '<p class="text-grey darken-20"> You have no pokemon</p>'
  }
  document.getElementById('my-pokemon').innerHTML = template
}

function _drawActivePokemon() {
  let template = ''
  if (ProxyState.activePokemon) {
    template = ProxyState.activePokemon.Template
  }
  document.getElementById('active-pokemon').innerHTML = template
}
export class PokemonsController {
  constructor() {
    this.getPokeApiPokemon()
    ProxyState.on('pokeApiPokemon', _drawPokeApiPokemon)
    ProxyState.on('activePokemon', _drawActivePokemon)
    ProxyState.on('sandboxPokemon', _drawMyPokemon)
  }
  async getMyPokemon() {
    try {
      await pokemonsService.getMyPokemon()
    } catch (error) {
      console.error('POKE API ERROR', error)

    }
  }
  async getPokeApiPokemon() {
    try {
      await pokemonsService.getPokeApiPokemon()
    } catch (error) {
      console.error('POKE API ERROR', error)
    }
  }
  async getPokeApiPokemonByName(name) {
    try {
      await pokemonsService.getPokeApiPokemonByName(name)
    } catch (error) {
      console.error('POKE API ERROR', error)
    }
  }
  async addPokemon() {
    try {

      await pokemonsService.addPokemon()
    } catch (error) {
      console.error('API ERROR', error)
    }
  }
  setActive(id) {
    pokemonsService.setActive(id)
  }
}