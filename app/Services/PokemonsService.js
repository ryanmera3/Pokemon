import { ProxyState } from "../AppState.js"
import { Pokeman } from "../Models/Pokeman.js"
import { pokeApi, sandboxApi } from "./AxiosService.js"


class PokemonsServce {
  async getPokeApiPokemon() {
    const res = await pokeApi.get('')
    ProxyState.pokeApiPokemon = res.data.results
  }

  async getMyPokemon() {
    const res = await sandboxApi.get('')
    const pokeman = res.data.map(p => new Pokeman(p))
    ProxyState.sandboxPokemon = pokeman
  }
  async getPokeApiPokemonByName(name) {
    // @ts-ignore
    const res = await pokeApi.get('' + name)
    const pokeman = new Pokeman(res.data)
    ProxyState.activePokemon = pokeman
    console.log(pokeman);
  }

  async addPokemon() {
    const found = ProxyState.sandboxPokemon.find(p => p.name == ProxyState.activePokemon.name)
    if (found) {
      throw new Error("You already have that pokemon")
    }
    const res = await sandboxApi.post('', ProxyState.activePokemon)
    const pokeman = new Pokeman(res.data)
    console.log(pokeman)
    ProxyState.sandboxPokemon = [...ProxyState.sandboxPokemon, pokeman]

    this.setActive(pokeman.id)
  }


  setActive(name) {
    const pokeman = ProxyState.sandboxPokemon.find(p => p.name == name)
    ProxyState.activePokemon = pokeman
  }


}

export const pokemonsService = new PokemonsServce()