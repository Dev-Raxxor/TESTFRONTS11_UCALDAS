import Helpers from './helpers.mjs'
import Intro from './intro.mjs'

class App {
  static #data
  static #i

  static async main() {
    let intro = new Intro()
    intro.saludar('Alan Soto')

    const html = await Helpers.fetchText('./resources/html/clientes.html', 'main')
    let request = await fetch('./resources/assets/config.json')
    let response = await request.json()

    request = await fetch(`${response.url}/cliente`)
    response = await request.json()
    App.#data = response.data
    console.log(App.#data)
    App.#i = 0
    App.mostrarCliente()

    const buttonFirstClient = document.querySelector('#first')
    buttonFirstClient.addEventListener('click', e => {
      e.preventDefault()
      App.cambioIndex(0)
      /*const result = Helpers.okForm('#frmclientes')
      console.info(`La validación fue un ${result ? 'exito' : 'fracaso'}`)
      */
    })

    const buttonPrevious = document.querySelector('#previous')
    buttonPrevious.addEventListener('click', e => {
      e.preventDefault()
      App.cambioIndex(App.#i - 1)
      /*const result = Helpers.okForm('#frmclientes')
      console.info(`La validación fue un ${result ? 'exito' : 'fracaso'}`)
      */
    })

    const buttonNext = document.querySelector('#next')
    buttonNext.addEventListener('click', e => {
      e.preventDefault()
      App.cambioIndex(App.#i + 1)
      /*const result = Helpers.okForm('#frmclientes')
      console.info(`La validación fue un ${result ? 'exito' : 'fracaso'}`)
      */
    })

    const buttonLastClient = document.querySelector('#last')
    buttonLastClient.addEventListener('click', e => {
      e.preventDefault()
      App.cambioIndex(App.#data.length - 1)
      /*const result = Helpers.okForm('#frmclientes')
      console.info(`La validación fue un ${result ? 'exito' : 'fracaso'}`)
      */
    })
  }

  static cambioIndex (index) {

    if (index < 0) {
      App.#i = App.#data.length - 1 
    
    }else if (index >= App.#data.length) {      
      App.#i = 0

    }else{
      App.#i = index
    }

    App.mostrarCliente()
  }

  static mostrarCliente() {
    document.querySelector('#id').value = App.#data[App.#i].id
    document.querySelector('#nombre').value = App.#data[App.#i].nombre
    document.querySelector('#direccion').value = App.#data[App.#i].direccion
    document.querySelector('#telefono').value = App.#data[App.#i].telefono
    document.querySelector('#ciudad').value = App.#data[App.#i].ciudad
  }
}

App.main()