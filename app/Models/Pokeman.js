export class Pokeman {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name
    this.nickName = data.nickName || ''
    this.img = data.sprites.back_shiny || data.img
    this.weight = data.weight || ''
    this.types = data.types[0].type.name || ''
    this.user = data.user || ''
    this.abilities = data.abilities[0].ability.name
  }

  get Template() {
    return `
    <div class="w-75 bg-white elevation-1 p-3 d-flex flex-column mt-3 ">
      <div class="text-center">
        <h3>${this.name}</h3>
        <img src="${this.img}"> 
        <p>${this.types}</p>
        <p>${this.weight}</p>
        <p>${this.abilities}</p>
      </div>
      <p></p>
      <div class="d-flex justify-content-between justify-self-end mt-auto">
      </div>
      ${this.Button}
    </div>
    `
  }
  get Button() {
    if (this.id) {
      return `<button class="btn btn-success" onclick="app.pokemonsController.addPokemon()">add</button>
      `
    }
    return '<button class="btn btn-success" onclick="app.pokemonsController.removePokemon()">remove</button>'

  }
}